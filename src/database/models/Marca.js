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
      tableName: "Marca",
      timestamps: false,
    }
  );

  Marca.associate = (models) => {
    Marca.hasMany(models.Producto, {
      as: "productos",
      foreignKey: "marcaId",
    });
  };

  return Marca;
};
