const User = require("../db_schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: "this email is already registered",
    });
  }
  await User.create({ name, email, password })
    .then((user) => {
      return res.json({user});
    })
    .catch((err) => {
      return res.json({ error: err.message });
    });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      error: "invalide credantials ",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    //generate access token 
    const accessToken = jwt.sign(
      { user: user.email },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "10m",
      }
    );
    // generate refresh token
    const refreshToken = jwt.sign(
      { user: user.email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    // store refresh token in the database 
    await User.updateOne(
      { email: user.email },
      { $set: { token: refreshToken } }
    );
    // send refresh token as a cookie to the client 
    // it won't appear in the cookies in the clien t side 'cause it's httpOnly 
    res.cookie("token", refreshToken, {
      maxAge:  30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      path: '/', // Set cookie to be valid for all paths
      domain: 'localhost' 
    });
   
    // send acess token to the client side
    res.json({ accessToken });
  } else {
    res.status(400).json({
      error: " invalid credantials ",
    });
  }
  //generate the token
};

const logout = async (req , res) => {

  // in the client side clear autorisation header
  const cookies = req.cookies
  if(!cookies?.token) return res.status(204).json({msg: 'log out successfully '})
  const foundUser = await User.findOne({token : cookies.token})
  if (!foundUser) {
    res.clearCookie("token", {
      maxAge:  30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      
    })
    res.status(204).json({msg: 'log out successfully '})
  }
  await User.updateOne(
    { token : cookies.token },
    { $set: { token: "" } }
  );
  res.clearCookie("token", {
    maxAge:  30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
   
  })
  res.status(200).json({msg: 'log out successfully '})
}

module.exports = { createUser, loginUser , logout };
