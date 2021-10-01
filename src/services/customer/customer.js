import express from "express";
import db from "../../db/models/tableRelations.js";
// import sequelize from "sequelize";

const { Customer } = db;
const cutomerRouter = express.Router();

cutomerRouter.get("/", async (req, res, next) => {
  try {
    const data = await Customer.findAll({});
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cutomerRouter.get("/:customerId", async (req, res, next) => {
  try {
    const data = await Customer.findByPk(req.params.customerId);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cutomerRouter.post("/", async (req, res, next) => {
  try {
    const data = await Customer.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cutomerRouter.put("/:customerId", async (req, res, next) => {
  try {
    const data = await Customer.update(req.body, {
      where: {
        id: req.params.customerId,
      },
      returning: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cutomerRouter.delete("/:customerId", async (req, res, next) => {
  try {
    const rows = await Customer.destroy({
      where: { id: req.params.customerId },
    });
    rows > 0
      ? res.send(`customer ${req.params.customerId} deleted`)
      : res.status(404).send("Customer not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default cutomerRouter;
