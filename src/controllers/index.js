import express from 'express';
import { 
  // getUserById,
  getAllUsers,
 } from './user.controller.js';

const app = express();
app.get('/users', getAllUsers)
// app.get('/:id', getUserById);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});