const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { follow, unfollow, getfollowing, getfollowers, getstats ,search, profile, getuserbyid } = require("../controllers/users");
const { validateRequest, searchUserSchema } = require("../utils/validation");
const router = express.Router();

/**
 * User-related routes
 */

// POST /api/users/follow - Follow a user
router.post("/follow/:id", authenticateToken, follow);
// DELETE /api/users/unfollow - Unfollow a user
router.delete("/unfollow/:id", authenticateToken, unfollow);
// GET /api/users/following - Get users that current user follows
router.get("/following/:id", authenticateToken, getfollowing);
// GET /api/users/followers - Get users that follow current user
router.get("/followers/:id", authenticateToken, getfollowers);
// GET /api/users/stats - Get follow stats for current user
router.get("/stats/:id", authenticateToken, getstats);
// POST /api/users/search - Find users by name
router.post("/search", authenticateToken, validateRequest(searchUserSchema), search);
// GET /api/users/profile - Get user profile
router.get("/profile/:id", authenticateToken, profile);
//get user by id
router.get("/:id", authenticateToken, getuserbyid);


module.exports = router;
