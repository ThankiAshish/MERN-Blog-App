const multer = require("multer");
const path = require("path");

const Article = require("../models/Article");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/articles");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

const articleController = {
  getArticles: async (req, res) => {
    try {
      const articles = await Article.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 });
      res.json(articles);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id).populate("author", [
        "username",
      ]);
      res.status(200).json(article);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createArticle: [
    upload.single("cover"),
    async (req, res) => {
      try {
        const { title, summary, content, author } = req.body;

        if (!req.file) {
          res.status(400).send("Please upload a PDF file");
          return;
        }

        const fileName = req.file.originalname;
        const filePath = req.file.path;

        if (
          !title ||
          !summary ||
          !content ||
          !author ||
          !fileName ||
          !filePath
        ) {
          return res
            .status(400)
            .json({ message: "Not all fields have been entered." });
        }

        const newArticle = new Article({
          title,
          summary,
          content,
          cover: filePath,
          author,
        });

        await newArticle.save();
        res.status(200).json({ message: "Created a article" });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    },
  ],
};

module.exports = articleController;
