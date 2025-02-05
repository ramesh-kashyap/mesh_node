const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Sequelize connection
const Income = require("./Income");
const FundTransfer = require("./FundTransfer");
const Withdraw = require("./Withdraw");

class User extends Model {
  async availableBalance() {
    try {
      // Fetch user incomes sum
      const incomeSum = await Income.sum("comm", { where: { user_id: this.id } });

      // Fetch total withdrawn amount
      const withdrawnAmount = await Withdraw.sum("amount", {
        where: { user_id: this.id, status: { [sequelize.Op.ne]: "Failed" } },
      });

      // Fetch total transferred funds
      const transferredAmount = await FundTransfer.sum("amount", {
        where: { transfer_id: this.id },
      });

      // Calculate available balance
      return incomeSum - (withdrawnAmount + transferredAmount);
    } catch (error) {
      console.error("Error calculating balance:", error);
      return 0;
    }
  }
}

User.init(
  {
    username: {
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
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

// Define relationships
User.hasMany(Income, { foreignKey: "user_id" });
User.hasMany(FundTransfer, { foreignKey: "transfer_id" });
User.hasMany(Withdraw, { foreignKey: "user_id" });

module.exports = User;
