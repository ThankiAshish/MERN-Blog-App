const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    summary: {
      type: String,
      require: true,
      trim: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    cover: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
