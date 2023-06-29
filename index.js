require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const foodCategoryRouter = require("./routes/foodCategoryRoutes");
const dishCategoryRouter = require("./routes/dishCategoryRoutes");
const foodRouter = require("./routes/foodRoutes");
const favoriteFoodRouter = require("./routes/favoriteFoodRoutes");
const dishRouter = require("./routes/dishRoutes");
const consumedWaterRouter = require("./routes/consumedWaterRoutes");
const mailerRoutes = require("./routes/mailerRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

// app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v3/users", userRouter);
app.use("/api/v3/foodCategories", foodCategoryRouter);
app.use("/api/v3/dishCategories", dishCategoryRouter);
app.use("/api/v3/foods", foodRouter);
app.use("/api/v3/favoriteFoods", favoriteFoodRouter);
app.use("/api/v3/dishes", dishRouter);
app.use("/api/v3/consumedWater", consumedWaterRouter);
app.use("/api/v3/mailer", mailerRoutes);
app.use("/api/v3/contacts", commentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server running...");
});
