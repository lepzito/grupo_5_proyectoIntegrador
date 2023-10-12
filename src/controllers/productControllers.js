const db = require("../database/models");
const {
  Producto,
  Tipo,
  Seccion,
  CaracteristicaProducto,
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
      include: [{ association: "tipo" }, { association: "caracteristicas" }],
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
    let loQueBuscoElUsario = req.query.search;
    let productosResultantes = [];
    for (let i = 0; i < products().length; i++) {
      if (products()[i].nombre.includes(loQueBuscoElUsario)) {
        productosResultantes.push(products()[i]);
      }
    }
    res.render("productResults", {
      productosResultantes: productosResultantes,
    });
  },
  carrito: function (req, res) {
    res.render("carrito", { products: products() });
  },
  admin: function (req, res) {
    res.render("admin-products.ejs", { products: products() });
  },
  edit: function (req, res) {
    const id = req.params.id;
    const productToEdit = products().find((product) => product.id == id);
    res.render("product-edit", { productToEdit: productToEdit });
  },
  //SAMUEL
  update: (req, res) => {
    const {
      nombre,
      precio,
      descripcion,
      descuento,
      tipo,
      marca,
      seccion,
      caracteristicas,
      valores,
    } = req.body;
    const id = req.params.id;

    const caracteristicasObj = {};
    for (const key in caracteristicas) {
      caracteristicasObj[caracteristicas[key]] = valores[key];
    }

    let currentProducts = products();

    currentProducts.forEach((prod) => {
      if (prod.id == id) {
        prod.nombre = nombre !== "" ? nombre : prod.nombre;
        prod.precio =
          parseFloat(precio) !== "" ? parseFloat(precio) : prod.precio;
        prod.descripcion = descripcion !== "" ? descripcion : prod.descripcion;
        prod.descuento =
          parseFloat(descuento) !== "" ? parseFloat(descuento) : prod.descuento;
        prod.tipo = tipo !== "" ? tipo : prod.tipo;
        prod.img = req.file
          ? "/images/images_products/" + req.file.filename
          : prod.img;
        prod.marca = marca !== "" ? marca : prod.marca;
        prod.seccion = seccion;
        prod.caracteristicas = caracteristicasObj;
      }
    });

    fs.writeFileSync(route, JSON.stringify(currentProducts, null, 2));
    res.redirect(`/products/admin`);
  },

  //FORM PAGE
  create: function (req, res) {
    Tipo.findAll()
      .then(function (tipos) {
        Seccion.findAll()
          .then(function (secciones) {
            res.render("product-create", {
              tipos: tipos,
              secciones: secciones,
            });
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
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

    let tipoId;
    let seccionId;

    // Buscar el ID del tipo por su nombre
    Tipo.findOne({ where: { nombre: tipo } })
      .then((tipoResultado) => {
        if (tipoResultado) {
          tipoId = tipoResultado.id;
        }
        // Buscar el ID de la sección por su nombre
        return Seccion.findOne({ where: { nombre: seccion } });
      })
      .then((seccionResultado) => {
        if (seccionResultado) {
          seccionId = seccionResultado.id;
        }
        // Crear el producto con los IDs de tipo y sección
        return Producto.create({
          nombre,
          precio: parseFloat(precio),
          descripcion,
          descuento: parseFloat(descuento),
          marca,
          tipo_id: tipoId,
          seccion_id: seccionId,
          img: "/images/images_products/" + req.file.filename,
        });
      })
      .then((producto) => {
        res.redirect("/products/");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error interno del servidor");
      });
  },
};
module.exports = productControllers;
