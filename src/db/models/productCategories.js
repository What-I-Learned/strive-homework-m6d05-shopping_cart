import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductCategory = sequelize.define(
  "productCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);
// ProductCategory.sync({ force: true });

export default ProductCategory;
