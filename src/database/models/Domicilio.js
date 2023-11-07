module.exports = (sequelize, DataTypes) => {
  const Domicilio = sequelize.define(
    "Domicilio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      provinciaId: {
        type: DataTypes.INTEGER,
      },
      localidad: {
        type: DataTypes.STRING,
      },
      barrio: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.INTEGER,
      },
      codigoPostal: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "domicilio",
      timestamps: false,
    }
  );

  Domicilio.associate = (models) => {
    Domicilio.belongsTo(models.Provincia, {
      as: "provincia",
      foreignKey: "provinciaId",
    });
  };

  return Domicilio;
};
