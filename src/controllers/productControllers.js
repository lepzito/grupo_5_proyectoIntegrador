const db = require("../database/models");
const Sequelize = require("sequelize");
const {
  Producto,
  Tipo,
  Seccion,
  Marca,
  Especificacion,
} = require("../database/models");

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
    console.log(req.body);
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
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  edit: function (req, res) {
    const id = req.params.id;

    let productToEdit;
    let tipos;
    let secciones;
    let marcas;

    Producto.findByPk(id, {
      include: { association: "especificaciones" },
    })
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
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  update: (req, res) => {
    const { nombre, precio, descripcion, descuento, tipo, marca, seccion } =
      req.body;
    const id = req.params.id;

    if (req.file) {
      const nuevaImagen = "/images/images_products/" + req.file.filename;

      Producto.update({ img: nuevaImagen }, { where: { id: id } })
        .then(([Updated]) => {
          if (Updated === 0) {
            return res.status(404).send("Producto no encontrado");
          }
        })
        .catch((error) => {
          console.error(error);
          return res
            .status(500)
            .send("Error al actualizar la imagen del producto");
        });
    }

    Producto.update(
      {
        nombre,
        precio: parseFloat(precio),
        descripcion,
        descuento: parseFloat(descuento),
        tipoId: parseInt(tipo),
        marcaId: parseInt(marca),
        seccionId: parseInt(seccion),
      },
      {
        where: { id: id },
      }
    )
      .then(([Updated]) => {
        if (Updated === 0) {
          return res.status(404).send("Producto no encontrado");
        }
        res.redirect(`/products/admin`);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  destroy: (req, res) => {
    let id = req.params.id;
    Producto.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }
        return product.getEspecificaciones();
      })
      .then((especificaciones) => {
        console.log("Especificaciones a eliminar:", especificaciones);

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
        res.redirect("/products/admin");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
};
module.exports = productControllers;
