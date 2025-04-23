const userRoutes = require("express").Router();

const { signUp, login } = require("../controllers/UserController");

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);

module.exports = userRoutes;
