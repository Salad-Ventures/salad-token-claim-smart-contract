require('dotenv').config();
const ethers = require('ethers');
const monsterABI = require('../artifacts/contracts/Monster/monster.sol/Monster.json'); // Import the ABI JSON file
const regenFusionABI = require('../artifacts/contracts/Monster/regeneration_and_fusion.sol/RegenFusionMonster.json'); // Import the ABI JSON file
const genesisABI = require('../artifacts/contracts/GenesisHash/GenesisHash.sol/GenesisHash.json');
const generalABI = require('../artifacts/contracts/GeneralHash/GeneralHash.sol/GeneralHash.json');
const accessoriesABI = require('../artifacts/contracts/Accessories/Accessories.sol/Accessories.json');
const coachABI = require('../artifacts/contracts/Coach/Coach.sol/Coach.json');
const farmABI = require('../artifacts/contracts/Farm/Farm.sol/ReMonsterFarm.json');
const hashChipABI = require('../artifacts/contracts/HashChipNFT/HashChipNFT.sol/HashChipNFT.json');
const crystalABI = require('../artifacts/contracts/MonsterCrystal/Monster_Crystal.sol/MonsterCrystal.json');
const memoryABI = require('../artifacts/contracts/MonsterMemory.sol/Monster_Memory.sol/MonsterMemory.json');
const skinABI = require('../artifacts/contracts/Skin/Skin.sol/Skin.json');

const trainingItemABI = require('../artifacts/contracts/ERC1155/TrainingItem.sol/TrainingItem.json'); 
const ehanceItemABI = require('../artifacts/contracts/ERC1155/EnhanceItem.sol/EhanceItem.json'); 
const fusionItemABI = require('../artifacts/contracts/ERC1155/FusionItem.sol/FusionItem.json'); 
const regenerationItemABI = require('../artifacts/contracts/ERC1155/RegenerationItem.sol/RegenerationItem.json'); 

const marketPlaceABI = require('../artifacts/contracts/MarketPlace/Marketplace.sol/ReMonsterMarketplace.json');
const shopABI = require('../artifacts/contracts/Shop/Shop.sol/ReMonsterShop.json');
const treasuryABI = require('../artifacts/contracts/Pools/Pools.sol/PoolsContract.json');
const tokenABI = require('../artifacts/contracts/TokenXXX/tokenxxx.sol/TokenXXX.json');

// Create a provider connected to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const managerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// // Create a wallet using the manager's private key
const contractMonster = new ethers.Contract(process.env.ADDRESS_CONTRACT_MONSTER, monsterABI.abi, managerWallet);
const contractRegenFusionMonster = new ethers.Contract(process.env.ADDRESS_CONTRACT_REGEN_FUSION, regenFusionABI.abi, managerWallet);
const contractGenesis = new ethers.Contract(process.env.ADDRESS_CONTRACT_GENESIS, genesisABI.abi, managerWallet);
const contractGeneral = new ethers.Contract(process.env.ADDRESS_CONTRACT_GENERAL, generalABI.abi, managerWallet);
const contractAccessories = new ethers.Contract(process.env.ADDRESS_CONTRACT_ACCESSORIES, accessoriesABI.abi, managerWallet);
const contractCoach = new ethers.Contract(process.env.ADDRESS_CONTRACT_COACH, coachABI.abi, managerWallet);
const contractFarm = new ethers.Contract(process.env.ADDRESS_CONTRACT_FARM, farmABI.abi, managerWallet);
const contractHashChip = new ethers.Contract(process.env.ADDRESS_CONTRACT_HASHCHIP, hashChipABI.abi, managerWallet);
const contractCrystal = new ethers.Contract(process.env.ADDRESS_CONTRACT_CRYSTAL, crystalABI.abi, managerWallet);
const contractMemory = new ethers.Contract(process.env.ADDRESS_CONTRACT_MEMORY, memoryABI.abi, managerWallet);
const contractSkin = new ethers.Contract(process.env.ADDRESS_CONTRACT_SKIN, skinABI.abi, managerWallet);

const contractTrainingItem = new ethers.Contract(process.env.ADDRESS_CONTRACT_TRAINING_ITEM, trainingItemABI.abi, managerWallet);
const contractEhanceItem = new ethers.Contract(process.env.ADDRESS_CONTRACT_ENHANCE_ITEM, ehanceItemABI.abi, managerWallet);
const contractRegenerationItem = new ethers.Contract(process.env.ADDRESS_CONTRACT_REGENERATION_ITEM, regenerationItemABI.abi, managerWallet);
const contractFusionItem = new ethers.Contract(process.env.ADDRESS_CONTRACT_FUSION_ITEM, fusionItemABI.abi, managerWallet);

