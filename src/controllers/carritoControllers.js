const db = require("../database/models");
const Sequelize = require("sequelize");
const {
  Producto,
  Carrito,
  Usuario,
  ProductoCarrito,
} = require("../database/models");

const carritoControllers = {
  carrito: function (req, res) {
    const usuarioId = req.session.userLogged.id;

    Carrito.findOne({
      where: {
        usuarioId: usuarioId,
      },
      include: [
        {
          model: Producto,
          as: "productos",
        },
      ],
    })
      .then(function (carrito) {
        res.render("carrito", { carrito: carrito });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
};
module.exports = carritoControllers;
