require('dotenv').config();
const { ethers } = require("ethers"); 
const abi = require("../../abi/BusBooking.json");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi.abi, wallet);

module.exports = { provider, wallet, contract };

