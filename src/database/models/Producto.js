module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    "Producto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
      },
      img: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      descuento: {
        type: DataTypes.INTEGER,
      },
      tipoId: {
        type: DataTypes.INTEGER,
      },
      seccionId: {
        type: DataTypes.INTEGER,
      },
      marcaId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Producto", // Nombre de la tabla en la base de datos
      timestamps: false, // No se utilizarán marcas de tiempo
    }
  );

  Producto.associate = (models) => {
    // Asociación con el modelo Tipo (Un producto pertenece a un tipo)
    Producto.belongsTo(models.Tipo, {
      as: "tipo",
      foreignKey: "tipoId",
    });

    // Asociación con el modelo Seccion (Un producto pertenece a una sección)
    Producto.belongsTo(models.Seccion, {
      as: "seccion",
      foreignKey: "seccionId",
    });

    // Asociación con el modelo Marca (Un producto pertenece a una marca)
    Producto.belongsTo(models.Marca, {
      as: "marca",
      foreignKey: "marcaId",
    });
    Producto.hasMany(models.Especificacion, {
      as: "especificaciones",
      foreignKey: "productoId",
    });
  };

  return Producto;
};
