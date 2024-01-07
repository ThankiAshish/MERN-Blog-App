const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

router.get("/", articleController.getArticles);
router.post("/", articleController.createArticle);
router.get("/:id", articleController.getArticle);

module.exports = router;
