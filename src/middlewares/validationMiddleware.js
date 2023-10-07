const path = require("path");
const { body } = require("express-validator");

const validations = [
  body("nombreUsuario").notEmpty().withMessage("Agrega un nombre"),
  body("apellidoUsuario").notEmpty().withMessage("Agrega un apellido"),
  body("email")
    .notEmpty()
    .withMessage("Agrega un email")
    .bail()
    .isEmail()
    .withMessage("Ingresa un formato de email valido"),
  body("password").notEmpty().withMessage("Agrega una contraseña"),
  body("provincia").notEmpty().withMessage("Selecciona una provincia"),
  body("genero").notEmpty().withMessage("Agrega un genero"),
  body("localidad").notEmpty().withMessage("Agrega una localidad"),

  body("userImage").custom((value, { req }) => {
    let file = req.file;

    let acceptedExtensions = [".jpg", ".png", ".gift"];
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
