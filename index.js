const express = require("express");
const app = express();
const product = require("./api/product");
const dt = require("./main")
dt.getD("SOL")
app.use(express.json({ extended: false }));

app.use("/api/product", product);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
