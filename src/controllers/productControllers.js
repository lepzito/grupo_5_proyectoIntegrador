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
    Producto.findAll()
      .then(function (productos) {
        res.render("products", { products: productos });
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
        console.log(producto.caracteristicas);
        res.render("productDetail", { product: producto });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  search: function (req, res) {
    const loQueBuscaElUsuario = req.query.search;

    // Realiza una búsqueda en la base de datos
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
        // Renderizar la vista de administrador y pasar los datos a la vista
        res.render("admin-products", { products });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },

  create: function (req, res) {
    // Cargar tipos, secciones y marcas
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
        nuevoProducto = producto; // Almacena el nuevo producto
        // Guardar las especificaciones
        const especificaciones = [];
        for (let i = 1; i <= 5; i++) {
          const nombreEspec = req.body[`especificacionNombre${i}`];
          const valorEspec = req.body[`especificacionValor${i}`];

          if (nombreEspec && valorEspec) {
            especificaciones.push({
              productoId: nuevoProducto.id, // Usa el ID del nuevo producto
              nombre: nombreEspec,
              valor: valorEspec,
            });
          }
        }
        return Especificacion.bulkCreate(especificaciones);
      })
      .then(() => {
        res.redirect("/products/");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
  edit: function (req, res) {
    const id = req.params.id;

    // Variables para almacenar los resultados
    let productToEdit;
    let tipos;
    let secciones;
    let marcas;

    // Busca el producto en la base de datos por su ID
    Producto.findByPk(id, {
      include: { association: "especificaciones" },
    })
      .then((product) => {
        if (!product) {
          return res.status(404).send("Producto no encontrado");
        }
        productToEdit = product;

        // Cargar la variable "tipos" desde la base de datos
        return Tipo.findAll();
      })
      .then((tiposResult) => {
        tipos = tiposResult;

        // Cargar la variable "secciones" desde la base de datos
        return Seccion.findAll();
      })
      .then((seccionesResult) => {
        secciones = seccionesResult;

        // Cargar la variable "marcas" desde la base de datos
        return Marca.findAll();
      })
      .then((marcasResult) => {
        marcas = marcasResult;

        // Renderiza la vista con los datos del producto y las variables "tipos," "secciones," y "marcas"
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

    // Verifica si se envió una nueva imagen
    if (req.file) {
      const nuevaImagen = "/images/images_products/" + req.file.filename;

      // Actualiza la imagen solo si se cargó una nueva
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
        res.redirect(`/products`);
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
        res.redirect("/products");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
};
module.exports = productControllers;
