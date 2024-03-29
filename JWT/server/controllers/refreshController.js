const User = require("../db_schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);

    try {
        const foundUser = await User.findOne({ token: cookies.token });
        if (!foundUser) return res.sendStatus(403);

        jwt.verify(cookies.token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
            if (err || decoded.user !== foundUser.email) {
                console.log(err);
                return res.status(403).json({ error: err.message });
            }

            const accessToken = jwt.sign(
                { user: foundUser.email },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: "30d",
                }
            );

            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error occurred during refresh:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { refresh };
