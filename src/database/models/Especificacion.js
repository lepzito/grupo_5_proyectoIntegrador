// models/Especificacion.js
module.exports = (sequelize, DataTypes) => {
  const Especificacion = sequelize.define(
    "Especificacion",
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
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Especificaciones",
      timestamps: false,
    }
  );

  Especificacion.associate = (models) => {
    // Asociación con el modelo Producto (Una marca tiene muchos productos)
    Especificacion.belongsTo(models.Producto, {
      foreignKey: "productoId", // Nombre de la columna que representa la relación
      as: "producto", // Alias para la relación
    });
  };

  return Especificacion;
};
