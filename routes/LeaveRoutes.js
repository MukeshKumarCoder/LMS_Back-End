const LeaveRoutes = require("express").Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/LeaveController");

const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

LeaveRoutes.use(authMiddleware);

LeaveRoutes.post("/", applyLeave);
LeaveRoutes.get("/", getMyLeaves);
LeaveRoutes.get("/all", roleMiddleware("admin"), getAllLeaves);
LeaveRoutes.patch("/:id", roleMiddleware("admin"), updateLeaveStatus);

module.exports = LeaveRoutes;
