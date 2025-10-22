// Implement users controller
// This controller should handle:
// - Following a user
// - Unfollowing a user
// - Getting users that the current user is following
// - Getting users that follow the current user
// - Getting follow counts for a user

const logger = require("../utils/logger");
const { followUser, unfollowUser, getFollowing, getFollowers } = require("../models/follow");
const { findUsersByName ,getUserProfile ,getUserById } = require("../models/user");

// Implement follow function
const follow = async (req, res) => {
  try {
    const { id : user_id } = req.params;
    const userId = req.user.id;

    const result = await followUser(userId, parseInt(user_id));

    logger.verbose(`User ${userId} followed user ${user_id}`);

    res.status(201).json({
        message: "Followed successfully",
        follow: result,
    });
  } catch (error) {
    logger.critical("Failed to following user:", error);
    res.status(500).json({ error: "Failed to following user" });
  }
};
// Implement unfollow function
const unfollow = async (req, res) => {
  try {
    const { id : user_id } = req.params;
    const userId = req.user.id;

    const result = await unfollowUser(userId, parseInt(user_id));

    logger.verbose(`User ${userId} unfollowed user ${user_id}`);

    res.status(201).json({
        message: "Unfollowed successfully",
        follow: result,
    });
  } catch (error) {
    logger.critical("Failed to unfollow user:", error);
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};
// Implement getMyFollowing function
const getfollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await getFollowing(parseInt(userId));

    logger.verbose(`User ${userId} following ${result.length} users`);

    res.status(200).json({
        message: "success",
        follow: result,
    });
  } catch (error) {
    logger.critical("Failed to get following user:", error);
    res.status(500).json({ error: "Failed to get following user" });
  }
};
// Implement getMyFollowers function
const getfollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await getFollowers(parseInt(userId));

    logger.verbose(`User ${userId} followers ${result.length} users`);

    res.status(200).json({
        message: "success",
        follow: result,
    });
  } catch (error) {
    logger.critical("Failed to get followers user:", error);
    res.status(500).json({ error: "Failed to get followers user" });
  }
};

// Implement getstats function
const getstats = async (req, res) => {
  try {
    const userId = req.params.id;

    const following = await getFollowing(parseInt(userId));
    const followers = await getFollowers(parseInt(userId));

    logger.verbose(`User ${userId} stats ${following.length} following and ${followers.length} followers`);

    res.status(200).json({
        message: "Number of following and followers",
        stats: {
            following: following.length,
            followers: followers.length,
        },
    });
  } catch (error) {
    logger.critical("Failed to get stats user:", error);
    res.status(500).json({ error: "Failed to get stats user" });
  }
};

// Implement search function
const search = async (req, res) => {
  try {
    const { name } = req.validatedData;

    const result = await findUsersByName(name);

    logger.verbose(`User ${name} searched`);

    res.status(200).json({
        message: "success",
        users: result,
    });
  } catch (error) {
    logger.critical("Failed to search user:", error);
    res.status(500).json({ error: "Failed to search user" });
  }
};
// Implement user profile function
const profile = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await getUserProfile(parseInt(userId));

    logger.verbose(`User ${userId} profile ${result}`);

    res.status(200).json({
        message: "success",
        user: result,
    });
  } catch (error) {
    logger.critical("Failed to get user profile:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};

// Implement get user by id
const getuserbyid = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await getUserById(parseInt(userId));

    logger.verbose(`User ${userId} profile`);

    res.status(200).json({
        message: "success",
        user: result,
    });
  } catch (error) {
    logger.critical("Failed to get user profile:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};
module.exports = {
	follow,
	unfollow,
	getfollowing,
	getfollowers,
	getstats,
	search,
	profile,
	getuserbyid,
};
