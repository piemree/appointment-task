module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
  },
  noAuthRoutes: [
    "/api/auth/user/login",
    "/api/auth/user/register",
    "/api/auth/clinic/login",
    "/api/auth/clinic/register",
  ],
};
