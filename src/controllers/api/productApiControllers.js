const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const productAPIController = {
  list: (req, res) => {
    db.Producto.findAll({
      include: [
        { model: db.Tipo, as: "tipo" },
        { model: db.Seccion, as: "seccion" },
        { model: db.Marca, as: "marca" },
      ],
    })
      .then((products) => {
        // Contar la cantidad total de productos
        const count = products.length;

        // Contar productos por categoría (usando la asociación con Tipo)
        const countByCategory = {};
        products.forEach((product) => {
          const categoryName = product.tipo
            ? product.tipo.nombre
            : "Sin Categoría";
          countByCategory[categoryName] =
            (countByCategory[categoryName] || 0) + 1;
        });

        // Construir la respuesta final
        const response = {
          count: count,
          countByCategory: countByCategory,
          products: products.map((product) => ({
            id: product.id,
            name: product.nombre,
            description: product.descripcion,
            categories: product.tipo
              ? [product.tipo.nombre]
              : ["Sin Categoría"],
            detail: `/api/products/${product.id}`, // Ajusta la URL según tu estructura de rutas
          })),
        };

        res.json(response);
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

        // Obtener las especificaciones del producto
        db.Especificacion.findAll({
          where: { productoId: productId },
        })
          .then((especificaciones) => {
            // Construir la respuesta para el producto específico con sus especificaciones
            const response = {
              id: product.id,
              nombre: product.nombre,
              precio: product.precio,
              img: `/api/products/${product.id}/image`,
              descripcion: product.descripcion,
              tipo: product.tipo ? product.tipo.nombre : null,
              marca: product.marca ? product.marca.nombre : null,
              descuento: product.descuento,
              seccion: product.seccion ? product.seccion.nombre : null,
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

        // Obtener las especificaciones del producto
        db.Especificacion.findAll({
          where: { productoId: productId },
        })
          .then((especificaciones) => {
            // Construir la respuesta para el producto específico con sus especificaciones
            const response = {
              id: product.id,
              nombre: product.nombre,
              precio: product.precio,
              img: `/images/images_products/${product.img}`,
              descripcion: product.descripcion,
              tipo: product.tipo,
              marca: product.marca,
              descuento: product.descuento !== null ? product.descuento : null,
              seccion: product.seccion,
              especificaciones: especificaciones.map((spec) => ({
                nombre: spec.nombre,
                valor: spec.valor,
              })),
              imagen_url: product.img,
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
