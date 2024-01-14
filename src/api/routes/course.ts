import express from "express";
const router = express.Router();
import * as coursesCtrl from "../controllers/course";

// routes start with /api/courses

router.get("/", coursesCtrl.index);

export default router;
