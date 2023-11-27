const path = require("path");
const { body } = require("express-validator");
const db = require("../../database/models");
const Sequelize = require("sequelize");

const validations = [
  body("nombre")
    .notEmpty()
    .withMessage("Agrega un nombre")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),
  body("precio")
    .notEmpty()
    .withMessage("Agrega un precio")
    .isNumeric()
    .withMessage("El precio debe ser un número"),

  body("descuento")
    .optional()
    .custom((value, { req }) => {
      if (
        req.body.descuento !== undefined &&
        req.body.descuento !== null &&
        req.body.descuento !== ""
      ) {
        return Promise.all(
          [
            body("descuento")
              .isNumeric()
              .withMessage("El descuento debe ser un número"),
          ].map((validation) => validation.run(req))
        );
      }
      return true;
    }),
  body("descripcion")
    .notEmpty()
    .withMessage("Agrega una descripcion")
    .isLength({ min: 20 })
    .withMessage("La descripcion debe tener al menos 20 caracteres"),

  body("productImage").custom((value, { req }) => {
    let file = req.file;

    if (!file) {
      return true;
    }

    let acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"];
    let fileExtension = path.extname(file.originalname);

    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(
        `Las extensiones de imágenes permitidas son: ${acceptedExtensions.join(
          ", "
        )}`
      );
    }

    return true;
  }),
];
module.exports = validations;
