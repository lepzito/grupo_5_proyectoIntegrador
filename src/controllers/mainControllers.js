const fs = require("fs");
const path = require("path");

let products = function () {
  const route = path.join(__dirname, "../database/products.json");
  const file = fs.readFileSync(route, "utf-8");
  return JSON.parse(file);
};

const mainControllers = {
  index: function (req, res) {
    res.render("index", { productsIndex: products() });
  },

  contacto: function (req, res) {
    res.render("contacto");
  },
  productsIndex: function (req, res) {
    res.render("contacto");
  },
};
module.exports = mainControllers;
