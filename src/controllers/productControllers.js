const fs = require("fs");
const path = require("path");

const route = path.join(__dirname, "../data/products.json");
function products() {
  return (file = JSON.parse(fs.readFileSync(route, "utf-8")));
}

const productControllers = {
  all: function (req, res) {
    res.render("products", { products: products() });
  },

  smartphones: function (req, res) {
    res.render("listado de productos filtrando solo los smartphones");
  },
  pcArmadas: function (req, res) {
    res.render("Pc armadas entre ellas las notenbok");
  },
  detalle: function (req, res) {
    let idProduct = req.params.id;
    const product = products().find((product) => product.id == idProduct);
    res.render("productDetail", { product: product });
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
    const { nombre, precio, descripcion, descuento, tipo } = req.body;
    const id = req.params.id;

    let currentProducts = products();

    currentProducts.forEach((prod) => {
      if (prod.id == id) {
        prod.nombre = nombre !== "" ? nombre : prod.nombre;
        prod.precio =
          parseFloat(precio) !== "" ? parseFloat(precio) : prod.precio;
        prod.descripcion = descripcion !== "" ? descripcion : prod.descripcion;
        prod.descuento = descuento !== "" ? descuento : prod.descuento;
        prod.tipo = tipo !== "" ? tipo : prod.tipo;
        prod.img = "/images/images_products/" + req.file.filename;
      }
    });

    fs.writeFileSync(route, JSON.stringify(currentProducts, null, 2));
    res.redirect(`/products/admin`);
  },

  //FORM PAGE
  create: function (req, res) {
    res.render("product-create", { products: products() });
  },
  store: function (req, res) {
    const {
      nombre,
      precio,
      descripcion,
      descuento,
      tipo,
      caracteristicas,
      valores,
    } = req.body;
    const newProductId = products()[products().length - 1].id + 1;

    const caracteristicasObj = {};
    for (const key in caracteristicas) {
      caracteristicasObj[caracteristicas[key]] = valores[key];
    }

    const newProduct = {
      id: newProductId,
      nombre: nombre,
      precio: parseFloat(precio),
      img: "/images/images_products/" + req.file.filename,
      descripcion: descripcion,
      descuento: descuento,
      tipo: tipo,
      caracteristicas: caracteristicasObj,
    };

    let currentProducts = products();

    // Agregar el nuevo producto a los datos existentes
    currentProducts.push(newProduct);

    // Escribir los datos actualizados nuevamente en el archivo
    fs.writeFileSync(route, JSON.stringify(currentProducts, null, 2));

    return res.redirect("/products");
  },
  destroy: function (req, res) {
    const id = req.params.id;

    // Filtrar los productos para eliminar el producto con el ID especificado
    const updatedProducts = products().filter((prod) => prod.id != id);

    fs.writeFileSync(route, JSON.stringify(updatedProducts, null, 2));
    res.redirect("/products/admin");
  },
};
module.exports = productControllers;
