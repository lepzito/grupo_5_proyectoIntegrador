const express = require("express");
const app = express();
const path = require("path");

const rutasMain = require("./routes/main.js");
const rutasProductos = require("./routes/products.js");
const rutasUsers = require("./routes/users.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en el puerto " + PORT));

/*------------------------------------------------------------------*/

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");

/*------------------------------------------------------------------*/

app.use("/", rutasMain);

app.use("/products", rutasProductos);

app.use("/login-register", rutasUsers);

/*------------------------------------------------------------------*/

app.post("/procesar-datos", (req, res) => {
  res.redirect("/");
});
