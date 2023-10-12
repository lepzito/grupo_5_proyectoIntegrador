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
      tipo_id: {
        type: DataTypes.BIGINT(10),
      },
      seccion_id: {
        type: DataTypes.INTEGER,
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
    },
    {
      tableName: "Productos", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  Producto.associate = (models) => {
    // Asociación con el modelo Tipo (Un producto pertenece a un tipo)
    Producto.belongsTo(models.Tipo, {
      as: "tipo",
      foreignKey: "tipo_id",
    });
    Producto.belongsTo(models.Seccion, {
      as: "seccion",
      foreignKey: "seccion_id",
    });
    Producto.hasMany(models.CaracteristicaProducto, {
      as: "caracteristicas",
      foreignKey: "producto_id",
    });
  };

  return Producto;
};
