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

app.get("/carrito", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "carrito.html"))
);
app.get("/login-register", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "login-register.html"))
);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/procesar-datos", (req, res) => {
  res.redirect("/");
});
