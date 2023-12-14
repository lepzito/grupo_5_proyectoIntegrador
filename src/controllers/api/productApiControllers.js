const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const productAPIController = {
  list: (req, res) => {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    db.Tipo.findAll() // Obtener todas las categorías
      .then((allCategories) => {
        const categoryIds = allCategories.map((category) => category.id);

        db.Producto.findAll({
          include: [{ model: db.Tipo, as: "tipo" }],
          limit: limit,
          offset: offset,
        })
          .then((products) => {
            db.Producto.count().then((totalCount) => {
              const countByCategory = {};

              // Inicializar el contador para todas las categorías
              allCategories.forEach((category) => {
                countByCategory[category.nombre] = 0;
              });

              products.forEach((product) => {
                const categoryName = product.tipo
                  ? product.tipo.nombre
                  : "Sin Categoría";
                countByCategory[categoryName]++;
              });

              const response = {
                count: products.length,
                totalCount: totalCount,
                countByCategory: countByCategory,
                products: products.map((product) => ({
                  id: product.id,
                  nombre: product.nombre,
                  descripcion: product.descripcion,
                  categoria: product.tipo.nombre,
                  detalle: `/api/products/${product.id}`,
                })),
                next:
                  page * limit < totalCount
                    ? `/api/products/?page=${parseInt(page) + 1}`
                    : null,
                previous:
                  page > 1 ? `/api/products/?page=${parseInt(page) - 1}` : null,
              };

              res.json(response);
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error interno del servidor" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error interno del servidor" });
      });
  },

  getById: (req, res) => {
    const productId = req.params.id;

    db.Producto.findByPk(productId, {
      include: [
        { model: db.Tipo, as: "tipo" },
        { model: db.Seccion, as: "seccion" },
        { model: db.Marca, as: "marca" },
        { model: db.Especificacion, as: "especificaciones" },
      ],
    })
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: "Producto no encontrado" });
        }

        db.Especificacion.findAll({
          where: { productoId: productId },
        })
          .then((especificaciones) => {
            const response = {
              id: product.id,
              nombre: product.nombre,
              precio: product.precio,
              img: product.img,
              descripcion: product.descripcion,
              tipo: product.tipo,
              marca: product.marca,
              descuento: product.descuento !== null ? product.descuento : null,
              seccion: product.seccion,
              especificaciones: especificaciones.map((spec) => ({
                nombre: spec.nombre,
                valor: spec.valor,
              })),
            };
            res.json(response);
          })
          .catch((error) => {
            res.status(500).json({
              error: "Error interno del servidor al obtener especificaciones",
            });
          });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Error interno del servidor al obtener producto" });
      });
  },
};

module.exports = productAPIController;
