import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";



export const createListing = async (req, res, next) => {
    try {
        const listing = Listing.create(req.body);
        return res.status(201).json({ ...listing, success: true })
    }
    catch (error) {
        next(error)
    }
}



export const getUserListings = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) { return next(errorHandler(401, "You can only see your own listings!")) }
        let userId = req.user.id;
        const userListings = await Listing.find({ userRef: userId });
        // console.log(userListings) ;
        res.status(200).json(userListings);

    }
    catch (error) {
        next(error)
    }
}


export const deleteUserListing = async (req, res, next) => {
    console.log("user_id", req.user.id, req.params.id)
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listings!"))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });

    }
    catch (error) {
        next(error)
    }
}

export const getListingById = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) { return next(errorHandler(404, "Listing not found!")) }

    res.status(200).json({ ...listing._doc, success: true })
}



export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) { return next(errorHandler(404, "Listing not found!")) }

    if (req.user.id !== listing.userRef) { next(errorHandler(401, "You can only update you listing!")) }

    try{
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            })
    
            res.status(200).json({...updatedListing, success: true}) ;

    }
    catch(error){
        next(errorHandler(error)) ;
    }
}
