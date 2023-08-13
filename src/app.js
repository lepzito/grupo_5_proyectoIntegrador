const express = require("express");
const app = express();
const path = require("path");

const rutasMain = require("./routes/main.js");
const rutasProductos = require("./routes/products.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en el puerto " + PORT));

/*------------------------------------------------------------------*/

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");

/*------------------------------------------------------------------*/
app.use((req, res, next) => {
  res.status(404).render("not-found");
});
app.use("/", rutasMain);

app.use("/products", rutasProductos);

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
