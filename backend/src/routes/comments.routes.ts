import { Router } from "express";
import { CommentsController } from "../controller/comments.controller";
import { CommentsService } from "../services/comments.service";
import { validate } from "../middleware/validate";
import { createCommentSchema } from "../schema/comments.schema";

const router = Router();
const controller = new CommentsController(new CommentsService());

router.get("/", controller.list);
router.post("/", validate(createCommentSchema), controller.create);

export default router;
