import express from 'express'
import { createListing, getUserListings, deleteUserListing, getListingById, updateListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyUser, createListing) ;
router.get('/list/:id', verifyUser, getUserListings);
router.delete('/delete/:id', verifyUser, deleteUserListing);
router.get('/get/:id', getListingById);
router.patch('/update/:id', verifyUser, updateListing);

export default router