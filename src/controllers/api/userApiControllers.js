const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const userApiController = {
  list: (req, res) => {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    db.Usuario.findAndCountAll({
      limit: limit,
      offset: offset,
    })
      .then((result) => {
        const users = result.rows;
        const totalCount = result.count;

        const response = {
          count: users.length,
          totalCount: totalCount,
          users: users.map((usuario) => ({
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            apellidoUsuario: usuario.apellidoUsuario,
            email: usuario.email,
            detail: `/api/users/${usuario.id}`,
          })),
          next:
            page * limit < totalCount
              ? `/api/users/?page=${parseInt(page) + 1}`
              : null,
          previous: page > 1 ? `/api/users/?page=${parseInt(page) - 1}` : null,
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

        const response = {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          apellidoUsuario: usuario.apellidoUsuario,
          email: usuario.email,
          telefono: usuario.telefono,
          imgUser: `/images/users/${usuario.imgUser}`,
          genero: usuario.genero ? usuario.genero.nombre : null,
          domicilio: usuario.domicilio
            ? {
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

module.exports = userApiController;
