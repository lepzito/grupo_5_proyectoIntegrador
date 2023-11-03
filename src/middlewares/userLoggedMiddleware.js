const db = require("../database/models");
const Sequelize = require("sequelize");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  const emailInCookie = req.cookies.userEmail;

  if (emailInCookie) {
    // Si hay userEmail en las cookies, verifica si existe en la base de datos.
    db.Usuario.findOne({ where: { email: emailInCookie } })
      .then((userFromCookie) => {
        if (userFromCookie) {
          req.session.userLogged = userFromCookie;
        }
        checkSessionUserLogged(req, res, next);
      })
      .catch((error) => {
        console.error(error);
        checkSessionUserLogged(req, res, next);
      });
  } else {
    // Si no hay userEmail en las cookies, verifica la sesión directamente.
    checkSessionUserLogged(req, res, next);
  }
}

function checkSessionUserLogged(req, res, next) {
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
}

module.exports = userLoggedMiddleware;
