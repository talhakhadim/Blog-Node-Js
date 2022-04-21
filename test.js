const slugify = require("slugify");

const title = "i Aam a title";

const slug = slugify(title, { lower: true, replacement: "_" });
console.log(slug);
