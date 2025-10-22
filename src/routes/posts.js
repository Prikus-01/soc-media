const express = require("express");
const { validateRequest, createPostSchema, updatePostSchema } = require("../utils/validation");
const {
	create,
	getById,
	getUserPosts,
	getMyPosts,
	remove,
	update,
	searchPosts,
	getfeedposts,
} = require("../controllers/posts");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Posts routes
 */

// POST /api/posts - Create a new post
router.post("/", authenticateToken, validateRequest(createPostSchema), create);

// GET /api/posts/my - Get current user's posts
router.get("/my", authenticateToken, getMyPosts);

// GET /api/posts/:post_id - Get a single post by ID
router.get("/post/:post_id", authenticateToken, getById);

// GET /api/posts/user/:user_id - Get posts by a specific user
router.get("/user/:user_id", authenticateToken, getUserPosts);

// DELETE /api/posts/:post_id - Delete a post
router.delete("/:post_id", authenticateToken, remove);

// GET /api/posts/feed - Get posts from followed users
router.get("/feed", authenticateToken, getfeedposts);

// PUT /api/posts/:post_id - Update a post
router.put("/:post_id", authenticateToken, validateRequest(updatePostSchema), update);

//GET /api/posts/search - Search posts by content
router.get("/search/:search", authenticateToken, searchPosts);


module.exports = router;
