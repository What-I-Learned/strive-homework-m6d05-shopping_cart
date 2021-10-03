import express from "express";
import db from "../../db/models/tableRelations.js";
import sequelize from "sequelize";
const { Op } = sequelize;
const { Product, Review, Category, ProductCategory } = db;
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      // where: req.query.search
      //   ? {
      //       [Op.or]: [
      //         { categories.categoryName: { [Op.iLike]: `%${req.query.search}%` } },
      //       ],
      //     }
      //   : {},
      attributes: [
        "id",
        "name",
        "image",
        "price",
        [
          sequelize.fn("AVG", sequelize.col("reviews.rating")),
          "average_rating",
        ],
      ],
      group: ["product.id", "reviews.id", "categories.id"],
      include: [
        { model: Review, attributes: ["text", "username", "rating"] },
        {
          model: Category,
          attributes: ["categoryName"],
          // This block of code allows you to retrieve the properties of the join table
          through: { attributes: [] }, // will not include anything
          where: req.query.search
            ? {
                [Op.or]: {
                  categoryName: { [Op.iLike]: `%${req.query.search}%` },
                },
              }
            : {},
        },
      ],
      order: [["id", "ASC"]],
      offset: req.query.page ? (req.query.page - 1) * 5 : 0,
      limit: 5,
    });
    const pages = await Product.count();
    const response = [data, { pages: pages }];
    res.send(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productRouter.get("/:ProductId", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.ProductId, {
      attributes: [
        "id",
        "name",
        "image",
        "price",
        [
          sequelize.fn("AVG", sequelize.col("reviews.rating")),
          "average_rating",
        ],
      ],
      group: ["product.id", "reviews.id", "categories.id"],
      include: [
        {
          model: Review,
          attributes: ["text", "username", "rating"],
        },
        {
          model: Category,
          attributes: ["categoryName"],

          through: { attributes: [] },
        },
      ],
    });

    console.log(data.dataValues.average_rating);
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

productRouter.post("/addCategory", async (req, res, next) => {
  try {
    const data = await ProductCategory.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default productRouter;
