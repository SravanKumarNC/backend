import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(
  // cors({
  //   origin: [
  //     "http://localhost:3000",
  //     "http://localhost:3001",
  //     "https://control-one-d.onrender.com",
  //     "http://controlone-dashboard.com.s3-website-us-west-2.amazonaws.com",
  //     "http://controlone-dashboard.com.s3-website-us-west-2.amazonaws.com",
  //     "https://controlone-adea.onrender.com/"
  //   ],
  //   credentials: true,
  // })
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
