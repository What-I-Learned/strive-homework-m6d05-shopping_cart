import express from "express";
import cors from "cors";
import { connectDB } from "./db/db-init.js";
import customerRouter from "./services/customer/customer.js";
import productRouter from "./services/product/product.js";
import categoriesRouter from "./services/categories/categories.js";
import reviewsRouter from "./services/reviews/reviews.js";
import shoppingCartRouter from "./services/shopping_cart/index.js";

const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());

server.use(express.json());

server.use("/customers", customerRouter);
server.use("/products", productRouter);
server.use("/categories", categoriesRouter);
server.use("/reviews", reviewsRouter);
server.use("/cart", shoppingCartRouter);

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
