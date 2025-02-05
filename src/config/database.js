const { Sequelize } = require("sequelize");
const env = require("./env"); // ✅ Environment variables import karein

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT, // ✅ MySQL, PostgreSQL, SQLite, etc.
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
