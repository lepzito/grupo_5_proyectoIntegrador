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
      },
    },
    {
      tableName: "Tipo",
      timestamps: false,
    }
  );

  Tipo.associate = (models) => {
    Tipo.hasMany(models.Producto, {
      as: "productos",
      foreignKey: "tipoId",
    });
  };

  return Tipo;
};
