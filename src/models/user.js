const { query } = require("../utils/database");
const bcrypt = require("bcryptjs");
const { getFollowing, getFollowers } = require("../models/follow");

/**
 * User model for database operations
 */

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
const createUser = async ({ username, email, password, full_name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users (username, email, password_hash, full_name, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, username, email, full_name, created_at`,
    [username, email, hashedPassword, full_name],
  );

  return result.rows[0];
};

/**
 * Find user by username
 * @param {string} username - Username to search for
 * @returns {Promise<Object|null>} User object or null
 */
const getUserByUsername = async (username) => {
  const result = await query(`SELECT * FROM public.users where username like '${username}'`);
  return result.rows[0] || null;
};

/**
 * Find user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} User object or null
 */
const getUserById = async (id) => {
  const result = await query(
    "SELECT id, username, email, full_name, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0] || null;
};

/**
 * Verify user password
 * @param {string} plainPassword - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} Password match result
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Implement findUsersByName function for search functionality
// This should support partial name matching and pagination
const findUsersByName = async (name) => {
  const result = await query(
    "SELECT id, username, email, full_name, created_at FROM users WHERE full_name ILIKE $1",
    [`%${name}%`],
  );

  return result.rows;
};

// Implement getUserProfile function that includes follower/following counts
const getUserProfile = async (id) => {
  const result = await query(
    "SELECT id, username, email, full_name, created_at FROM users WHERE id = $1",
    [id],
  );
  const following = await getFollowing(id);
  const followers = await getFollowers(id);
  return {
    ...result.rows[0],
    following : following.length,
    followers : followers.length,
  } || null;
};

// Implement updateUserProfile function for profile updates
const updateUserProfile = async (id, { username, email, full_name }) => {
  const result = await query(
    "UPDATE users SET username = $2, email = $3, full_name = $4 WHERE id = $1 RETURNING id, username, email, full_name, created_at",
    [id, username, email, full_name],
  );

  return result.rows[0] || null;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  verifyPassword,
  findUsersByName,
  getUserProfile,
  updateUserProfile,
};
