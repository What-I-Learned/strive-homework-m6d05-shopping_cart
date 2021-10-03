import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const ShoppingCart = sequelize.define(
  "shoppingCart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

export default ShoppingCart;
