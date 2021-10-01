import express from "express";
import db from "../../db/models/tableRelations.js";
import sequelize from "sequelize";

const { Customer } = db;
const cutomerRouter = express.Router();
