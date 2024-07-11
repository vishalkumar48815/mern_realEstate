import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListingFailure, getListingsStart, getListingSuccess } from "../redux/reducers/listingsSlice";


const UserListings = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const userListings = useSelector(state => state.listings);
    const dispatch = useDispatch();

    console.log(userListings.listings)

    useEffect(() => {
        handleShowListings();
    }, [])
    


    async function handleShowListings() {
        try {
            dispatch(getListingsStart());
            const payload = {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            }
            const res = await fetch(`http://localhost:5000/api/listing/list/${currentUser._id}`, payload)

            const data = await res.json();
            console.log("data: ", data)
            dispatch(getListingSuccess(data));
        }
        catch (error) {
            console.log("error: ", error)
            dispatch(getListingFailure(error))
        }
    }


    const handleDeleteListing  = async (listingId) => {
        console.log(listingId)
        try {
            // dispatch(getListingsStart());
            const payload = {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            }
            const res = await fetch(`http://localhost:5000/api/listing/delete/${listingId}`, payload)
            
            console.log("text")
            const data = await res.json();
            console.log("data: ", data)
            // dispatch(getListingSuccess(data));
            if(data?.success){
                handleShowListings()

            }
        }
        catch (error) {
            console.log("error: ", error)
            // dispatch(getListingFailure(error))
        }
    }


   

    return <main className="max-w-5xl mt-10 mx-auto">
        <h1 className="text-3xl text-center">My listings</h1>

        <div className="flex flex-col gap-3 my-5">
            {userListings.listings.map((listing) => {
                return <div key={listing._id} className="flex flex-col sm:flex-row border rounded-md items-center gap-5">
                    <div className="p-2">
                        <img className="w-32 h-28 rounded-md" src={listing.imageUrls[0]} alt="" />
                    </div>
                    <h2 className="my-2 text-xl font-medium text-start text-wrap whitespace-break-spaces flex-grow">{listing.title}</h2>
                    <div className="flex flex-col pe-3 items-end">
                        <span  className="text-red-700 text-xl p-1 hover:text-red-600 uppercase self-center" 
                        onClick={() => handleDeleteListing(listing._id)}>Delete</span>
                        <button className="text-green-700 text-xl p-1 hover:text-green-600 uppercase self-center">Edit</button>

                    </div>
                </div>
            })}

        </div>
        {/* {userListings.error && <p className='mt-2 text-red-700'>{userListings.error}</p>} */}
    </main>
}


export default UserListings;