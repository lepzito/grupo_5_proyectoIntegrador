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
      tableName: "genero", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  Genero.associate = (models) => {
    Genero.hasMany(models.Usuario, {
      as: "usuarios",
      foreignKey: "generoId",
    });
  };

  return Genero;
};
