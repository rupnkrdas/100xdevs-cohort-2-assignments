const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {
	handleGetAllCourses,
	handleGetPurchasedCourses,
	handlePurchaseCourse,
	handleUserSignin,
	handleUserSignup,
} = require("../controllers/user");

// User Routes
router.post("/signup", handleUserSignup);

router.post("/signin", handleUserSignin);

router.get("/courses", handleGetAllCourses);

router.post("/courses/:courseId", userMiddleware, handlePurchaseCourse);

router.get("/purchasedCourses", userMiddleware, handleGetPurchasedCourses);

module.exports = router;
