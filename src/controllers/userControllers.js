const db = require("../database/models"); // Asegúrate de importar tus modelos de Sequelize
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userControllers = {
  login: function (req, res) {
    res.render("./users/login");
  },
  loginProcess: function (req, res) {
    // Busca al usuario por su dirección de correo electrónico
    db.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userToLogin) => {
        if (userToLogin) {
          // Comprueba si la contraseña proporcionada es correcta utilizando bcrypt
          const passwordCorrect = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );

          if (passwordCorrect) {
            // Elimina la contraseña antes de almacenar el usuario en la sesión
            delete userToLogin.password;

            // Guarda el usuario en la sesión
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
            email: {
              msg: "Las credenciales son incorrectas",
            },
          },
        });
      })
      .catch((error) => {
        // Maneja cualquier error que pueda ocurrir al buscar el usuario
        console.error("Error al procesar el inicio de sesión:", error);
        return res
          .status(500)
          .json({ error: "Error al procesar el inicio de sesión" });
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
      return res.render("./users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    db.Usuario.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.render("./users/register", {
            errors: {
              email: {
                msg: "Este email ya está registrado",
              },
            },
            oldData: req.body,
          });
        }

        db.Domicilio.create({
          provinciaId: req.body.provincia,
          localidad: req.body.localidad,
          barrio: req.body.barrio,
          calle: req.body.calle,
          numero: req.body.numero,
          codigoPostal: req.body.zip,
        })
          .then((domicilio) => {
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
              .then((newUser) => {
                res.redirect("./login");
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error al crear el usuario" });
              });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error al crear el domicilio" });
          });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "Error al buscar el usuario por correo" });
      });
  },
  profile: function (req, res) {
    res.render("./users/profile", { user: req.session.userLogged });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = userControllers;
