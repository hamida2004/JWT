const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verify = require("./midlewares/verifyJWT");
const app = express();
const User = require("./db_schema/User");
const Role = require("./db_schema/Role");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.use('/refresh', require('./routers/refreshRouter'))
app.use("/auth", require("./routers/authRouter"));
app.get('/logout' , require('./controllers/authController').logout)
app.get("/", async (req, res) => {
  const roles = await Role.find();
  console.log(roles)
  const users = await User.find()
  console.log(users)
  res.status(200).json({users})
});

//protected route
app.get("/protected", verify, async (req, res) => {
  const user = req.user;
  const userFound = await User.findOne({ email: user?.user });
  res.send(userFound.roles);
});

// database connection
const connectToDb = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("connected");
      app.listen(PORT, () => {
        console.log(`listening on port ${PORT} ...`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
connectToDb();
