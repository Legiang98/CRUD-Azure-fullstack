import express from 'express';
import { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './user.controller.js';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from './role.controller.js';

const authRoute = express.route();

authRoute.use(express.json());

// User routes
authRoute.get('/users', getAllUsers);           // GET all users
authRoute.get('/users/:id', getUserById);       // GET user by ID
authRoute.post('/users', createUser);           // CREATE new user
authRoute.put('/users/:id', updateUser);        // UPDATE user by ID
authRoute.delete('/users/:id', deleteUser);     // DELETE user by ID

// Role routes
authRoute.get('/roles', getAllRoles);           // GET all roles
authRoute.get('/roles/:id', getRoleById);       // GET role by ID
authRoute.post('/roles', createRole);           // CREATE new role
authRoute.put('/roles/:id', updateRole);        // UPDATE role by ID
authRoute.delete('/roles/:id', deleteRole);     // DELETE role by ID

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

export default authRoute;