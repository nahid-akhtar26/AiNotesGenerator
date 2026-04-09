import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/genrate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.post(
  "/api/credits/webhook",
  express.raw({type:"application/json"}),
  stripeWebhook
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use("/api/auth", router);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit",creditRouter)

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`);
  connectDb();
});
