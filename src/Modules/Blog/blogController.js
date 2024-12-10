import Router from "express";
import * as blogService from "./blogService.js"
const router = Router();


router.post("/create",blogService.createBlog)

router.patch("/update/:blogId",blogService.updateBlog)

router.delete("/delete/:blogId",blogService.deleteBlog);

router.get("/all",blogService.getAllBlogs)


router.get("/:blogId",blogService.getBlog)

export default router;