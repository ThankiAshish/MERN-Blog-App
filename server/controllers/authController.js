const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;

      if (!username || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ message: "Not all fields have been entered." });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "The password needs to be at least 8 characters long.",
        });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Enter the same password twice for verification." });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "An account with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });

      const savedUser = await newUser.save();

      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Not all fields have been entered." });

      const user = await User.findOne({ email: email });

      if (!user)
        return res
          .status(400)
          .json({ message: "No account with this email has been registered." });

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials." });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
      });

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  logout: async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }).send();
  },
};

module.exports = authController;
