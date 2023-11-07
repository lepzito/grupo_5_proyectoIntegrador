module.exports = (sequelize, DataTypes) => {
  const ProductoCarrito = sequelize.define(
    "ProductoCarrito",
    {
      carritoId: {
        type: DataTypes.INTEGER,
      },
      productoId: {
        type: DataTypes.INTEGER,
      },
      cantidad: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "ProductoCarrito",
      timestamps: false,
    }
  );

  ProductoCarrito.associate = (models) => {
    // Asociación con el modelo Carrito (Un productoCarrito pertenece a un carrito)
    ProductoCarrito.belongsTo(models.Carrito, {
      as: "carrito",
      foreignKey: "carritoId",
    });

    // Asociación con el modelo Producto (Un productoCarrito pertenece a un producto)
    ProductoCarrito.belongsTo(models.Producto, {
      as: "producto",
      foreignKey: "productoId",
    });
  };

  return ProductoCarrito;
};
