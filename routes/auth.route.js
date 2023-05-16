const { Router } = require("express");
const {
  register,
  login,
  getAllUser,
  getUserById,
} = require("../controllers/auth.controller");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", getAllUser);
router.get("/:id", getUserById);

module.exports = router;
