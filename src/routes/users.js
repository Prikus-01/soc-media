const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { follow, unfollow, getfollowing, getfollowers, getstats ,search, profile, getuserbyid } = require("../controllers/users");
const { validateRequest, searchUserSchema } = require("../utils/validation");
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User and follow management endpoints
 */

/**
 * User-related routes
 */

/**
 * @openapi
 * /api/users/follow/{id}:
 *   post:
 *     tags: [Users]
 *     summary: Follow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Now following
 *       401:
 *         description: Unauthorized
*/
// POST /api/users/follow - Follow a user
router.post("/follow/:id", authenticateToken, follow);

/**
 * @openapi
 * /api/users/unfollow/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Unfollow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Unfollowed
 *       401:
 *         description: Unauthorized
*/
// DELETE /api/users/unfollow - Unfollow a user
router.delete("/unfollow/:id", authenticateToken, unfollow);

/**
 * @openapi
 * /api/users/following/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get users that current user follows
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Following list
 *       401:
 *         description: Unauthorized
*/
// GET /api/users/following - Get users that current user follows
router.get("/following/:id", authenticateToken, getfollowing);

/**
 * @openapi
 * /api/users/followers/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get users that follow current user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Followers list
 *       401:
 *         description: Unauthorized
*/
// GET /api/users/followers - Get users that follow current user
router.get("/followers/:id", authenticateToken, getfollowers);

/**
 * @openapi
 * /api/users/stats/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get follow stats for current user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Follow stats
 *       401:
 *         description: Unauthorized
*/
// GET /api/users/stats - Get follow stats for current user
router.get("/stats/:id", authenticateToken, getstats);

/**
 * @openapi
 * /api/users/search:
 *   post:
 *     tags: [Users]
 *     summary: Find users by name
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized
*/
// POST /api/users/search - Find users by name
router.post("/search", authenticateToken, validateRequest(searchUserSchema), search);

/**
 * @openapi
 * /api/users/profile/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
*/
// GET /api/users/profile - Get user profile
router.get("/profile/:id", authenticateToken, profile);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
*/
//get user by id
router.get("/:id", authenticateToken, getuserbyid);


module.exports = router;
