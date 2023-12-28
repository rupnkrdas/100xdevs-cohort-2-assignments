const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {
	handleUserSignup,
	handleGetAllCourses,
	handlePurchaseCourse,
	handleGetPurchasedCourses,
} = require("../controllers/user");

// User Routes
router.post("/signup", handleUserSignup);

router.get("/courses", handleGetAllCourses);

router.post("/courses/:courseId", userMiddleware, handlePurchaseCourse);

router.get("/purchasedCourses", userMiddleware, handleGetPurchasedCourses);

module.exports = router;
