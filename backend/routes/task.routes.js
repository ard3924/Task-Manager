const router = require("express").Router();
const controller = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.post("/", controller.createTask);
router.get("/", controller.getMyTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
