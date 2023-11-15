const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");
const Sequelize = require("sequelize");

const validationsEdit = [
  body("nombreUsuario").notEmpty().withMessage("Agrega un nombre"),
  body("apellidoUsuario").notEmpty().withMessage("Agrega un apellido"),
  body("email")
    .notEmpty()
    .withMessage("Agrega un email")
    .isEmail()
    .withMessage("Ingresa un formato de email válido")
    .custom(async (value, { req }) => {
      const existingUser = await db.Usuario.findOne({
        where: {
          email: value,
          id: { [db.Sequelize.Op.not]: req.session.userLogged.id },
        },
      });
      if (existingUser) {
        throw new Error("Este email ya está registrado");
      }
      return true;
    }),
  body("localidad").notEmpty().withMessage("Agrega una localidad"),
  body("barrio").notEmpty().withMessage("Agrega una barrio"),
  body("calle").notEmpty().withMessage("Agrega una calle"),
  body("numero").notEmpty().withMessage("Agrega una número"),
  body("telefono").notEmpty().withMessage("Agrega una teléfono"),

  body("userImage")
    .optional()
    .custom((value, { req }) => {
      let file = req.file;

      let acceptedExtensions = [".jpg", ".png"];
      if (!file) {
        throw new Error("Agrega una imagen");
      } else {
        let fileExtension = path.extname(file.originalname);

        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(
            `Las extensiones de imagenes permitidas son: ${acceptedExtensions.join(
              ", "
            )}`
          );
        }
      }
      return true;
    }),
  body("password")
    .optional()
    .custom((value, { req }) => {
      // Aplicar reglas de validación solo si se proporciona una nueva contraseña
      if (req.body.password) {
        return Promise.all([
          body("password")
            .isLength({ min: 8 })
            .withMessage("La contraseña debe tener al menos 8 caracteres")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            )
            .withMessage(
              "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&)"
            )
            .run(req),
        ]);
      }
      return true;
    }),
];

module.exports = validationsEdit;
