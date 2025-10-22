const { query } = require("../utils/database");

/**
 * Like model for managing post likes
 */

// Implement likePost function
const likepost = async (post_id, user_id) => {
	const result = await query(
		"INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *",
		[post_id, user_id]
	);
	return result.rows[0];
};
// Implement unlikePost function
const unlikepost = async (post_id, user_id) => {
	const result = await query(
		"DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *",
		[post_id, user_id]
	);
	return result.rows[0];
};
// Implement getPostLikes function
const getpostlikes = async (post_id) => {
	const result = await query(
		"SELECT * FROM likes WHERE post_id = $1",
		[post_id]
	);
	return result.rows;
};
// Implement getUserLikes function
const getuserlikes = async (user_id) => {
	const result = await query(
		"SELECT * FROM likes WHERE user_id = $1",
		[user_id]
	);
	return result.rows;
};
// Implement hasUserLikedPost function
const hasuserlikedpost = async (post_id, user_id) => {
	const result = await query(
		"SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
		[post_id, user_id]
	);
	return result.rows.length > 0;
};

module.exports = {
	likepost, unlikepost, getpostlikes, getuserlikes, hasuserlikedpost
};
