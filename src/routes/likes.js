const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { likePost, unlikePost, getPostLikes, getUserLikes } = require("../controllers/likes");
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Likes
 *     description: Post like endpoints
 */

/**
 * Likes routes
 */

/**
 * @openapi
 * /api/likes/{post_id}:
 *   post:
 *     tags: [Likes]
 *     summary: Like a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags: [Likes]
 *     summary: Unlike a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post unliked
 *       401:
 *         description: Unauthorized
 */
// POST /api/likes/:post_id - Like a post
router.post("/:post_id", authenticateToken, likePost);
// DELETE /api/likes/:post_id - Unlike a post
router.delete("/:post_id", authenticateToken, unlikePost);

/**
 * @openapi
 * /api/likes/post/{post_id}:
 *   get:
 *     tags: [Likes]
 *     summary: Get likes for a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of likes
 *       401:
 *         description: Unauthorized
 */
// GET /api/likes/post/:post_id - Get likes for a post 
router.get("/post/:post_id", authenticateToken, getPostLikes);

/**
 * @openapi
 * /api/likes/user/{user_id}:
 *   get:
 *     tags: [Likes]
 *     summary: Get posts liked by a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of liked posts
 *       401:
 *         description: Unauthorized
 */
// GET /api/likes/user/:user_id - Get posts liked by a user
router.get("/user/:user_id", authenticateToken, getUserLikes);

module.exports = router;
