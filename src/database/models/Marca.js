module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define(
    "Marca",
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
      tableName: "Marca", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  Marca.associate = (models) => {
    // Asociación con el modelo Producto (Una marca tiene muchos productos)
    Marca.hasMany(models.Producto, {
      as: "productos",
      foreignKey: "marcaId",
    });
  };

  return Marca;
};
