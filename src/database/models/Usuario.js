module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombreUsuario: {
        type: DataTypes.STRING,
      },
      apellidoUsuario: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      generoId: {
        type: DataTypes.INTEGER,
      },
      domicilioId: {
        type: DataTypes.INTEGER,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      imgUser: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "usuario",
      timestamps: false,
    }
  );

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Genero, {
      as: "genero",
      foreignKey: "generoId",
    });

    Usuario.belongsTo(models.Domicilio, {
      as: "domicilio",
      foreignKey: "domicilioId",
    });
    Usuario.hasMany(models.Carrito, {
      as: "carrito",
      foreignKey: "usuarioId",
    });
  };

  return Usuario;
};
