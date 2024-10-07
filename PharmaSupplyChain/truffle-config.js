

module.exports = {
  

  networks: {
    
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache GUI default
      network_id: "*",
      gas: 6721975, // Gas limit (match Ganache's block gas limit)
      gasPrice: 20000000000        // Any network (default: none)
    },
    
   
  },

  
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0", // Match the version you are using in the contract
     
    },
  },
 
};
