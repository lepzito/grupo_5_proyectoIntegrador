const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log("Servidor correindo en el puerto " + PORT));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html"))
);
app.get("/productDetail", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "productDetail.html"))
);

app.get("/carrito.html", (req, res) => res.sendFile(path.join(__dirname, "views", "carrito.html")))

app.get("/register.html", (req,res) => res.sendFile(path.join(__dirname, "views", "register.html")))