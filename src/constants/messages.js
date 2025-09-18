// Application messages constants

export const AUTH_MESSAGES = {
  // Success messages
  USER_REGISTERED_SUCCESS: "User registered successfully!",
  LOGIN_SUCCESS: "Login successful!",
  LOGOUT_SUCCESS: "Logout successful!",
  
  // Error messages
  USER_NOT_FOUND: "User not found!",
  INVALID_PASSWORD: "Invalid password!",
  ERROR_REGISTERING_USER: "Error registering user",
  ERROR_LOGGING_IN: "Error logging in",
  ERROR_LOGGING_OUT: "Error logging out"
};

export const USER_MESSAGES = {
  // Success messages
  USER_UPDATED_SUCCESS: "User updated successfully",
  USER_DELETED_SUCCESS: "User deleted successfully",
  
  // Error messages
  USER_NOT_FOUND: "User not found",
  ERROR_GETTING_USER_PROFILE: "Error getting user profile",
  ERROR_UPDATING_USER: "Error updating user",
  ERROR_GETTING_USERS: "Error getting users", 
  ERROR_DELETING_USER: "Error deleting user"
};

export const ROLE_MESSAGES = {
  // Success messages
  ROLE_DELETED_SUCCESS: "Role deleted successfully",
  
  // Error messages
  ROLE_NAME_REQUIRED: "Role name is required",
  ROLE_ALREADY_EXISTS: "Role already exists",
  ROLE_NOT_FOUND: "Role not found",
  ERROR_CREATING_ROLE: "Error creating role",
  ERROR_FETCHING_ROLES: "Error fetching roles",
  ERROR_DELETING_ROLE: "Error deleting role"
};

export const MIDDLEWARE_MESSAGES = {
  // JWT middleware messages
  NO_TOKEN_PROVIDED: "No token provided!",
  UNAUTHORIZED: "Unauthorized!",
  
  // Signup middleware messages
  USERNAME_ALREADY_IN_USE: "Failed! Username is already in use!",
  EMAIL_ALREADY_IN_USE: "Failed! Email is already in use!",
  ERROR_CHECKING_DUPLICATE_USER: "Error checking duplicate user!",
  ROLE_DOES_NOT_EXIST: "does not exist!", // Will be used with template: `Failed! Role ${roleName} ${ROLE_DOES_NOT_EXIST}`
  ERROR_CHECKING_ROLES: "Error checking roles!"
};

export const VALIDATOR_MESSAGES = {
  // General validation messages
  VALIDATION_FAILED: "Validation failed",
  
  // Username validation messages
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters long",
  USERNAME_ALPHANUMERIC: "Username must contain only letters and numbers",
  USERNAME_REQUIRED: "Username is required",
  
  // Email validation messages
  EMAIL_INVALID: "Must be a valid email",
  
  // Password validation messages
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long",
  PASSWORD_COMPLEXITY: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_CONFIRMATION_MISMATCH: "Password confirmation does not match password",
  
  // Cookie validation messages
  INVALID_COOKIES: "Invalid cookies"
};

export const MODEL_MESSAGES = {
  // Model synchronization messages
  USER_MODEL_SYNCED: "User model was synchronized successfully.",
  ROLE_MODEL_SYNCED: "Role model was synchronized successfully."
};

// Combined export for easy access
export const MESSAGES = {
  ...AUTH_MESSAGES,
  ...USER_MESSAGES,
  ...ROLE_MESSAGES,
  ...MIDDLEWARE_MESSAGES,
  ...VALIDATOR_MESSAGES,
  ...MODEL_MESSAGES
};