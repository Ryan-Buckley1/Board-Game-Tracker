const withAuth = (req, res, next) => {
  if (req.session.email) return next();
  res.redirect("/login");
};

module.exports = withAuth;
