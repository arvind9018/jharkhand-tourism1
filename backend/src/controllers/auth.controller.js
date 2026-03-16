import User from "../models/User.model.js";
import jwt from "jsonwebtoken";



const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

};



/* =========================
        SIGNUP
========================= */

export const signup = async (req, res) => {

  try {

    console.log("Signup request received:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success:false,
        message:"Please provide name, email and password"
      });
    }


    const userExists = await User.findOne({
      email: email.toLowerCase()
    });

    if (userExists) {
      return res.status(400).json({
        success:false,
        message:"User already exists"
      });
    }


    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });


    const token = generateToken(user._id);


    res.status(201).json({
      success:true,
      message:"Account created successfully",
      data:{
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role
        },
        token
      }
    });


  } catch (error) {

    console.error("Signup error:", error);

    res.status(500).json({
      success:false,
      message:"Server error during signup"
    });

  }

};



/* =========================
        LOGIN
========================= */

export const login = async (req, res) => {

  try {

    console.log("Login request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message:"Please provide email and password"
      });
    }


    const user = await User.findOne({
      email: email.toLowerCase()
    }).select("+password");


    if (!user) {
      return res.status(401).json({
        success:false,
        message:"Invalid email or password"
      });
    }


    const isMatch = await user.comparePassword(password);


    if (!isMatch) {
      return res.status(401).json({
        success:false,
        message:"Invalid email or password"
      });
    }


    const token = generateToken(user._id);


    res.json({
      success:true,
      message:"Login successful",
      data:{
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role
        },
        token
      }
    });


  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      success:false,
      message:"Server error during login"
    });

  }

};



/* =========================
        GET CURRENT USER
========================= */

export const getMe = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success:true,
      data:user
    });

  } catch (error) {

    console.error("Get user error:", error);

    res.status(500).json({
      success:false,
      message:"Error fetching user"
    });

  }

};