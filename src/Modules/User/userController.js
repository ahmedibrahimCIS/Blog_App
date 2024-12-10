import  Router  from "express";
import * as userService from "./userService.js"
const router = Router();



router.get("/profile/:userId",userService.profile)

router.patch("/update/:userId",userService.updateUser)

router.delete("/delete/:userId",userService.deleteUser)
router.get('/search',userService.searchUser )

export default router;