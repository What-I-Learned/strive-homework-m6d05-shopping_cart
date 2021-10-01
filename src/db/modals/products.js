import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define(
  "Product",
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://worldmartialartsri.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true }
);
export default Product;
