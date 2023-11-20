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
  body("tipo").notEmpty().withMessage("Selecciona una categoría"),
  body("seccion").notEmpty().withMessage("Selecciona una seccion"),
  body("marca").notEmpty().withMessage("Selecciona una marca"),

  body("descuento")
    .optional()
    .custom((value, { req }) => {
      // Aplicar reglas de validación solo si se proporciona un nuevo descuento
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
            // Agrega otras reglas de validación según sea necesario
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

  body("productImage")
    .optional()
    .custom((value, { req }) => {
      let file = req.file;

      let acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"];
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
