const { Router } = require("express");
const postsController = require("../controllers/postsController");
const validate = require("../middlewares/validationMiddleware");
const { authenticate } = require("../middlewares/authMiddleware");
const { createPostSchema, updatePostSchema } = require("../validators/postValidator");

const router = Router();

// All post routes require authentication
router.post("/", authenticate, validate(createPostSchema), postsController.createPost);
router.get("/", authenticate, postsController.getAllPosts);
router.get("/:id", authenticate, postsController.getPostById);
router.patch("/:id", authenticate, validate(updatePostSchema), postsController.updatePost);
router.delete("/:id", authenticate, postsController.deletePost);

module.exports = router;
