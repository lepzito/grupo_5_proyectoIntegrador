module.exports = (sequelize, DataTypes) => {
  const Provincia = sequelize.define(
    "Provincia",
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
      tableName: "provincia",
      timestamps: false,
    }
  );

  Provincia.associate = (models) => {
    Provincia.hasMany(models.Domicilio, {
      as: "domicilios",
      foreignKey: "provinciaId",
    });
  };

  return Provincia;
};
