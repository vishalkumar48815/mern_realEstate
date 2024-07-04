import express from 'express' ;
import { deleteUser, signOutUser, updateUser } from '../controllers/user.controller.js' ;
import { verifyUser } from '../utils/verifyUser.js';

const  router = express.Router();

router.put('/update/:id', verifyUser,  updateUser);
router.delete('/delete/:id', verifyUser,  deleteUser);
router.post('/signout', signOutUser);

export default router