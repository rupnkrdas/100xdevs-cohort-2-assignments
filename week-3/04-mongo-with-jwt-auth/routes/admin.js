const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {
	handleAdminSignup,
	handleCreateNewCourse,
	handleGetAllCourses,
	handleAdminSignin,
} = require("../controllers/admin");

const router = Router();

// Admin Routes
router.post("/signup", handleAdminSignup);

router.post("/signin", handleAdminSignin);

router.post("/courses", adminMiddleware, handleCreateNewCourse);

router.get("/courses", adminMiddleware, handleGetAllCourses);

module.exports = router;
