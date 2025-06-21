const express = require("express");
const createRateLimiter = require("../middleware/rateLimiter");
const investmentController = require("../controllers/investmentController");
const userController = require("../controllers/userController");
const {
  updateTransactionStatusSchema,
} = require("../validators/adminValidator");
const {
  userIdParamSchema,
  approveTierUpgradeSchema,
} = require("../validators/userValidator");

const router = express.Router();

// Rate limiting for admin endpoints

// Validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
        timestamp: new Date().toISOString(),
      });
    }
    next();
  };
};

// Validation middleware for params
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        errors: error.details.map((detail) => detail.message),
        timestamp: new Date().toISOString(),
      });
    }
    next();
  };
};

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin routes are working!",
    timestamp: new Date().toISOString(),
  });
});

// Transaction management routes
router.get(
  "/pending-transactions",
  investmentController.getPendingTransactions
);

router.post(
  "/update-transaction-status",

  validateRequest(updateTransactionStatusSchema),
  investmentController.updateTransactionStatus
);

// User management routes
router.get("/users", userController.getAllUsers);

router.get(
  "/users/:userId",
  validateParams(userIdParamSchema),
  userController.getUserById
);

router.get("/pending-tier-upgrades", userController.getPendingTierUpgrades);

router.post(
  "/approve-tier-upgrade",

  validateRequest(approveTierUpgradeSchema),
  userController.approveTierUpgrade
);

console.log("✅ Admin routes configured successfully");

module.exports = router;
