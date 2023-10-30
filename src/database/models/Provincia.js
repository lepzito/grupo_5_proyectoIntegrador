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
      tableName: "provincia", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
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
