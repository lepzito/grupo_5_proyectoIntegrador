const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const rutasMain = require("./routes/main.js");
const rutasProductos = require("./routes/products.js");
const rutasUsers = require("./routes/users.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en el puerto " + PORT));

/*------------------------------------------------------------------*/
app.use(
  session({
    secret: "Is a secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

/*------------------------------------------------------------------*/

app.use("/", rutasMain);

app.use("/products", rutasProductos);

app.use("/users", rutasUsers);

/*------------------------------------------------------------------*/

app.post("/procesar-datos", (req, res) => {
  res.redirect("/");
});
