import express from "express";
import db from "../../db/models/tableRelations.js";
import sequelize from "sequelize";
import fetch from "node-fetch";

const { DataTypes } = sequelize;
const { ShoppingCart, Product } = db;
const shoppingCartRouter = express.Router();
const { LOCAL_HOST_URL } = process.env;

shoppingCartRouter.get("/", async (req, res, next) => {
  try {
    res.send("ok");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

shoppingCartRouter.get("/:customerId", async (req, res, next) => {
  try {
    const data = await ShoppingCart.findAll({
      where: { customerId: req.params.customerId },

      attributes: [
        "productId",
        [
          sequelize.fn("count", sequelize.col("shoppingCart.id")),
          "unitary_qty",
        ],
        [sequelize.fn("sum", sequelize.col("product.price")), "group_price"],
      ],
      group: ["productId", "product.id"],
      include: { model: Product, attributes: ["name", "price", "image"] },
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// add product
shoppingCartRouter.post("/", async (req, res, next) => {
  try {
    const data = await ShoppingCart.create(req.body);
    const { productId } = data;
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    const fetchData = await response.json();
    console.log("this is fetched data " + fetchData);

    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

shoppingCartRouter.put("/:productId", async (req, res, next) => {
  try {
    const data = await ShoppingCart.update(req.body, {
      where: {
        id: req.params.productId,
      },
      returning: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

shoppingCartRouter.delete("/:productId", async (req, res, next) => {
  try {
    const rows = await ShoppingCart.destroy({
      where: { productId: req.params.productId },
    });
    rows > 0
      ? res.send(`Product ${req.params.productId} deleted`)
      : res.status(404).send("Product not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default shoppingCartRouter;
