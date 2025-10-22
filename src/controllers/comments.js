// Implement comments controller
// This controller should handle:
// - Creating comments on posts
// - Editing user's own comments
// - Deleting user's own comments
// - Getting comments for a post
// - Pagination for comments

const logger = require("../utils/logger");
const { createcomment, updatecomment, deletecomment, getpostcomments, getcommentbyid } = require("../models/comment");

// Implement createComment function
const createComment = async (req, res) => {
	try {
		const { post_id, content } = req.validatedData;
		const userId = req.user.id;
		//if(post comment == disable){
			//
		//}
		const comment = await createcomment(parseInt(post_id), userId, content);

		logger.verbose(`User ${userId} created comment ${comment.id} on post ${post_id}`);

		res.json({ comment });
	} catch (error) {
		logger.critical("Create comment error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement updateComment function
const updateComment = async (req, res) => {
	try {
		const { comment_id } = req.params;
		const userId = req.user.id;
		const { content } = req.validatedData;
		const comment = await updatecomment(parseInt(comment_id), userId, content);

		logger.verbose(`User ${userId} updated comment ${comment.id}`);

		res.json({ comment });
	} catch (error) {
		logger.critical("Update comment error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement deleteComment function
const deleteComment = async (req, res) => {
	try {
		const { comment_id } = req.params;
		const comment = await deletecomment(parseInt(comment_id));

		logger.verbose(`Comment deleted`);

		res.json({ message: "Comment deleted successfully", comment });
	} catch (error) {
		logger.critical("Delete comment error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
// Implement getPostComments function
const getPostComments = async (req, res) => {
	try {
		const { post_id } = req.params;
		const comments = await getpostcomments(parseInt(post_id));

		logger.verbose(`Post ${post_id} have ${comments.length} comments`);

		res.json({ comments, count: comments.length });
	} catch (error) {
		logger.critical("Get post comments error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement getCommentById function
const getCommentById = async (req, res) => {
	try {
		const { comment_id } = req.params;
		const comment = await getcommentbyid(parseInt(comment_id));

		logger.verbose(`Comment fetched`);

		res.json({ comment });
	} catch (error) {
		logger.critical("Get comment by id error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	createComment, updateComment, deleteComment, getPostComments, getCommentById
};
