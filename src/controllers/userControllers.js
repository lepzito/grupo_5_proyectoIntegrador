const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const userControllers = {
  login: function (req, res) {
    res.render("./users/login");
  },
  loginProcess: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("./users/login", {
        errors: resultValidation.mapped(),
      });
    }

    db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userToLogin) => {
        if (userToLogin) {
          const passwordCorrect = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );

          if (passwordCorrect) {
            delete userToLogin.password;

            req.session.userLogged = userToLogin;

            if (req.body.remember_user) {
              res.cookie("userEmail", req.body.email, {
                maxAge: 1000 * 60 * 30,
              });
            }

            return res.redirect("./profile");
          }
        }

        return res.render("./users/login", {
          errors: {
            credenciales: {
              msg: "Las credenciales son incorrectas",
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error en el proceso de login" });
      });
  },
  register: function (req, res) {
    Promise.all([db.Genero.findAll(), db.Provincia.findAll()])
      .then(([generos, provincias]) => {
        res.render("./users/register", { generos, provincias });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error al obtener los datos necesarios" });
      });
  },
  create: function (req, res) {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../../public/images/users",
          req.file.filename
        );
        fs.unlinkSync(imagePath);
      }

      Promise.all([db.Genero.findAll(), db.Provincia.findAll()]).then(
        ([generos, provincias]) => {
          res.render("./users/register", {
            generos,
            provincias,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
      );
    } else {
      db.Domicilio.create({
        provinciaId: req.body.provincia,
        localidad: req.body.localidad,
        barrio: req.body.barrio,
        calle: req.body.calle,
        numero: req.body.numero,
        codigoPostal: req.body.zip,
      }).then((domicilio) => {
        db.Usuario.create({
          nombreUsuario: req.body.nombreUsuario,
          apellidoUsuario: req.body.apellidoUsuario,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          generoId: req.body.genero,
          telefono: req.body.telefono,
          domicilioId: domicilio.id,
          imgUser: req.file.filename,
        })
          .then(() => {
            res.redirect("./login");
          })
          .catch((error) => {
            res.status(500).json({ error: "Error al crear el usuario" });
          });
      });
    }
  },
  profile: function (req, res) {
    const userId = req.session.userLogged.id;

    db.Usuario.findByPk(userId, {
      include: [
        { model: db.Genero, as: "genero" },
        {
          model: db.Domicilio,
          as: "domicilio",
          include: { model: db.Provincia, as: "provincia" },
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.render("./users/profile", { user });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error al buscar el usuario" });
      });
  },
  edit: function (req, res) {
    const userId = req.session.userLogged.id;

    db.Usuario.findByPk(userId, {
      include: [{ association: "domicilio" }, { association: "genero" }],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }

        Promise.all([db.Genero.findAll(), db.Provincia.findAll()])
          .then(([generos, provincias]) => {
            res.render("./users/edit", {
              user,
              generos,
              provincias,
            });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: "Error al obtener los datos necesarios" });
          });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error al obtener los datos del usuario" });
      });
  },
  update: function (req, res) {
    const resultValidation = validationResult(req);
    const userId = req.session.userLogged.id;

    if (resultValidation.errors.length > 0) {
      db.Usuario.findByPk(userId, {
        include: [{ association: "domicilio" }, { association: "genero" }],
      })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
          }

          Promise.all([db.Genero.findAll(), db.Provincia.findAll()])
            .then(([generos, provincias]) => {
              res.render("./users/edit", {
                user,
                generos,
                provincias,
                errors: resultValidation.mapped(),
              });
            })
            .catch((error) => {
              res
                .status(500)
                .json({ error: "Error al obtener los datos necesarios" });
            });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: "Error al obtener los datos del usuario" });
        });
    } else {
      const updatedData = req.body;
      db.Usuario.findByPk(userId, {
        include: [{ association: "domicilio" }],
      })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
          }
          if (updatedData.password) {
            const hashedPassword = bcrypt.hashSync(updatedData.password, 10);

            user.password = hashedPassword;
          }

          user.nombreUsuario = updatedData.nombreUsuario || user.nombreUsuario;
          user.apellidoUsuario =
            updatedData.apellidoUsuario || user.apellidoUsuario;
          user.email = updatedData.email || user.email;
          user.generoId = updatedData.genero || user.generoId;
          user.telefono = updatedData.telefono || user.telefono;
          user.imgUser = updatedData.imgUser || user.imgUser;

          if (user.domicilio) {
            user.domicilio.calle = updatedData.calle || user.domicilio.calle;
            user.domicilio.barrio = updatedData.barrio || user.domicilio.barrio;

            user.domicilio.localidad =
              updatedData.localidad || user.domicilio.localidad;
            user.domicilio.provinciaId =
              updatedData.provincia || user.domicilio.provinciaId;
            user.domicilio.numero = updatedData.numero || user.domicilio.numero;
            user.domicilio.codigoPostal =
              updatedData.zip || user.domicilio.codigoPostal;
          }

          Promise.all([
            user.save(),
            user.domicilio ? user.domicilio.save() : Promise.resolve(),
          ])
            .then(() => {
              res.clearCookie("userEmail");
              req.session.destroy((err) => {
                if (err) {
                  console.error(err);
                }
                res.redirect("/users/login");
              });
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .json({ error: "Error al actualizar el perfil del usuario" });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error al buscar el usuario" });
        });
    }
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = userControllers;
