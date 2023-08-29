const userController = require("../controllers/userController");

const router = require("express").Router(),
  coursesController = require("../controllers/courseController");
const token = process.env.TOKEN || "recipeT0k3n";

router.post("/login", userController.apiAuthenticate);

router.use(userController.verifyJWT);

router.get("/courses", coursesController.index, coursesController.respondJSON);

router.use(coursesController.errorJSON);

router.use(userController.verifyToken);

module.exports = router;
