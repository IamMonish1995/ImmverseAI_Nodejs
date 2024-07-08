import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import { emailTemplates } from "../constant/EmailTemplates.js";
import UserModel from "../models/Users.js";

class UserController {
  //  ADD NEW USER
  static userRegistration = async (req, res) => {
    console.log("user registration called");
    const { name, email, password, password_confirmation } =
      req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              isEmailVerified: false,
              });
            await doc.save();
            const saved_user = await UserModel.findOne({ email: email });
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            // await transporter
            //   .sendMail({
            //     from: process.env.EMAIL_FROM,
            //     to: email,
            //     subject: emailTemplates.verification.subject,
            //     html: emailTemplates.verification.body({
            //       name,
            //       link: `${req.protocol}://${req.host}/confirmemail?id=${saved_user._id}&token=${token}`,
            //     }),
            //   })
            //   .then((emailStatus) => {
            //     console.log("Email Sent Successfully");
            //   });
            res.status(201).send({
              status: "success",
              message: "Registration Success",
              token: token,
            });
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to Register" });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and Confirm Password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // USER CONFIRM EMAIL
  static userConfirmEmail = async (req, res) => {
    console.log("user Confirm Email called");
    const { id, token } = req.query;
    const user = await UserModel.findById(id);
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      await UserModel.findByIdAndUpdate(user._id, {
        $set: { isEmailVerified: true },
      });
      await transporter
        .sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: emailTemplates.verified.subject,
          html: emailTemplates.verified.body({
            email: user.email,
            name: user.name,
            link: `${req.protocol}://${req.host}`,
          }),
        })
        .then((emailStatus) => {
          console.log("Email Sent Successfully");
        });
      res.send({
        status: "success",
        message: "Email Verified Successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid Link" });
    }
  };

  //  LOGIN USER
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  // lOGGED USER DETAILS
  static loggedUser = async (req, res) => {
    console.log("loged user called");
    res.send({ user: req.user });
  };

  // CHANGE USER PASSWORD
  static changeUserPassword = async (req, res) => {
    console.log("change user password called");
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password Updated succesfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  };

  // SEND PASSWORD RESET EMAIL
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "15m",
          }
        );
        const link = `${req.protocol}://${req.host}/forgetpassword?token=${token}`;
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: emailTemplates.forgetpassward.subject,
          html: emailTemplates.forgetpassward.body({
            email: user.email,
            name: user.name,
            link: link,
          }),
        });
        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };
}

export default UserController;
