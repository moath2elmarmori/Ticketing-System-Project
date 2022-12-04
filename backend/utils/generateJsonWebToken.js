const jwt = require("jsonwebtoken");

const generateJsonWebToken = (id, companyId, userRole) => {
  return jwt.sign({ id, companyId, userRole }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateJsonWebToken,
};