const contractShop = new ethers.Contract(process.env.ADDRESS_CONTRACT_SHOP, shopABI.abi, managerWallet);
const contractMarketPlace = new ethers.Contract(process.env.ADDRESS_CONTRACT_MARKET, marketPlaceABI.abi, managerWallet);
const contractTreasury = new ethers.Contract(process.env.ADDRESS_CONTRACT_TREASURY, treasuryABI.abi, managerWallet);

const contractToken = new ethers.Contract(process.env.ADDRESS_CONTRACT_TOKEN_XXX, tokenABI.abi, managerWallet);

async function callTokenSmartContract() {
  try {
    const ROLE = await contractToken.MANAGEMENT_ROLE();
    const tx1 = await contractToken.grantRole(ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx1.wait();
    const tx2 = await contractToken.grantRole(ROLE, process.env.ADDRESS_CONTRACT_GUILD);
    await tx2.wait();

    console.log("Contract Token: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callMonsterSmartContract() {
  try {
    const MONSTER_ROLE = await contractMonster.MANAGEMENT_ROLE();
    const tx1 = await contractMonster.grantRole(MONSTER_ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx1.wait();
    // const tx2 = await contractMonster.grantRole(MONSTER_ROLE, process.env.ADDRESS_CONTRACT_COACH);
    // await tx2.wait();
    // const tx3 = await contractMonster.grantRole(MONSTER_ROLE, process.env.ADDRESS_CONTRACT_CRYSTAL);
    // await tx3.wait();
    console.log("Monster grantRole: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}
async function callGenesisHashSmartContract() {
  try {
    const GENESIS_HASH = await contractGenesis.MANAGEMENT_ROLE();
    const tx1 = await contractGenesis.grantRole(GENESIS_HASH, process.env.ADDRESS_CONTRACT_BRIDGE_OAS);
    await tx1.wait();
    const tx2 = await contractGenesis.grantRole(GENESIS_HASH, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx2.wait();
    const tx3 = await contractGenesis.grantRole(GENESIS_HASH, process.env.ADDRESS_CONTRACT_SHOP);
    await tx3.wait();
    console.log("contractGenesis: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callGeneralHashSmartContract() {
  try {
    const ROLE = await contractGeneral.MANAGEMENT_ROLE();
    const tx1 = await contractGeneral.grantRole(ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx1.wait();
    const tx2 = await contractGeneral.grantRole(ROLE, process.env.ADDRESS_CONTRACT_SHOP);
    await tx2.wait();
    console.log("contractGenesis: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callMemory() {
  try {
    const ROLE = await contractMemory.MANAGEMENT_ROLE();
    const tx1 = await contractMemory.grantRole(ROLE, process.env.ADDRESS_CONTRACT_COACH);
    await tx1.wait();
    const tx2 = await contractMemory.grantRole(ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx2.wait();
    const tx3 = await contractMemory.grantRole(ROLE, process.env.ADDRESS_CONTRACT_CRYSTAL);
    await tx3.wait();
    console.log("contractMemory: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callFarm() {
  try {
    const ROLE = await contractFarm.MANAGEMENT_ROLE();
    const tx1 = await contractFarm.grantRole(ROLE, process.env.ADDRESS_CONTRACT_SHOP);
    await tx1.wait();
    const tx2 = await contractFarm.grantRole(ROLE, process.env.ADDRESS_CONTRACT_BRIDGE_OAS);
    await tx2.wait();  
    console.log("contracFarm: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callHashChipNFT() {
  try {
    const ROLE = await contractHashChip.MANAGEMENT_ROLE();
    const tx1 = await contractHashChip.grantRole(ROLE, process.env.ADDRESS_CONTRACT_BRIDGE_OAS);
    await tx1.wait();
    console.log("contractHashChip: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callTrainingItem() {
  try {
    const ROLE = await contractTrainingItem.MANAGEMENT_ROLE();
    const tx1 = await contractTrainingItem.grantRole(ROLE, process.env.ADDRESS_CONTRACT_SHOP);
    await tx1.wait();
    console.log("TrainingItem: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function callRegenItem() {
  try {
    const ROLE = await contractRegenerationItem.MANAGEMENT_ROLE();
    const tx1 = await contractRegenerationItem.grantRole(ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx1.wait();
    console.log("contractRegenerationItem: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}
async function callEhanceItem() {
  try {
    const ROLE = await contractEhanceItem.MANAGEMENT_ROLE();
    const tx1 = await contractEhanceItem.grantRole(ROLE, process.env.ADDRESS_CONTRACT_ACCESSORIES);
    await tx1.wait();
    const tx2 = await contractEhanceItem.grantRole(ROLE, process.env.ADDRESS_CONTRACT_BRIDGE_OAS);
    await tx2.wait();
    console.log("contractEhanceItem: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}
async function callFusionItem() {
  try {
    const ROLE = await contractFusionItem.MANAGEMENT_ROLE();
    const tx1 = await contractFusionItem.grantRole(ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await tx1.wait();
    console.log("contractFusionItem: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function RegenFusion() {
  try {
    const tx1 = await contractRegenFusionMonster.initContractAddress(
      process.env.ADDRESS_CONTRACT_TOKEN_XXX,
      process.env.ADDRESS_CONTRACT_GENERAL,
      process.env.ADDRESS_CONTRACT_GENESIS,
      process.env.ADDRESS_CONTRACT_HASHCHIP,
      process.env.ADDRESS_CONTRACT_MEMORY,
      process.env.ADDRESS_CONTRACT_REGENERATION_ITEM,
      process.env.ADDRESS_CONTRACT_FUSION_ITEM,
      process.env.ADDRESS_CONTRACT_MONSTER,
      process.env.ADMIN_ADDRESS,
    );
    await tx1.wait();

    const tokenRole = await contractToken.MANAGEMENT_ROLE();
    const txToken = await contractToken.grantRole(tokenRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txToken.wait();

    const generalRole = await contractGeneral.MANAGEMENT_ROLE();
    const txGeneral = await contractGeneral.grantRole(generalRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txGeneral.wait();

    const genesisRole = await contractGenesis.MANAGEMENT_ROLE();
    const txGenesis = await contractGenesis.grantRole(genesisRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txGenesis.wait();

    const hashchipRole = await contractHashChip.MANAGEMENT_ROLE();
    const txhashchip= await contractHashChip.grantRole(hashchipRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txhashchip.wait();

    const memeoryRole = await contractMemory.MANAGEMENT_ROLE();
    const txmemory = await contractMemory.grantRole(memeoryRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txmemory.wait();

    const regenitemRole = await contractRegenerationItem.MANAGEMENT_ROLE();
    const txRegenItem = await contractRegenerationItem.grantRole(regenitemRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txRegenItem.wait();

    const fusionRole = await contractFusionItem.MANAGEMENT_ROLE();
    const txFusion = await contractFusionItem.grantRole(fusionRole, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txFusion.wait();

    const MONSTER_ROLE = await contractMonster.MANAGEMENT_ROLE();
    const txMonster = await contractMonster.grantRole(MONSTER_ROLE, process.env.ADDRESS_CONTRACT_REGEN_FUSION);
    await txMonster.wait();

    console.log("RegenFusion: DONE ");
  } catch (error) {
    console.error('Error:', error);
  }
}

RegenFusion()

const delayBetweenCalls = 1000;
const functionsToCall = [
  callMonsterSmartContract,
  callGenesisHashSmartContract,
  callGeneralHashSmartContract,
  callMemory,
  callFarm,
  callHashChipNFT,
  callTrainingItem,
  callRegenItem,
  callEhanceItem,
  callFusionItem,
  callTokenSmartContract
];

const executeCalls = async () => {
  for (const fn of functionsToCall) {
    await fn();
    await new Promise(resolve => setTimeout(resolve, delayBetweenCalls));
  }
};

// executeCalls();

// async function mintMonster() {
//   const abi =[
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "approved",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Approval",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "ApprovalForAll",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint8",
//           "name": "_type",
//           "type": "uint8"
//         }
//       ],
//       "name": "MintMonster",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "previousOwner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnershipTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "Paused",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "previousAdminRole",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "newAdminRole",
//           "type": "bytes32"
//         }
//       ],
//       "name": "RoleAdminChanged",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "sender",
//           "type": "address"
//         }
//       ],
//       "name": "RoleGranted",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "sender",
//           "type": "address"
//         }
//       ],
//       "name": "RoleRevoked",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Transfer",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "Unpaused",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "burnMonster",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "status",
//           "type": "bool"
//         }
//       ],
//       "name": "setStatusMonsters",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "DEFAULT_ADMIN_ROLE",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "MANAGEMENT_ROLE",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "_alreadyOwnNftForFree",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "_monster",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "lifeSpan",
//           "type": "bool"
//         },
//         {
//           "internalType": "uint8",
//           "name": "typeMint",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "approve",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "balanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "burn",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getApproved",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         }
//       ],
//       "name": "getListTokenOfAddress",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         }
//       ],
//       "name": "getRoleAdmin",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getStatusMonster",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "grantRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "hasRole",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         }
//       ],
//       "name": "isApprovedForAll",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "isFreeMonster",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         },
//         {
//           "internalType": "uint8",
//           "name": "_type",
//           "type": "uint8"
//         }
//       ],
//       "name": "mintMonster",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "name",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownerOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "pause",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "paused",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "renounceOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "renounceRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "revokeRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bytes",
//           "name": "data",
//           "type": "bytes"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "setApprovalForAll",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "baseURI_",
//           "type": "string"
//         }
//       ],
//       "name": "setBaseURI",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "_status",
//           "type": "bool"
//         }
//       ],
//       "name": "setStatusMonster",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes4",
//           "name": "interfaceId",
//           "type": "bytes4"
//         }
//       ],
//       "name": "supportsInterface",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "symbol",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "index",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenByIndex",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "index",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenOfOwnerByIndex",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenURI",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "totalSupply",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "transferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "unpause",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ];
//   const address = "0xDB91467F9aD29B86acfA94963ff665d9c146d19f";
//   const contract = new ethers.Contract(address, abi, managerWallet);
//   for( let i=25; i< 301; i++) {
//     for (let i = 25; i < 301; i++) {
//       try {
//         const detail = await contract._monster(i);
//         const owner = await contract.ownerOf(i);
//         let type = 0;
//         if (detail.typeMint == 0) {
//           type = 1;
//         } else if (detail.typeMint == 1) {
//           type = 3;
//         } else if (detail.typeMint == 2) {
//           type = 4;
//         } else if (detail.typeMint == 3) {
//           type = 5;
//         } else if (detail.typeMint == 4) {
//           type = 6;
//         } else if (detail.typeMint == 5) {
//           type = 2;
//         } else {
//           type = 10;
//         }
//         await contractMonster.mintMonster(owner.toString(), type);
//         console.log(i);
//       } catch (error) {
//         console.error("Error at index", i, ":", error);
//       }
//     }
//   }
// }

// async function mintFarm() {
//   const abi =[
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name_",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "symbol_",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "limit",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "approved",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Approval",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "ApprovalForAll",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "typeNFT",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "NewFarm",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "previousOwner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnershipTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "Paused",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "previousAdminRole",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "newAdminRole",
//           "type": "bytes32"
//         }
//       ],
//       "name": "RoleAdminChanged",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "sender",
//           "type": "address"
//         }
//       ],
//       "name": "RoleGranted",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "sender",
//           "type": "address"
//         }
//       ],
//       "name": "RoleRevoked",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Transfer",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "Unpaused",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "user",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint64",
//           "name": "expires",
//           "type": "uint64"
//         }
//       ],
//       "name": "UpdateUser",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "ADMIN_ROLE",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "DEFAULT_ADMIN_ROLE",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "MANAGEMENT_ROLE",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "approve",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "balanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "_type",
//           "type": "uint256"
//         }
//       ],
//       "name": "createFreeNFT",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "_type",
//           "type": "uint256"
//         }
//       ],
//       "name": "createNFT",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "contract IERC721",
//           "name": "monsterContract",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "farmId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "monsterId",
//           "type": "uint256"
//         }
//       ],
//       "name": "endTrainingMonster",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getApproved",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         }
//       ],
//       "name": "getListFarmByAddress",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "listFarm",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         }
//       ],
//       "name": "getListFreeFarmByAddress",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "listFarm",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         }
//       ],
//       "name": "getListTrainingMonsterByAddress",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "listTraining",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         }
//       ],
//       "name": "getRoleAdmin",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getTotalLimit",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "grantRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "hasRole",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "haveOwned",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         }
//       ],
//       "name": "isApprovedForAll",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "isFree",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "name",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownerOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "paused",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "renounceOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "renounceRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "role",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "revokeRole",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bytes",
//           "name": "data",
//           "type": "bytes"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "setApprovalForAll",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "baseURI_",
//           "type": "string"
//         }
//       ],
//       "name": "setBaseURI",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_total",
//           "type": "uint256"
//         }
//       ],
//       "name": "setTotalLimit",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "user",
//           "type": "address"
//         },
//         {
//           "internalType": "uint64",
//           "name": "expires",
//           "type": "uint64"
//         }
//       ],
//       "name": "setUser",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes4",
//           "name": "interfaceId",
//           "type": "bytes4"
//         }
//       ],
//       "name": "supportsInterface",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "symbol",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "index",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenByIndex",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "index",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenOfOwnerByIndex",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenURI",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "totalSupply",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "contract IERC721",
//           "name": "monsterContract",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "farmId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "monsterId",
//           "type": "uint256"
//         }
//       ],
//       "name": "trainingMonster",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "transferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "userExpires",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "userOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "contractAddress",
//           "type": "address"
//         }
//       ],
//       "name": "withdrawToken",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ];
//   const address = "0x12EeBC60613d52E47d7823bfc97eA77dF36CCE6C";
//   const contract = new ethers.Contract(address, abi, managerWallet);
//   for (let i = 0; i < 267; i++) {
//     try {
//       const isFree = await contract.isFree(i);
//       const owner = await contract.ownerOf(i);

//       if(isFree){
//         await contractFarm.createFreeNFT(owner.toString(), 1);
//       }else {
//         await contractFarm.createNFT(owner.toString(), 1);
//       }
//       console.log(i);
//     } catch (error) {
//       console.error("Error at index", i, ":", error);
//     }
//   }
  
// }
// async function callRegenFusionMonsterSmartContract() {
//   try {
//     const tx1 = await contractRegenFusionMonster.initContractAddress(
//       process.env.ADDRESS_CONTRACT_TOKEN_XXX,
//       process.env.ADDRESS_CONTRACT_GENERAL,
//       process.env.ADDRESS_CONTRACT_GENESIS,
//       process.env.ADDRESS_CONTRACT_HASHCHIP,
//       process.env.ADDRESS_CONTRACT_MEMORY,
//       process.env.ADDRESS_CONTRACT_REGENERATION_ITEM,
//       process.env.ADDRESS_CONTRACT_FUSION_ITEM,
//       process.env.ADDRESS_CONTRACT_MONSTER,
//       process.env.ADMIN_ADDRESS,
//     );
//     await tx1.wait();
//     console.log("initContractAddress: DONE ");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// async function callAccessoriesSmartContract() {
//   try {
//     const tx1 = await contractAccessories.setMonsterItem(process.env.ADDRESS_CONTRACT_ENHANCE_ITEM);
//     await tx1.wait();
//     console.log("contractAccessories: DONE ");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function callCoach() {
//   try {
//     const ROLE = await contractCoach.MANAGEMENT_ROLE();
//     const tx1 = await contractCoach.setMonsterContract(process.env.ADDRESS_CONTRACT_MONSTER);
//     await tx1.wait();
//     const tx2 = await contractCoach.setMonsterMemory(process.env.ADDRESS_CONTRACT_MEMORY);
//     await tx2.wait();
//     console.log("contractCoach: DONE ");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// async function callShop() {
//   try {
//     // const ROLE = await contractShop.MANAGEMENT_ROLE();
//     // const tx1 = await contractShop.setGeneralContract(process.env.ADDRESS_CONTRACT_GENERAL);
//     // await tx1.wait();
//     // const tx2 = await contractShop.setGenesisContract(process.env.ADDRESS_CONTRACT_GENESIS);
//     // await tx2.wait();
//     const tx3 = await contractShop.setFarmContract(process.env.ADDRESS_CONTRACT_FARM);
//     await tx3.wait();
//     // const tx4 = await contractShop.setTrainingItemContract(process.env.ADDRESS_CONTRACT_TRAINING_ITEM);
//     // await tx4.wait();

//     // const tx5 = await contractShop.initContract(process.env.ADDRESS_CONTRACT_GENERAL, process.env.ADDRESS_CONTRACT_GENESIS,
//     //   process.env.ADDRESS_CONTRACT_FARM, process.env.ADDRESS_CONTRACT_TRAINING_ITEM
//     //   )
//     // await tx5.wait();
//     // console.log("contractShop: DONE ");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// async function callCrystal() {
//   try {
//     // const ROLE = await contractCrystal.MANAGEMENT_ROLE();
//     // const tx1 = await contractCrystal.initSetMonsterContract(process.env.ADDRESS_CONTRACT_MONSTER);
//     // await tx1.wait();
//     const tx2 = await contractCrystal.initSetMonsterMemory(process.env.ADDRESS_CONTRACT_MEMORY);
//     await tx2.wait();
//     console.log("contractCrystal: DONE ");
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }