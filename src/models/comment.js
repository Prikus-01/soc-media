const { query } = require("../utils/database");

/**
 * Comment model for managing post comments
 */

// Implement createComment function
const createcomment = async (post_id, user_id, content) => {
	const result = await query(
		"INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
		[post_id, user_id, content]
	);
	return result.rows[0];
};
// Implement updateComment function
const updatecomment = async (comment_id, user_id, content) => {
	const result = await query(
		"UPDATE comments SET content = $2 WHERE id = $1 AND user_id = $3 RETURNING *",
		[comment_id, content, user_id]
	);
	return result.rows[0];
};
// Implement deleteComment function
const deletecomment = async (comment_id) => {
	const result = await query(
		"DELETE FROM comments WHERE id = $1 RETURNING *",
		[comment_id]
	);
	return result.rows[0];
};
// Implement getPostComments function
const getpostcomments = async (post_id) => {
	const result = await query(
		"SELECT * FROM comments WHERE post_id = $1",
		[post_id]
	);
	return result.rows;
};
// Implement getCommentById function
const getcommentbyid = async (comment_id) => {
	const result = await query(
		"SELECT * FROM comments WHERE id = $1",
		[comment_id]
	);
	return result.rows[0];
};

module.exports = {
	createcomment, updatecomment, deletecomment, getpostcomments, getcommentbyid
};
