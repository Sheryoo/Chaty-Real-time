const router = require("express").Router();
const { addMessage, getMessages } = require("../controllers/messageController");
const authUserMiddleware = require("../controllers/userAuth");

router.post("/addmsg", authUserMiddleware, addMessage);
router.post("/getmsg", authUserMiddleware, getMessages);

module.exports = router;
