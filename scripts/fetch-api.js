const Web3 = require('web3');
const axios = require('axios');
const contract = require('../build/contracts/UserProducts.json'); // Ensure correct contract path

// Initialize Web3 with the provider URL
const web3 = new Web3('http://127.0.0.1:7545'); // Directly pass the provider URL

async function fetchUserData() {
  try {
    // Fetch accounts from Web3
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found on this network.");
    }

    // Get the network ID and deployed contract address
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contract.networks[networkId]?.address;

    if (!deployedAddress) {
      throw new Error("Contract not deployed on the current network.");
    }

    // Initialize the contract instance
    const userProducts = new web3.eth.Contract(contract.abi, deployedAddress);

    // Fetch user data from the API
    const response = await axios.get('http://localhost/api/fetch.php'); // Replace with your API URL
    const userData = response.data;
    console.log('User Data:', userData);

    // Interact with the contract (replace with your actual contract method)
    const receipt = await userProducts.methods
      .fetchUserProducts() // Replace with actual contract method
      .send({ from: accounts[0], gas: 3000000 });

    console.log('Transaction receipt:', receipt);

    // Listen for contract events (replace with actual event name)
    userProducts.events
      .ApiResponse({}) // Replace with actual event name
      .on('data', (event) => {
        console.log('Event data:', event.returnValues.data);
      })
      .on('error', (error) => {
        console.error('Event error:', error);
      });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchUserData();
