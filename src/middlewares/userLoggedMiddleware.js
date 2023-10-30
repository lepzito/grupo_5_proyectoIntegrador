const Sequelize = require("sequelize");
const db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;

  db.Usuario.findOne({ where: { email: emailInCookie } })
    .then((userFromCookie) => {
      if (userFromCookie) {
        req.session.userLogged = userFromCookie;
      }

      if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
      }
      next();
    })
    .catch((error) => {
      // Maneja errores
      console.error(error);
      next(); // Continúa sin establecer la sesión si hay un error
    });
}

module.exports = userLoggedMiddleware;
