const { query } = require("../utils/database");

/**
 * Follow model for managing user relationships
 */

// Implement followUser function
const followUser = async (user_id, followingId) => {
	const result = await query(
		`INSERT INTO follows (user_id, following_id)
			VALUES ($1, $2)
			RETURNING id,user_id,following_id`,
		[user_id, followingId],
	);

	return result.rows[0];
};

// Implement unfollowUser function
const unfollowUser = async (user_id, followingId) => {
	const result = await query(
		`DELETE FROM follows
			WHERE user_id = $1 AND following_id = $2
			RETURNING id,user_id,following_id`,
		[user_id, followingId],
	);
	
	return result.rows[0];
};
//	 Implement getFollowing function
const getFollowing = async (user_id) => {
	const result = await query(
		`SELECT * FROM follows
			WHERE user_id = $1`,
		[user_id],
	);

	return result.rows;
};
// Implement getFollowers function
const getFollowers = async (following_id) => {
	const result = await query(
		`SELECT * FROM follows
			WHERE following_id = $1`,
		[following_id],
	);

	return result.rows;
};


module.exports = {
	followUser,
    unfollowUser,
    getFollowing,
    getFollowers,
};
