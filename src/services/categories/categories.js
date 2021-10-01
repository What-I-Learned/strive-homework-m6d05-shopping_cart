import express from "express";
import db from "../../db/models/tableRelations.js";
// import sequelize from "sequelize";

const { Category } = db;
const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const data = await Category.findAll({});
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoriesRouter.get("/:CategoryId", async (req, res, next) => {
  try {
    const data = await Category.findByPk(req.params.CategoryId);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoriesRouter.put("/:CategoryId", async (req, res, next) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.CategoryId,
      },
      returning: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoriesRouter.delete("/:CategoryId", async (req, res, next) => {
  try {
    const rows = await Category.destroy({
      where: { id: req.params.CategoryId },
    });
    rows > 0
      ? res.send(`Category ${req.params.CategoryId} deleted`)
      : res.status(404).send("Category not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default categoriesRouter;
