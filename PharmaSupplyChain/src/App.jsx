import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import PharmaSupplyChain from "../build/contracts/PharmaSupplyChain.json"; // Import the ABI JSON
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0); // Adding price field
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.requestAccounts();

        // Contract ABI and Address from JSON file
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PharmaSupplyChain.networks[networkId];
        const instance = new web3.eth.Contract(
          PharmaSupplyChain.abi,
          deployedNetwork && deployedNetwork.address
        );

        setAccount(accounts[0]);
        setContract(instance);
      } else {
        console.error("Please install MetaMask!");
      }
    };
    init();
  }, []);

  const addProduct = async () => {
    if (contract && productId && name && price > 0 && quantity > 0) {
      try {
        await contract.methods
          .addProduct(productId, name, price, quantity)
          .send({ from: account });
        alert("Product added successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Pharma Supply Chain</h1>

      <div>
        <h2>Add Product</h2>
        
        <label htmlFor="productId">Product ID:</label>
        <input
          id="productId"
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        
        <label htmlFor="productName">Product Name:</label>
        <input
          id="productName"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label htmlFor="price">Price (in Rs):</label>
        <input
          id="price"
          type="number"
          placeholder="Price (in Rs)"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default App;

