const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {
	handleAdminSignup,
	handleCreateNewCourse,
	handleGetAllCourses,
} = require("../controllers/admin");

const router = Router();

// Admin Routes
router.post("/signup", handleAdminSignup);

router.post("/courses", adminMiddleware, handleCreateNewCourse);

router.get("/courses", adminMiddleware, handleGetAllCourses);

module.exports = router;
