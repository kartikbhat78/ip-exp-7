const express = require("express");
const app = express();
const { products } = require("./data");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get list of products
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    return { id, name, image, price };
  });
  res.json(newProducts);
});

// Get product by ID
app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  res.json(singleProduct);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});