function checkAdminMiddleware(req, res, next) {
  if (
    req.session.userLogged &&
    req.session.userLogged.email === "admin@tecnojuy.com"
  ) {
    next();
  } else {
    res
      .status(403)
      .send("Acceso denegado. Esta acción es solo para administradores.");
  }
}

module.exports = checkAdminMiddleware;
