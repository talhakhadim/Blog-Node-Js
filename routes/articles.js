const express = require("express");
const {
  getArticles,
  createArticle,
  newArticle,

  deleteArticle,
  deleteAllArticles,
  updateArticle,
  editArticle,
  singleArticle,
} = require("../controller/articles");
const router = express.Router();

router.get("/", getArticles);
router.route("/new").post(createArticle).get(newArticle);
router.get("/new/:slug", singleArticle);
router.delete("/:id", deleteArticle);
router.delete("/", deleteAllArticles);
router.get("/edit/:slug", editArticle);
router.put("/edit/:id", updateArticle);

module.exports = router;
