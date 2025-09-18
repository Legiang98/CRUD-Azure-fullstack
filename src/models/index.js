// Initialize and export all models
import { User } from "./user.model.js";
import { Role } from "./role.model.js";

// If you need to initialize relationships or sync models, do it here
export function initModels() {
  // No relationships to set up for plain SQL models
  // If using an ORM, define associations here
}

export { User, Role };
