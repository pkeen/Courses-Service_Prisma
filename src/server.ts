import express from "express";
import indexRouter from "./api/routes/index";
import seed from "./db/prisma/seed";
import courseRouter from "./api/routes/course";

const app = express();
const port: number = 3000;

// seeding
// seed();

// Routes
app.use("/api", indexRouter);
app.use("/api/courses", courseRouter);
// app.get("/", (_req, res) => {
// 	res.send("Hello, World!");
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
