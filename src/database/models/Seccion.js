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
        allowNull: false,
      },
    },
    {
      tableName: "Seccion", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );
  Seccion.associate = (models) => {
    // Definir la relación con los productos
    Seccion.hasMany(models.Producto, {
      as: "productos", // Alias para la relación
      foreignKey: "seccion_id", // La clave foránea en la tabla Productos
    });
  };

  return Seccion;
};
