import express from "express";
import db from "../../db/models/tableRelations.js";
// import sequelize from "sequelize";

const { Product } = db;
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({ include: Review });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productRouter.get("/:ProductId", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.ProductId);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productRouter.put("/:ProductId", async (req, res, next) => {
  try {
    const data = await Product.update(req.body, {
      where: {
        id: req.params.ProductId,
      },
      returning: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productRouter.delete("/:ProductId", async (req, res, next) => {
  try {
    const rows = await Product.destroy({
      where: { id: req.params.ProductId },
    });
    rows > 0
      ? res.send(`Product ${req.params.ProductId} deleted`)
      : res.status(404).send("Product not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default productRouter;
