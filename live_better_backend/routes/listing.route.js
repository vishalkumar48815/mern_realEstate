import express from 'express'
import { createListing, getUserListings, deleteUserListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyUser, createListing) ;
router.get('/list/:id', verifyUser, getUserListings);
router.delete('/delete/:id', verifyUser, deleteUserListing);

export default router