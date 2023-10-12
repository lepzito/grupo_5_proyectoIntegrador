module.exports = (sequelize, DataTypes) => {
  const Tipo = sequelize.define(
    "Tipo",
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
      tableName: "Tipo",
      timestamps: false,
    }
  );
  Tipo.associate = (models) => {
    // Definir la relación con los productos
    Tipo.hasMany(models.Producto, {
      as: "productos", // Alias para la relación
      foreignKey: "tipo_id", // La clave foránea en la tabla Productos
    });
  };

  return Tipo;
};
