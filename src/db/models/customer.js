import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const Customer = sequelize.define(
  "customer",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
export default Customer;
