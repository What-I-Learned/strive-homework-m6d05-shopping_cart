import express from "express";
import db from "../../db/models/tableRelations.js";
// import sequelize from "sequelize";

const { Review } = db;
const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Review.findAll({});
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.get("/:ReviewId", async (req, res, next) => {
  try {
    const data = await Review.findByPk(req.params.ReviewId);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Review.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.put("/:ReviewId", async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      where: {
        id: req.params.ReviewId,
      },
      returning: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.delete("/:ReviewId", async (req, res, next) => {
  try {
    const rows = await Review.destroy({
      where: { id: req.params.ReviewId },
    });
    rows > 0
      ? res.send(`Review ${req.params.ReviewId} deleted`)
      : res.status(404).send("Review not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default reviewsRouter;
