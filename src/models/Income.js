const { DataTypes } = require("sequelize");
const env = require("../config/env"); 
const sequelize = require("../config/database"); // ✅ Ensure this import is correct

 // Correct path
const User = require("./User");

const Income = sequelize.define("Income", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  user_id_fk: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  amt: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comm: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ttime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tleft: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tright: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invest_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  credit_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // Automatically adds created_at & updated_at
});

// Define Relationship
Income.belongsTo(User, { foreignKey: "user_id" });

module.exports = Income;
