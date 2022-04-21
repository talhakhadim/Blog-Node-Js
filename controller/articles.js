const Article = require("../model/Article");
// get all articles
//route: /

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort("-createdAt");

    res.render("/index", { articles: articles });
  } catch (err) {
    console.log(err);
  }
};
//

exports.newArticle = (req, res) => {
  res.render("articles/new", {
    article: new Article(),
  });
};

//create new article
//route: /articles/new

exports.createArticle = async (req, res) => {
  const { title, description } = req.body;
  let article = new Article({ title, description });
  // const article = await Article.create({ title, description, markdown });
  try {
    article = await article.save();
    res.redirect(`/articles/new/${article.slug}`);
  } catch (err) {
    res.render("articles/new", { article: article });
    console.log(err);
  }
};
//show article by slug
exports.singleArticle = async (req, res) => {
  const slug = req.params.slug;
  try {
    const article = await Article.findOne({ slug });

    res.render("articles/article", { article: article });
  } catch (err) {
    res.redirect("/");
    console.log(err);
  }
};
//delete a article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
exports.deleteAllArticles = async (req, res) => {
  try {
    const article = await Article.deleteMany();

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
//show articel to be edited
exports.editArticle = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  res.render("articles/edit", { article: article });
};
//edit an article

exports.updateArticle = async (req, res) => {
  const { title, description } = req.body;

  try {
    let article = await Article.findById(req.params.id);

    article.title = title;
    article.description = description;

    await article.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
