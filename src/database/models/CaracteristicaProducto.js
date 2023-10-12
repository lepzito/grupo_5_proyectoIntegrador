module.exports = (sequelize, DataTypes) => {
  const CaracteristicaProducto = sequelize.define(
    "CaracteristicaProducto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_caracteristica: {
        type: DataTypes.STRING,
      },
      valor_caracteristica: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "CaracteristicasProductos", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  CaracteristicaProducto.associate = (models) => {
    // Definir la relación con el modelo Producto
    CaracteristicaProducto.belongsTo(models.Producto, {
      as: "producto",
      foreignKey: "producto_id",
    });
  };

  return CaracteristicaProducto;
};
