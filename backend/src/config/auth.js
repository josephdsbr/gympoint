require('dotenv/config');

module.exports = {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
  adminEmail: process.env.ADMIN_EMAIL,
  adminAccessLevel: parseInt(process.env.ADMIN_ACCESS_LEVEL, 10),
};
