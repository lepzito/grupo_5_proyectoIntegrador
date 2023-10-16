module.exports = (sequelize, DataTypes) => {
  const Seccion = sequelize.define(
    "Seccion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Seccion", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  Seccion.associate = (models) => {
    // Asociación con el modelo Producto (una sección tiene muchos productos)
    Seccion.hasMany(models.Producto, {
      foreignKey: "seccionId", // Nombre de la columna de clave externa en la tabla Producto
      as: "productos", // Alias para acceder a los productos desde una sección
    });
  };

  return Seccion;
};
