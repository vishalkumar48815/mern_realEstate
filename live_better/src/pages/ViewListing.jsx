import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";




const ViewListing = () => {
    SwiperCore.use([Navigation])
    const params = useParams();
    const [listingData, setListingData] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // geting the data of a paricular listing with listing id 
    const getSelectedListing = async () => {
        const listingId = params.id;
        setLoading(true);
        setError(false);

        try {
            const payload = {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            }
            const res = await fetch(`http://localhost:5000/api/listing/get/${listingId}`, payload)

            const data = await res.json();
            if (!data || !data.success) {
                setError(data.message);
                setLoading(false);
                return
            }
            setListingData(data);
            setLoading(false);
            setError(false);
            console.log("lisitng: ", data)
        }
        catch (error) {
            console.log("Error while getting the listing: ", error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        getSelectedListing();
    }, [params.id])



    return <main>
        <div>
            {listingData && !loading && !error ?
                (<Swiper navigation>
                    {
                        listingData.imageUrls.map(url =>
                            <SwiperSlide key={url}>
                                <div className="h-[500px]">
                                    <img className="w-full h-full" src={url} alt="" />
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>)
                : loading ? (<p className="text-xl text-center">Loading...</p>)
                    : error ? (<p className="text-center text-red-700 text-xl">{error}</p>)
                        : (<p className="text-center text-3xl">Something went wrong!</p>)
            }

            <div className="listingInfoDiv max-w-6xl mx-auto my-5 p-3">
                <h2 className="text-3xl">{listingData.title}</h2>

                <div className="location flex gap-3 items-center text-sm my-4">
                    <FaMapMarkerAlt className="text-green-700" />
                    <p>{listingData.address}</p>
                </div>

                <div className="flex gap-4 my-4">
                    <p className="bg-red-900 text-white py-1 text-xl max-w-[200px] px-10 rounded-md">{listingData.type === 'rent' ? "For Rent" : listingData.type === "sale" ? "For Sale"  : listingData.type}</p>
                    <p className="bg-green-900 text-white p-1 text-xl max-w-[200px] px-10 rounded-md">{listingData.offer && "$" + listingData.discountPrice + " discount"}</p>
                </div>
                
                <p className="my-4 font-bold">Description - <span className="text-md text-slate-800 font-normal">{listingData.description}</span></p>

                <div className="flex gap-3">
                    <span className="text-green-800 font-semibold gap-1 flex items-center"><FaBed className="text-xl font-semibold" /> {listingData.bedrooms + "Beds"}</span>

                    <span className="text-green-800 font-semibold gap-1 flex items-center"><FaBed className="text-xl font-semibold" /> {listingData.bedrooms + "Beds"}</span>

                    <span className="text-green-800 font-semibold gap-1 flex items-center"><FaParking className="text-xl font-semibold" /> {listingData.parking ? "Have Parking" : "No Parking"}</span>

                    <span className="text-green-800 font-semibold gap-1 flex items-center"><FaChair className="text-xl font-semibold" /> {listingData.furnished ? "Furnished" : "Non Furnished"}</span>
                </div>
            </div>
        </div>

    </main>
}

export default ViewListing;