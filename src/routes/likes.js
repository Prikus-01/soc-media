const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { likePost, unlikePost, getPostLikes, getUserLikes } = require("../controllers/likes");
const router = express.Router();

/**
 * Likes routes
 */

// POST /api/likes/:post_id - Like a post
router.post("/:post_id", authenticateToken, likePost);
// DELETE /api/likes/:post_id - Unlike a post
router.delete("/:post_id", authenticateToken, unlikePost);
// GET /api/likes/post/:post_id - Get likes for a post 
router.get("/post/:post_id", authenticateToken, getPostLikes);
// GET /api/likes/user/:user_id - Get posts liked by a user
router.get("/user/:user_id", authenticateToken, getUserLikes);

module.exports = router;
