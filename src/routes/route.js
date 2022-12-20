let express = require("express");
let router = express.Router();
let { createUser, userLogin } = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", userLogin);

module.exports = router;
