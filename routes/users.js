import express from "express";
import {
  getUser,
  getUserFriends,
  getRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth";

const router = express.Router(s);

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/fiends", verifyToken, getUserFriends);

//  UPDATE
router.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default router;
