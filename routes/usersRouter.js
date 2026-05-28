const { Router } = require("express");
const usersController = require("../controllers/usersController");
const validate = require("../middlewares/validationMiddleware");
const { authenticate, restrictTo } = require("../middlewares/authMiddleware");
const { signUpSchema, signInSchema } = require("../validators/userValidator");

const router = Router();

// Public routes
router.post("/sign-up", validate(signUpSchema), usersController.signUp);
router.post("/sign-in", validate(signInSchema), usersController.signIn);

// Protected admin routes
router.get("/count", authenticate, restrictTo(["admin"]), usersController.countUsers);
router.get("/", authenticate, restrictTo(["admin"]), usersController.getAllUsers);
router.get("/:id", authenticate, restrictTo(["admin"]), usersController.getUserById);
router.patch("/:id", authenticate, restrictTo(["admin"]), usersController.updateUser);
router.delete("/:id", authenticate, restrictTo(["admin"]), usersController.deleteUser);

module.exports = router;
