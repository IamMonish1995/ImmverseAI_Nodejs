import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggeroptions } from "./swagger-dev-api.js";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/user", userRoutes);

app.use("/status", (req, res) => {
    res.send("working");
  });
//swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggeroptions));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
