const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const socket = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Connect to the database
const sequelize = require("./models/database");
sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/api", messageRoutes);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.reciever);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  })
})