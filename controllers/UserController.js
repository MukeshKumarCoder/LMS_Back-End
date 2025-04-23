const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper functions to create tokens
const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// signup

exports.signUp = async (req, res) => {
  try {
    // get Data from Req body
    const { userName, email, password, accountType } = req.body;

    // validate the data
    if (!userName || email || password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered Please Login",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create the user
    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      accountType: accountType,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // get data from req body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    //user check exist or not
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered please signup first",
      });
    }

    // check Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // create token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};
