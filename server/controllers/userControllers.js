const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { Op } = require("sequelize");

const register = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.json({
        status: false,
        message: "This email already exists",
        data: null,
      });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const id = new Date().getDate();

    let email = req.body.email;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const response = {
      email: user.email,
      username: user.username,
      token: token,
    };
    res.json({
      status: true,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.json({
        status: false,
        message: "User not found",
        data: null,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.json({
        status: false,
        message: "Invalid password",
        data: null,
      });
    }
    const id = new Date().getDate();
    const email = user.email;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const response = {
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      token: token,
    };
    return res.json({
      status: true,
      message: "Logged in successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const setavatar = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    user.avatar = req.body.image;
    await user
      .save()
      .then(() => {
        return res.json({
          status: true,
          message: "Avatar set successfully",
          data: user,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { email: { [Op.ne]: req.user.email } },
      attributes: ["id", "username", "email", "avatar"],
    });
    const user = await User.findOne({
      where: { email: req.user.email },
      attributes: ["id", "username", "email", "avatar"],
    });
    res.json({
      status: true,
      message: "Users fetched successfully",
      data: { contancts: users, currentUser: user },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, setavatar, getAllUsers };
