const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { createComment, updateComment, deleteComment, getPostComments, getCommentById } = require("../controllers/comments");
const { validateRequest, createCommentSchema, updateCommentSchema } = require("../utils/validation");
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Comments
 *     description: Comment endpoints
 */

/**
 * Comments routes
 */

/**
 * @openapi
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment on a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
*/
// POST /api/comments - Create a comment on a post
router.post("/", authenticateToken, validateRequest(createCommentSchema), createComment);

/**
 * @openapi
 * /api/comments/{comment_id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
*/
// PUT /api/comments/:comment_id - Update a comment
router.put("/:comment_id", authenticateToken, validateRequest(updateCommentSchema), updateComment);
// DELETE /api/comments/:comment_id - Delete a comment
router.delete("/:comment_id", authenticateToken, deleteComment);

/**
 * @openapi
 * /api/comments/post/{post_id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments for a post
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
 *         description: List of comments
 *       401:
 *         description: Unauthorized
*/
// GET /api/comments/post/:post_id - Get comments for a post
router.get("/post/:post_id", authenticateToken, getPostComments);

/**
 * @openapi
 * /api/comments/{comment_id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get a comment by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment details
 *       401:
 *         description: Unauthorized
*/
// GET /api/comments/:comment_id - Get a comment by id
router.get("/:comment_id", authenticateToken, getCommentById);

module.exports = router;