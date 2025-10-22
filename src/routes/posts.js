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
 * @openapi
 * tags:
 *   - name: Posts
 *     description: Post management endpoints
 */

/**
 * Posts routes
 */

/**
 * @openapi
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created
 *       401:
 *         description: Unauthorized
*/
// POST /api/posts - Create a new post
router.post("/", authenticateToken, validateRequest(createPostSchema), create);

/**
 * @openapi
 * /api/posts/my:
 *   get:
 *     tags: [Posts]
 *     summary: Get current user's posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's posts
 *       401:
 *         description: Unauthorized
*/
// GET /api/posts/my - Get current user's posts
router.get("/my", authenticateToken, getMyPosts);

/**
 * @openapi
 * /api/posts/post/{post_id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get a single post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post details
 *       401:
 *         description: Unauthorized
*/
// GET /api/posts/:post_id - Get a single post by ID
router.get("/post/:post_id", authenticateToken, getById);

/**
 * @openapi
 * /api/posts/user/{user_id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get posts by a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of posts
 *       401:
 *         description: Unauthorized
*/
// GET /api/posts/user/:user_id - Get posts by a specific user
router.get("/user/:user_id", authenticateToken, getUserPosts);

/**
 * @openapi
 * /api/posts/{post_id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post deleted
 *       401:
 *         description: Unauthorized
*/
// DELETE /api/posts/:post_id - Delete a post
router.delete("/:post_id", authenticateToken, remove);

/**
 * @openapi
 * /api/posts/feed:
 *   get:
 *     tags: [Posts]
 *     summary: Get posts from followed users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of feed posts
 *       401:
 *         description: Unauthorized
*/
// GET /api/posts/feed - Get posts from followed users
router.get("/feed", authenticateToken, getfeedposts);

/**
 * @openapi
 * /api/posts/{post_id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated
 *       401:
 *         description: Unauthorized
*/
// PUT /api/posts/:post_id - Update a post
router.put("/:post_id", authenticateToken, validateRequest(updatePostSchema), update);

/**
 * @openapi
 * /api/posts/search/{search}:
 *   get:
 *     tags: [Posts]
 *     summary: Search posts by content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized
*/
//GET /api/posts/search - Search posts by content
router.get("/search/:search", authenticateToken, searchPosts);


module.exports = router;
