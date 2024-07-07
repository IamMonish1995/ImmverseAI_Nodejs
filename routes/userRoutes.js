import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", UserController.userRegistration);
router.get("/confirmemail", UserController.userConfirmEmail);
router.post("/login", UserController.userLogin);
router.post("/sendresetpasswordemail",UserController.sendUserPasswordResetEmail);

// Route Level Middleware - To Protect Route
router.post("/changepassword",checkUserAuth, UserController.changeUserPassword);
router.get("/loggeduser", checkUserAuth, UserController.loggedUser);

export default router;
