module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define(
    "Genero",
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
      tableName: "genero",
      timestamps: false,
    }
  );

  return Genero;
};
