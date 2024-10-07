// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaSupplyChain {
    // Structure to hold product details
    struct Product {
        string productId;
        string name;
        uint price; // Price in Rs
        uint quantity;
        bool exists; // Flag to check if the product exists
    }

    // Mapping to store products by their IDs (using string)
    mapping(string => Product) private products;

    // Count of total products
    uint private productCount;

    // Array to store all product IDs
    string[] private productIds;

    // Event emitted when a product is added
    event ProductAdded(
        string productId,
        string name,
        uint price,
        uint quantity
    );

    // Function for manufacturers to add a new product
    function addProduct(
        string memory _productId,
        string memory _name,
        uint _price,
        uint _quantity
    ) public {
        require(!products[_productId].exists, "Product already exists.");

        // Initialize the product
        products[_productId] = Product({
            productId: _productId,
            name: _name,
            price: _price,
            quantity: _quantity,
            exists: true
        });

        // Increment the product count
        productCount++;

        // Store the product ID
        productIds.push(_productId);

        emit ProductAdded(_productId, _name, _price, _quantity);
    }

    // Function to get the total product count
    function getProductCount() public view returns (uint) {
        return productCount;
    }

    // Function to get product ID at a specific index
    function getProductIdAtIndex(
        uint _index
    ) public view returns (string memory) {
        require(_index < productIds.length, "Index out of bounds.");
        return productIds[_index];
    }
}
