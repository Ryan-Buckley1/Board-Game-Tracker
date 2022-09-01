//CHECKS TO SEE IF USER IS LOGGED IN, IF THEY AREN'T THEY ARE SENT TO THE LOGIN PAGE

const withAuth = (req, res, next) => {
  if (req.session.loggedIn) return next();
  res.redirect("/login");
};

module.exports = withAuth;
