const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Import the Sequelize instance
const env = require("../config/env");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sponsor: {
    type: DataTypes.INTEGER, // Foreign Key Reference
    allowNull: true,
  },
  ParentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  jdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tpassword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  PSR: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  TPSR: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_iso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dialCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt & updatedAt
  tableName: "users",
});

// Relationship (Foreign Key)
User.belongsTo(User, { as: "sponsor_detail", foreignKey: "sponsor" });

module.exports = User;
