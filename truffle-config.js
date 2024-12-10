module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Port where Ganache is running
      network_id: "*",  
      gas: 6721975,       // Increase gas limit if needed
    gasPrice: 20000000000  // Set a reasonable gas price     // Any network id
    },
  },
  compilers: {
    solc: {
        version: "0.8.0",
    },
}
};
