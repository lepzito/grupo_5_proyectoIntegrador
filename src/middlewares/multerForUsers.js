const multer = require("multer");
const path = require("path");
//Lo que cambia aqui es que se guarda en otra ruta las imagenes de usuario
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/users"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadUser = multer({ storage: storage });

module.exports = uploadUser;
