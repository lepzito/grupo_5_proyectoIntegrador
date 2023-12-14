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
          through: {
            model: ProductoCarrito,
            attributes: ["cantidad", "productoId", "carritoId"], // Incluimos la cantidad desde ProductoCarrito
          },
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
  addToCart: function (req, res) {
    const productId = req.params.id;
    const carritoId = req.session.userLogged.carrito[0].id;
    console.log(req.body);
    Carrito.findOne({
      where: {
        id: carritoId,
        status: 1, // Aseguramos que el carrito esté activo
      },
      include: "productos",
    }).then((cart) => {
      const productFound = cart.productos.find((p) => p.id == productId);
      if (req.body.cantidad == 0) {
        ProductoCarrito.destroy({
          where: {
            carritoId: carritoId,
            productId: productId,
          },
        }).then(() => {
          return res.status(201).json({ statusCode: res.statusCode });
        });
        // En tu ruta de la API
      } else {
        if (productFound) {
          ProductoCarrito.update(
            {
              cantidad: req.body.cantidad,
            },
            {
              where: {
                carritoId: carritoId,
                productId: productId,
              },
            }
          ).then(() => {
            return res.status(201).json({
              statusCode: res.statusCode,
            });
          });
        } else {
          ProductoCarrito.create({
            carritoId: cart.id,
            productoId: productId,
            cantidad: 1,
          }).then(() => {
            return res.status(201).json({
              statusCode: res.statusCode,
            });
          });
        }
      }
    });
  },
};

module.exports = carritoControllers;
