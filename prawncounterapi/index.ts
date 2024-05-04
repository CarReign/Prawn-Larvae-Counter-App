import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "test run OK" });
});

app.use("/api", router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});