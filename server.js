require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const Article = require("./model/Article");
const articlesRouter = require("./routes/articles");
const methodOR = require("method-override");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(methodOR("_method"));

app.set("view engine", "ejs");

app.use("/articles", articlesRouter);
app.get("/", async (req, res) => {
  const articles = await Article.find().sort("-createdAt");
  res.render("articles/index", { articles: articles });
});
connectDB();

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
