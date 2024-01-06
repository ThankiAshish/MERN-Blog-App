const express = require("express");
const router = express.Router();

const {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.get("/", getArticles);
router.post("/", createArticle);
router.get("/:id", getArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
