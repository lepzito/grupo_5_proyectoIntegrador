module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    "Producto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
      },
      img: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      descuento: {
        type: DataTypes.INTEGER,
      },
      tipoId: {
        type: DataTypes.INTEGER,
      },
      seccionId: {
        type: DataTypes.INTEGER,
      },
      marcaId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Producto",
      timestamps: false,
    }
  );

  Producto.associate = (models) => {
    Producto.belongsTo(models.Tipo, {
      as: "tipo",
      foreignKey: "tipoId",
    });

    Producto.belongsTo(models.Seccion, {
      as: "seccion",
      foreignKey: "seccionId",
    });

    Producto.belongsTo(models.Marca, {
      as: "marca",
      foreignKey: "marcaId",
    });
    Producto.hasMany(models.Especificacion, {
      as: "especificaciones",
      foreignKey: "productoId",
    });
    Producto.belongsToMany(models.Carrito, {
      as: "carritos",
      through: models.ProductoCarrito,
      foreignKey: "productoId",
      otherKey: "carritoId",
    });
  };

  return Producto;
};
