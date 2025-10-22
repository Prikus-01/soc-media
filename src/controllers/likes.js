// Implement likes controller
// This controller should handle:
// - Liking posts
// - Unliking posts
// - Getting likes for a post
// - Getting posts liked by a user

const logger = require("../utils/logger");
const { likepost, unlikepost, getpostlikes, getuserlikes, hasuserlikedpost } = require("../models/like");

// Implement likePost function
const likePost = async (req, res) => {
	try {
		const { post_id } = req.params;
		const userId = req.user.id;
		const success = await likepost(parseInt(post_id), userId);

		if (!success) {
			return res.status(404).json({ error: "Post not found or unauthorized" });
		}

		logger.verbose(`User ${userId} liked post ${post_id}`);

		res.json({ message: "Post liked successfully", like: success });
	} catch (error) {
		logger.critical("Like post error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement unlikePost function
const unlikePost = async (req, res) => {
	try {
		const { post_id } = req.params;
		const userId = req.user.id;
		const success = await unlikepost(parseInt(post_id), userId);

		if (!success) {
			return res.status(404).json({ error: "Post not found or unauthorized" });
		}

		logger.verbose(`User ${userId} unliked post ${post_id}`);

		res.json({ message: "Post unliked successfully", like: success });
	} catch (error) {
		logger.critical("Unlike post error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement getPostLikes function
const getPostLikes = async (req, res) => {
	try {
		const { post_id } = req.params;
		const likes = await getpostlikes(parseInt(post_id));

		logger.verbose(`Post ${post_id} have ${likes.length} likes`);

		res.json({ likes, count: likes.length });
	} catch (error) {
		logger.critical("Get post likes error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Implement getUserLikes function
const getUserLikes = async (req, res) => {
	try {
		const { user_id } = req.params;
		const likes = await getuserlikes(parseInt(user_id));

		logger.verbose(`User ${user_id} have liked ${likes.length} posts`);

		res.json({ likes, count: likes.length });
	} catch (error) {
		logger.critical("Get user likes error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	likePost, unlikePost, getPostLikes, getUserLikes
};
