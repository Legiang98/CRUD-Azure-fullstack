// Auth validators
import { body, validationResult } from "express-validator";
import { VALIDATOR_MESSAGES } from "../constants/messages.js";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: VALIDATOR_MESSAGES.VALIDATION_FAILED,
      errors: errors.array()
    });
  }
  next();
};

export const validateRegister = [
  body("username")
    .isLength({ min: 3 })
    .withMessage(VALIDATOR_MESSAGES.USERNAME_MIN_LENGTH)
    .isAlphanumeric()
    .withMessage(VALIDATOR_MESSAGES.USERNAME_ALPHANUMERIC),
  body("email")
    .isEmail()
    .withMessage(VALIDATOR_MESSAGES.EMAIL_INVALID)
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage(VALIDATOR_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(VALIDATOR_MESSAGES.PASSWORD_COMPLEXITY),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(VALIDATOR_MESSAGES.PASSWORD_CONFIRMATION_MISMATCH);
      }
      return true;
    }),
  handleValidationErrors
];

export const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage(VALIDATOR_MESSAGES.USERNAME_REQUIRED)
    .trim(),
  body("password")
    .notEmpty()
    .withMessage(VALIDATOR_MESSAGES.PASSWORD_REQUIRED),
  handleValidationErrors
];
