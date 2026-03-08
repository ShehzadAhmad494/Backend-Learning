import router from "routers"
import { upload } from "../utils/multer.js"

import { userRegister } from "../controllers/user.controller.js"

const router = router()

router.use("/register").post(
    upload.filed([
        {
        name:"avatar",
        maxCount:1         
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    userRegister)
export default router