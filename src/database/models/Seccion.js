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
      tableName: "Seccion",
      timestamps: false,
    }
  );

  Seccion.associate = (models) => {
    Seccion.hasMany(models.Producto, {
      foreignKey: "seccionId",
      as: "productos",
    });
  };

  return Seccion;
};
