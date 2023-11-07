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
    Especificacion.belongsTo(models.Producto, {
      foreignKey: "productoId",
      as: "producto",
    });
  };

  return Especificacion;
};
