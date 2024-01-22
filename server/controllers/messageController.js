const { Op } = require("sequelize");
const Message = require("../models/Message");
const User = require("../models/User");

const addMessage = async (req, res, next) => {
  try {
    const message = await Message.create({
      message: req.body.message,
      sender: req.user.email,
      reciever: req.body.reciever,
    });
    res.json({
      status: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};
const getMessages = async (req, res, next) => {
    try {
      console.log(req.params);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: req.user.email, reciever: req.body.reciever },
          { sender: req.body.reciever, reciever: req.user.email },
        ],
      },
    });
      const projectMessages = messages.map((message) => {
        return {
            fromSelf: message.sender === req.user.email,
            message: message.message
        }
      })
    res.json({
        status: true,
        message: "Messages fetched successfully",
        data: projectMessages
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
    addMessage,
    getMessages
};
