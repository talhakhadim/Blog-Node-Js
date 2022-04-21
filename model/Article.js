const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a title"],
  },
  description: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      replacement: "_",
      strict: true,
      lower: true,
      trim: true,
    });
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);
