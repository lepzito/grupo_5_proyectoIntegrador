const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const rutasMain = require("./routes/main.js");
const rutasProductos = require("./routes/products.js");
const rutasUsers = require("./routes/users.js");
const rutasCarts = require("./routes/cart.js");

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware.js");
const cookies = require("cookie-parser");
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
app.use(cookies());

app.use(userLoggedMiddleware);
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.resolve(__dirname, "./views"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/*------------------------------------------------------------------*/

app.use("/", rutasMain);

app.use("/products", rutasProductos);

app.use("/users", rutasUsers);

app.use("/carrito", rutasCarts);
/*------------------------------------------------------------------*/
