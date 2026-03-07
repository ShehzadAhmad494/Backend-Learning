import router from "routers"
import { userRegister } from "../controllers/user.controller.js"

const router = router()

router.use("/register").post(userRegister)
export default router