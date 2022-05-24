import express from "express";
import { requireAdminLogin } from "../middlewares/requireAdminLogin";
import { requireLogin } from "../middlewares/requireLogin";
import { submitTodo, todoAdd} from "../controllers/Todo";
const router = express.Router();

router.post("/addTodo",requireAdminLogin,todoAdd);
router.post("/submitTodo",requireLogin,submitTodo);

export default router;