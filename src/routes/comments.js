const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { createComment, updateComment, deleteComment, getPostComments, getCommentById } = require("../controllers/comments");
const { validateRequest, createCommentSchema, updateCommentSchema } = require("../utils/validation");
const router = express.Router();

/**
 * Comments routes
 */

// POST /api/comments - Create a comment on a post
router.post("/", authenticateToken, validateRequest(createCommentSchema), createComment);
// PUT /api/comments/:comment_id - Update a comment
router.put("/:comment_id", authenticateToken, validateRequest(updateCommentSchema), updateComment);
// DELETE /api/comments/:comment_id - Delete a comment
router.delete("/:comment_id", authenticateToken, deleteComment);
// GET /api/comments/post/:post_id - Get comments for a post
router.get("/post/:post_id", authenticateToken, getPostComments);
// GET /api/comments/:comment_id - Get a comment by id
router.get("/:comment_id", authenticateToken, getCommentById);

module.exports = router;