const adminAuth = (req, res, next) => {
  if (req.session.isAdmin) return next();
  alert("Not authorized");
};

module.exports = adminAuth;
