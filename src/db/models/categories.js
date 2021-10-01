import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
