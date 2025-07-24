import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const login = async (req, res) => {
  try {
    const { name, email, phoneNumber, avatar } = req.body;
    let user;
    user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        name,
        email,
        phoneNumber,
        avatar,
      });
      await newUser.save();
      user = newUser;
    }

    user = user.toObject({ getters: true });
    const token = await jwt.sign(user, process.env.JWT_SECRET_KEY);
    res.cookies("access-token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.cookies.access - token;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "unauthorised",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
