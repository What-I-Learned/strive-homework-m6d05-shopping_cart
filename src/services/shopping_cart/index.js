import express from "express";
import db from "../../db/models/tableRelations.js";
import sequelize from "sequelize";
import fetch from "node-fetch";

const { Op } = sequelize;
const { ShoppingCart, Product } = db;
const shoppingCartRouter = express.Router();

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

    res.send({ total_price, data });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// add product
shoppingCartRouter.post("/", async (req, res, next) => {
  try {
    const data = await ShoppingCart.create(req.body);
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
