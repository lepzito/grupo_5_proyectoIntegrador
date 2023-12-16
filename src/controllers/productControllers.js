const db = require("../database/models");
const Sequelize = require("sequelize");
const {
  Producto,
  Tipo,
  Seccion,
  Marca,
  Especificacion,
  Carrito,
  ProductoCarrito,
} = require("../database/models");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const productControllers = {
  all: function (req, res) {
    const productsPerPage = 6;

    const page = req.query.page || 1;

    Producto.findAndCountAll({
      limit: productsPerPage,
      offset: (page - 1) * productsPerPage,
    })
      .then(function (result) {
        const products = result.rows;
        const totalProducts = result.count;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        res.render("products", {
          products,
          currentPage: page,
          totalPages,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },

  detalle: function (req, res) {
    let idProduct = req.params.id;

    Producto.findByPk(idProduct, {
      include: [
        { association: "marca" },
        { association: "tipo" },
        { association: "especificaciones" },
      ],
    })
      .then(function (producto) {
        res.render("productDetail", { product: producto });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  search: function (req, res) {
    const loQueBuscaElUsuario = req.query.search;

    Producto.findAll({
      where: {
        nombre: {
          [Sequelize.Op.like]: "%" + loQueBuscaElUsuario + "%",
        },
      },
    })
      .then((productosResultantes) => {
        res.render("productResults", {
          productosResultantes: productosResultantes,
        });
      })
      .catch((error) => {
        console.error("Error al buscar productos:", error);
        res.status(500).send("Error interno del servidor");
      });
  },
  carrito: function (req, res) {
    res.render("carrito", { products: products() });
  },
  admin: function (req, res) {
    Producto.findAll()
      .then((products) => {
        res.render("admin-products", { products });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },

  create: function (req, res) {
    Promise.all([Tipo.findAll(), Seccion.findAll(), Marca.findAll()])
      .then(function ([tipos, secciones, marcas]) {
        res.render("product-create", {
          tipos: tipos,
          secciones: secciones,
          marcas: marcas,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  store: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      Promise.all([Tipo.findAll(), Seccion.findAll(), Marca.findAll()]).then(
        function ([tipos, secciones, marcas]) {
          res.render("product-create", {
            tipos: tipos,
            secciones: secciones,
            marcas: marcas,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
      );
    } else {
      const { nombre, precio, descripcion, descuento, tipo, marca, seccion } =
        req.body;

      let nuevoProducto;

      Producto.create({
        nombre,
        precio: parseFloat(precio),
        descripcion,
        descuento: parseFloat(descuento),
        tipoId: parseInt(tipo),
        marcaId: parseInt(marca),
        seccionId: parseInt(seccion),
        img: "/images/images_products/" + req.file.filename,
      })
        .then((producto) => {
          nuevoProducto = producto;
          const especificaciones = [];
          for (let i = 1; i <= 5; i++) {
            const nombreEspec = req.body[`especificacionNombre${i}`];
            const valorEspec = req.body[`especificacionValor${i}`];

            if (nombreEspec && valorEspec) {
              especificaciones.push({
                productoId: nuevoProducto.id,
                nombre: nombreEspec,
                valor: valorEspec,
              });
            }
          }
          return Especificacion.bulkCreate(especificaciones);
        })
        .then(() => {
          res.redirect("/products/admin");
        })
        .catch((error) => {
          res.status(500).send("Error interno del servidor");
        });
    }
  },
  edit: function (req, res) {
    const id = req.params.id;

    let productToEdit;
    let tipos;
    let secciones;
    let marcas;

    Producto.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }
        productToEdit = product;

        return Tipo.findAll();
      })
      .then((tiposResult) => {
        tipos = tiposResult;

        return Seccion.findAll();
      })
      .then((seccionesResult) => {
        secciones = seccionesResult;

        return Marca.findAll();
      })
      .then((marcasResult) => {
        marcas = marcasResult;

        res.render("product-edit", { productToEdit, tipos, secciones, marcas });
      })
      .catch((error) => {
        res.status(500).send("Error interno del servidor");
      });
  },
  update: (req, res) => {
    const id = req.params.id;
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../../public/images/images_products",
          req.file.filename
        );
        fs.unlinkSync(imagePath);
      }
      let productToEdit;
      let tipos;
      let secciones;
      let marcas;

      Producto.findByPk(id, { include: { association: "especificaciones" } })
        .then((product) => {
          productToEdit = product;

          if (!productToEdit) {
            return res.status(404).send("Producto no encontrado");
          }

          // Obtener tipos, secciones y marcas
          return Promise.all([
            Tipo.findAll(),
            Seccion.findAll(),
            Marca.findAll(),
          ]);
        })
        .then(([tiposResult, seccionesResult, marcasResult]) => {
          tipos = tiposResult;
          secciones = seccionesResult;
          marcas = marcasResult;

          // Renderizar el formulario con errores
          return res.render("product-edit", {
            productToEdit,
            tipos,
            secciones,
            marcas,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        })
        .catch((error) => {
          // Manejar el error interno del servidor
          return res.status(500).send("Error interno del servidor");
        });
    } else {
      // Redirigir a la página de administración de productos si no hay cambios
      if (
        req.body.nombre === req.body.oldNombre &&
        req.body.precio === req.body.oldPrecio &&
        req.body.descripcion === req.body.oldDescripcion
      ) {
        return res.redirect(`/products/admin`);
      }

      // Actualizar campos del producto
      const { nombre, precio, descripcion, descuento, tipo, marca, seccion } =
        req.body;

      // Actualizar producto
      Producto.update(
        {
          nombre,
          precio: parseFloat(precio),
          descripcion,
          descuento: parseFloat(descuento),
          tipoId: parseInt(tipo),
          marcaId: parseInt(marca),
          seccionId: parseInt(seccion),
          ...(req.file && {
            img: "/images/images_products/" + req.file.filename,
          }),
        },
        {
          where: { id: id },
        }
      )
        .then(() => {
          // Redirigir a la página de administración de productos
          return res.redirect(`/products/admin`);
        })
        .catch((error) => {
          console.error("Error en actualización:", error);
          // Manejar el error interno del servidor
          return res.status(500).send("Error interno del servidor");
        });
    }
  },
  addToCart: (req, res) => {
    const productId = req.params.id;
    const carritoId = req.session.userLogged.carrito[0].id;
    console.log(carritoId);
    Carrito.findOne({
      where: {
        id: carritoId,
        status: 1, // Aseguramos que el carrito esté activo
      },
      include: "productos",
    })
      .then((cart) => {
        // Buscamos si el producto ya está en el carrito
        const productFound = cart.productos.find((p) => p.id == productId);
        // Si existe el producto incrementamos la cantidad
        if (productFound) {
          ProductoCarrito.update(
            {
              cantidad: productFound.ProductoCarrito.cantidad + 1, // Incrementamos la cantidad
            },
            {
              where: {
                carritoId: carritoId,
                productoId: productId,
              },
            }
          );
        } else {
          // Si el producto no se encontraba en el carrito, lo agregamos con cantidad 1
          return ProductoCarrito.create({
            carritoId: cart.id,
            productoId: productId,
            cantidad: 1,
          });
        }
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {
        console.error("Error al agregar al carrito:", error);
        // Manejo de errores, puedes redirigir a una página de error o hacer otra acción.
        if (error.message === "No se encontró el carrito.") {
          res.status(404).send("No se encontró el carrito.");
        } else {
          res.status(500).send("Error interno del servidor");
        }
      });
  },

  destroy: (req, res) => {
    let id = req.params.id;
    let imagePathToDelete; // Variable para almacenar la ruta de la imagen

    Producto.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }

        // Obtén la ruta de la imagen actual
        imagePathToDelete = path.join(__dirname, "../../public" + product.img);

        return product.getEspecificaciones();
      })
      .then((especificaciones) => {
        return Promise.all(
          especificaciones.map((especificacion) => especificacion.destroy())
        );
      })
      .then(() => {
        return Producto.destroy({
          where: { id: id },
        });
      })
      .then(() => {
        // Eliminar la imagen del servidor después de eliminar el producto de la base de datos
        fs.unlinkSync(imagePathToDelete);

        res.redirect("/products/admin");
      })
      .catch((error) => {
        console.error("Error en eliminación:", error);
        res.status(500).send("Error interno del servidor");
      });
  },
};
module.exports = productControllers;
