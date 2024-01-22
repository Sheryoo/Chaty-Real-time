const router = require("express").Router();
const {
  register,
  login,
  setavatar,
  getAllUsers,
} = require("../controllers/userControllers");
const authUserMiddleware = require("../controllers/userAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar", authUserMiddleware, setavatar);
router.get("/allusers", authUserMiddleware, getAllUsers);

module.exports = router;
