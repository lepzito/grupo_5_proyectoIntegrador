const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const userController = {
  list: (req, res) => {
    db.User.findAll()
      .then((users) => {
        const response = {
          count: users.length,
          users: users.map((usuario) => ({
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            apellidoUsuario: usuario.apellidoUsuario,
            email: usuario.email,
            detail: `/api/users/${usuario.id}`,
          })),
        };
        res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ error: "Error interno del servidor" });
      });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;

    db.Usuario.findByPk(userId, {
      include: [
        { model: db.Genero, as: "genero" },
        { model: db.Domicilio, as: "domicilio" },
      ],
      attributes: {
        exclude: ["password"],
      },
    })
      .then((usuario) => {
        if (!usuario) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Puedes construir la URL de la imagen aquí si tienes esa información en tu modelo
        const imageUrl = `/api/users/${userId}/image`;

        const response = {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          apellidoUsuario: usuario.apellidoUsuario,
          email: usuario.email,
          telefono: usuario.telefono,
          imgUser: imageUrl,
          genero: usuario.genero ? usuario.genero.nombre : null,
          domicilio: usuario.domicilio
            ? {
                id: usuario.domicilio.id,
                localidad: usuario.domicilio.localidad,
                barrio: usuario.domicilio.barrio,
                calle: usuario.domicilio.calle,
                numero: usuario.domicilio.numero,
                codigoPostal: usuario.domicilio.codigoPostal,
              }
            : null,
        };

        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
      });
  },
};

module.exports = userController;
