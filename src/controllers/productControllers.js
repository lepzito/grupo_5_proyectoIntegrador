const fs = require("fs");
const path = require("path");

let products = function () {
  const route = path.join(__dirname, "../database/products.json");
  const file = fs.readFileSync(route, "utf-8");
  return JSON.parse(file);
};

const productControllers = {
  all: function (req, res) {
    res.render("listado de productos");
  },

  smartphones: function (req, res) {
    res.render("listado de productos filtrando solo los smartphones");
  },
  pcArmadas: function (req, res) {
    res.render("Pc armadas entre ellas las notenbok");
  },
  detalle: function (req, res) {
    let idProduct = req.params.id;
    let product = products().find((product) => product.id == idProduct);
    res.render("productDetail", { product: product });
  },
};
module.exports = productControllers;
