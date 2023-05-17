import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ReMonsterMarketplace", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    async function deployMarketplaceFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount1, ownerNFT, ownerOAS] = await ethers.getSigners();

        const totalSupply = "100000000000000000000000000000";
        const feeSeller = "10000000000000000000"; // 10% * 10^18
        const addressReceiceFee = owner.address;

        const Test20 = await ethers.getContractFactory("Test20");
        const test20 = await Test20.connect(ownerOAS).deploy(totalSupply);
        test20.deployed();

        const Marketplace = await ethers.getContractFactory("ReMonsterMarketplace");
        const marketplace = await Marketplace.deploy(feeSeller, addressReceiceFee, test20.address);
        marketplace.deployed();

        const Test721 = await ethers.getContractFactory("Test721");
        const test721 = await Test721.connect(ownerNFT).deploy();
        test721.deployed();

        const Test1155 = await ethers.getContractFactory("Test1155");
        const test1155 = await Test1155.connect(ownerNFT).deploy();
        test1155.deployed();

        return { marketplace, test721, test1155, test20, feeSeller, addressReceiceFee, owner, otherAccount1, ownerNFT, ownerOAS };
    }

    describe("Deployment", function () {
        it("Should set the right feeSeller", async function () {
            const { marketplace, feeSeller } = await loadFixture(deployMarketplaceFixture);

            expect(await marketplace.feeSeller()).to.equal(feeSeller);
        });

        it("Should set the right addressReceiceFee", async function () {
            const { marketplace, addressReceiceFee } = await loadFixture(deployMarketplaceFixture);

            expect(await marketplace.addressReceiveFee()).to.equal(addressReceiceFee);
        });

        it("Should set the right addressTokenBase", async function () {
            const { marketplace, test20 } = await loadFixture(deployMarketplaceFixture);

            expect(await marketplace.tokenBase()).to.equal(test20.address);
        });

        it("Should set the right owner", async function () {
            const { marketplace, owner } = await loadFixture(deployMarketplaceFixture);

            expect(await marketplace.owner()).to.equal(owner.address);
        });
    });

    describe("setDecimalsFee", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called from another account", async function () {
                const { marketplace, otherAccount1 } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from another account
                await expect(marketplace.connect(otherAccount1).setDecimalsFee(18)).to.be.rejected;
            });

            it("Shouldn't fail if the setDecimalsFee has arrived and the owner calls it", async function () {
                const { marketplace, owner } = await loadFixture(
                    deployMarketplaceFixture
                );

                await expect(marketplace.connect(owner).setDecimalsFee(18)).not.to.be.reverted;
            });
        });
    });
    describe("setFeeSeller", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called from another account", async function () {
                const { marketplace, otherAccount1, feeSeller } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from another account
                await expect(marketplace.connect(otherAccount1).setFeeSeller(feeSeller)).to.be.rejected;
            });

            it("Shouldn't fail if the setFeeSeller has arrived and the owner calls it", async function () {
                const { marketplace, owner, feeSeller } = await loadFixture(
                    deployMarketplaceFixture
                );

                await expect(marketplace.connect(owner).setFeeSeller(feeSeller)).not.to.be.reverted;
            });
        });

        describe("Events", function () {
            it("Should emit an event on setFeeSeller", async function () {
                const { marketplace, owner, feeSeller } = await loadFixture(
                    deployMarketplaceFixture
                );


                await expect(marketplace.connect(owner).setFeeSeller(feeSeller))
                    .to.emit(marketplace, "ChangedFeeSeller")
                    .withArgs(feeSeller);
            });
        });
    });

    describe("setNewAddressFee", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called from another account", async function () {
                const { marketplace, otherAccount1, addressReceiceFee } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from another account
                await expect(marketplace.connect(otherAccount1).setNewAddressFee(addressReceiceFee)).to.be.rejected;
            });

            it("Shouldn't fail if the setNewAddressFee has arrived and the owner calls it", async function () {
                const { marketplace, owner, addressReceiceFee } = await loadFixture(
                    deployMarketplaceFixture
                );

                await expect(marketplace.connect(owner).setNewAddressFee(addressReceiceFee)).not.to.be.reverted;
            });
        });

        describe("Events", function () {
            it("Should emit an event on setFeeSeller", async function () {
                const { marketplace, owner, addressReceiceFee } = await loadFixture(
                    deployMarketplaceFixture
                );


                await expect(marketplace.connect(owner).setNewAddressFee(addressReceiceFee))
                    .to.emit(marketplace, "ChangedAddressReceiveSeller")
                    .withArgs(addressReceiceFee);
            });
        });
    });

    describe("createMarketItemSale", function () {
        describe("Validations", function () {
            it("Should revert with the right error if the contract address is not valid", async function () {
                const { marketplace, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(marketplace.address, 0, 1999, 10)).to.be.revertedWith('Unsupported contract');
            });

            it("Should revert with the right error if called not from Owner NFT 721", async function () {
                const { marketplace, test721, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );
                // We use marketplace.connect() to send a transaction from ownerOAS account
                await expect(marketplace.connect(ownerOAS).createMarketItemSale(test721.address, 0, 1999, 1)).to.be.rejectedWith('Only the owner can create orders');
            });

            it("Should revert with the right error if called not enough NFT 1155", async function () {
                const { marketplace, test1155, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerOAS account
                await expect(marketplace.connect(ownerOAS).createMarketItemSale(test1155.address, 0, 1999, 10)).to.be.rejectedWith('Insufficient balance');
            });

            it("Should revert with the right error if contract is not authorized to manage the asset 721", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 1)).to.be.rejectedWith('The contract is not authorized to manage the asset');
            });

            it("Should revert with the right error if contract is not authorized to manage the asset 1155", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)).to.be.rejectedWith('The contract is not authorized to manage the asset');
            });

            it("Should revert with the right error if price is less than or equal to 0 - 721", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 0, 10)).to.be.rejectedWith('Price should be bigger than 0');
            });

            it("Should revert with the right error if price is less than or equal to 0 - 1155", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 0, 10)).to.be.rejectedWith('Price should be bigger than 0');
            });

            it("Shouldn't fail if the createMarketItemSale has arrived and the owner NFT-721 calls it", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 1)).not.to.be.reverted;
            });

            it("Shouldn't fail if the createMarketItemSale has arrived and the owner NFT-1155 calls it", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)).not.to.be.reverted;
            });
        });

        describe("Events", function () {
            it("Should emit an event on createMarketItemSale - 721", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 1)).to.emit(marketplace, "OrderCreated")
                // .withArgs(ownerNFT.address);
            });

            it("Should emit an event on createMarketItemSale - 1155", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 1)).to.emit(marketplace, "OrderCreated")
                // .withArgs(ownerNFT.address);
            });
        });
    });

    describe("cancelMarketItemSale", function () {
        describe("Validations", function () {
            it("Should revert with the right error if NFT-721-1155 is not listed for sale yet ", async function () {
                const { marketplace, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).cancelMarketItemSale('0x65cd9354bf3ea586f83658938cb96d86c0b86783fb2a3149a727ddccc9270a56')).to.be.rejectedWith('Asset not published');
                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).cancelMarketItemSale('0x65cd9354bf3ea586f83658938cb96d86c0b86783fb2a3149a727ddccc9270a56')).to.be.rejectedWith('Asset not published');
            });

            it("Should revert with the right error if called not from Owner NFT 721 or ADMIN", async function () {
                const { marketplace, test721, ownerNFT, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerOAS account
                        await expect(marketplace.connect(ownerOAS).cancelMarketItemSale(orderCreatedEvent.args.orderId)).to.be.rejectedWith('Unauthorized user');
                    }
                }
            });

            it("Should revert with the right error if called not from Owner NFT 1155 or ADMIN", async function () {
                const { marketplace, test1155, ownerNFT, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerOAS account
                        await expect(marketplace.connect(ownerOAS).cancelMarketItemSale(orderCreatedEvent.args.orderId)).to.be.rejectedWith('Unauthorized user');
                    }
                }
            });

            it("Shouldn't fail if the cancelMarketItemSale has arrived and the owner NFT-721 calls it", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).cancelMarketItemSale(orderCreatedEvent.args.orderId)).not.to.be.rejected;
                    }
                }
            });

            it("Shouldn't fail if the cancelMarketItemSale has arrived and the owner NFT-1155 calls it", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).cancelMarketItemSale(orderCreatedEvent.args.orderId)).not.to.be.rejected;
                    }
                }
            });

            it("Shouldn't fail if the cancelMarketItemSale has arrived and ADMIN calls it - 721", async function () {
                const { marketplace, test721, ownerNFT, owner } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from owner account
                        await expect(marketplace.connect(owner).cancelMarketItemSale(orderCreatedEvent.args.orderId)).not.to.be.rejected;
                    }
                }
            });

            it("Shouldn't fail if the cancelMarketItemSale has arrived and ADMIN calls it - 1155", async function () {
                const { marketplace, test1155, ownerNFT, owner } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from owner account
                        await expect(marketplace.connect(owner).cancelMarketItemSale(orderCreatedEvent.args.orderId)).not.to.be.rejected;
                    }
                }
            });
        });

        describe("Events", function () {
            it("Should emit an event on cancelMarketItemSale - 721", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).cancelMarketItemSale(orderCreatedEvent.args.orderId)).to.emit(marketplace, "OrderCancelled");
                    }
                }
            });

            it("Should emit an event on cancelMarketItemSale - 1155", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 10)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).cancelMarketItemSale(orderCreatedEvent.args.orderId)).to.emit(marketplace, "OrderCancelled");
                    }
                }
            });
        });
    });

    describe("buyItem", function () {
        describe("Validations", function () {
            it("Should revert with the right error if NFT-721-1155 is not listed for sale yet ", async function () {
                const { marketplace, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).buyItem('0x65cd9354bf3ea586f83658938cb96d86c0b86783fb2a3149a727ddccc9270a56')).to.be.rejectedWith('Asset not published');
                // We use marketplace.connect() to send a transaction from ownerNFT account
                await expect(marketplace.connect(ownerNFT).buyItem('0x65cd9354bf3ea586f83658938cb96d86c0b86783fb2a3149a727ddccc9270a56')).to.be.rejectedWith('Asset not published');
            });

            it("Should revert with the right error if called from Owner NFT 721", async function () {
                const { marketplace, test721, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, 1999, 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).buyItem(orderCreatedEvent.args.orderId)).to.be.rejectedWith('Unauthorized user');
                    }
                }
            });

            it("Should revert with the right error if called from Owner NFT 1155", async function () {
                const { marketplace, test1155, ownerNFT } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;

                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, 1999, 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await expect(marketplace.connect(ownerNFT).buyItem(orderCreatedEvent.args.orderId)).to.be.rejectedWith('Unauthorized user');
                    }
                }
            });

            it("Shouldn't fail if the buyItem 721 has arrived and the buyer calls it", async function () {
                const { marketplace, test721, test20, ownerNFT, ownerOAS, addressReceiceFee } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;
                // Appprove OAS to contract marketplace
                await expect(test20.connect(ownerOAS).approve(marketplace.address, "1000000000000000000000000000000000000000000")).not.to.be.reverted;
                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, "100000000000000000000", 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await marketplace.connect(ownerOAS).buyItem(orderCreatedEvent.args.orderId)

                        await expect(await test20.balanceOf(addressReceiceFee)).to.equal("10000000000000000000");
                        await expect(await test20.balanceOf(marketplace.address)).to.equal("0");
                        await expect(await test20.balanceOf(ownerNFT.address)).to.equal("90000000000000000000");
                    }
                }
            });

            it("Shouldn't fail if the buyItem 1155 has arrived and the buyer calls it", async function () {
                const { marketplace, test1155, test20, ownerNFT, ownerOAS, addressReceiceFee } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;
                // Appprove OAS to contract marketplace
                await expect(test20.connect(ownerOAS).approve(marketplace.address, "1000000000000000000000000000000000000000000")).not.to.be.reverted;
                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, "100000000000000000000", 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerNFT account
                        await marketplace.connect(ownerOAS).buyItem(orderCreatedEvent.args.orderId)

                        await expect(await test20.balanceOf(addressReceiceFee)).to.equal("10000000000000000000");
                        await expect(await test20.balanceOf(marketplace.address)).to.equal("0");
                        await expect(await test20.balanceOf(ownerNFT.address)).to.equal("90000000000000000000");
                    }
                }
            });
        });

        describe("Events", function () {
            it("Should emit an event on buyItem - 721", async function () {
                const { marketplace, test721, test20, ownerNFT, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-721 to contract marketplace
                await expect(test721.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;
                // Appprove OAS to contract marketplace
                await expect(test20.connect(ownerOAS).approve(marketplace.address, "1000000000000000000000000000000000000000000")).not.to.be.reverted;
                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test721.address, 0, "100000000000000000000", 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerOAS account
                        await expect(marketplace.connect(ownerOAS).buyItem(orderCreatedEvent.args.orderId)).to.emit(marketplace, "OrderSuccessful")
                        // .withArgs(ownerNFT.address);
                    }
                }
            });

            it("Should emit an event on buyItem - 1155", async function () {
                const { marketplace, test1155, test20, ownerNFT, ownerOAS } = await loadFixture(
                    deployMarketplaceFixture
                );

                // Appprove NFT-1155 to contract marketplace
                await expect(test1155.connect(ownerNFT).setApprovalForAll(marketplace.address, true)).not.to.be.reverted;
                // Appprove OAS to contract marketplace
                await expect(test20.connect(ownerOAS).approve(marketplace.address, "1000000000000000000000000000000000000000000")).not.to.be.reverted;
                let sendTransaction = await marketplace.connect(ownerNFT).createMarketItemSale(test1155.address, 0, "100000000000000000000", 1)
                const receipt = await sendTransaction.wait();
                if (receipt && receipt.events) {
                    const events = receipt.events;
                    const orderCreatedEvent = events.find((event) => event.event === "OrderCreated");
                    if (orderCreatedEvent && orderCreatedEvent.args) {
                        // We use marketplace.connect() to send a transaction from ownerOAS account
                        await expect(marketplace.connect(ownerOAS).buyItem(orderCreatedEvent.args.orderId)).to.emit(marketplace, "OrderSuccessful")
                        // .withArgs(ownerNFT.address);
                    }
                }
            });
        });
    });
});
