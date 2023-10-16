const db = require("../database/models");
const { Producto } = require("../database/models");

const mainControllers = {
  index: function (req, res) {
    Producto.findAll()
      .then(function (productos) {
        res.render("index", { productsIndex: productos });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },

  contacto: function (req, res) {
    res.render("contacto");
  },
  productsIndex: function (req, res) {
    res.render("contacto");
  },
};
module.exports = mainControllers;
