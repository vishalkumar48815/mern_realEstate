import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListingFailure, getListingsStart, getListingSuccess } from "../redux/reducers/listingsSlice";
import { Link } from "react-router-dom";


const UserListings = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const userListings = useSelector(state => state.listings.listings);
    const dispatch = useDispatch();



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
            // console.log("data: ", data)
            dispatch(getListingSuccess(data));
        }
        catch (error) {
            console.log("error: ", error)
            dispatch(getListingFailure(error))
        }
    }


    const handleDeleteListing = async (listingId) => {
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


            const data = await res.json();

            // dispatch(getListingSuccess(data));
            if (data?.success) {
                handleShowListings()
            }
        }
        catch (error) {
            console.log("error: ", error)
            // dispatch(getListingFailure(error))
        }
    }




    return <main className="max-w-5xl mt-10 mx-auto p-3">
        <h1 className="text-3xl text-center">My listings</h1>

        <div className="flex flex-col gap-3 my-5">
            {userListings.map((listing) => {
                return <div key={listing._id} className="flex flex-col sm:flex-row border rounded-md items-center gap-5">
                    <div className="p-2">
                        <img className="w-32 h-28 rounded-md" src={listing.imageUrls[0]} alt="" />
                    </div>
                    <Link to={"/listing/"+listing._id}>
                        <h2 className="my-2 text-xl font-normal text-start text-wrap whitespace-break-spaces flex-grow truncate hover:underline">{listing.title}</h2>
                    </Link>
                    <div className="flex flex-col pe-3 sm:ms-auto">
                        <button type="button" className="text-red-700 text-xl p-1 hover:opacity-90 hover:text-red-600 uppercase self-center transform transition-transform hover:scale-95 duration-150"
                            onClick={() => handleDeleteListing(listing._id)}>Delete</button>
                        <Link to={"/edit-listing/" + listing._id} className="mx-auto">
                            <button type="button" className="text-green-700 text-xl p-1 hover:text-green-600 hover:opacity-90 uppercase self-center transform transition-transform hover:scale-95 duration-150">Edit</button>
                        </Link>

                    </div>
                </div>
            })}

        </div>
        {/* {userListings.error && <p className='mt-2 text-red-700'>{userListings.error}</p>} */}
    </main>
}


export default UserListings;