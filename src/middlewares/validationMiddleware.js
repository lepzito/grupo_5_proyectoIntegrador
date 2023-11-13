const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");
const Sequelize = require("sequelize");

const validations = [
  body("nombreUsuario").notEmpty().withMessage("Agrega un nombre"),
  body("apellidoUsuario").notEmpty().withMessage("Agrega un apellido"),
  body("email")
    .notEmpty()
    .withMessage("Agrega un email")
    .bail()
    .isEmail()
    .withMessage("Ingresa un formato de email valido")
    .bail()
    .custom(async (value) => {
      const existingUser = await db.Usuario.findOne({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Este email ya está registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&)"
    ),
  body("localidad").notEmpty().withMessage("Agrega una localidad"),
  body("barrio").notEmpty().withMessage("Agrega una barrio"),
  body("calle").notEmpty().withMessage("Agrega una calle"),
  body("numero").notEmpty().withMessage("Agrega una numero"),
  body("telefono").notEmpty().withMessage("Agrega una telefono"),

  body("userImage").custom((value, { req }) => {
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
];
module.exports = validations;
