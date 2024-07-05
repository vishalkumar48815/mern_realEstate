import { useState } from "react"


const CreateListing = () => {
    const [files, setFiles] = useState([]);
    


    return <main className="create-listing-container my-5 p-3 max-w-7xl m-auto">
        <h2 className="text-3xl text-center font-semibold mt-5">Create a Listing</h2>
        <form className="flex flex-col lg:flex-row gap-6 my-10">
            <div className="flex flex-col flex-1 gap-5 shadow-slate-300 shadow-2xl px-5 py-10 rounded-lg">
                <input type="text" id="Name" placeholder="Name" className="p-3 rounded-md border border-gray-300" required />
                <textarea type="textarea" id="Description" placeholder="Descripion" className="p-3 rounded-md border border-gray-300" required />
                <input type="text" id="Address" placeholder="Address" className="p-3 rounded-md border border-gray-300" required />

                <div className="flex flex-row flex-wrap gap-5">
                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="sell" className="rounded-md w-5 h-5 border border-gray-300" />
                        <span className="text-lg">Sell</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="rent" className="rounded-md w-5 h-5 border border-gray-300" />
                        <span className="text-lg">Rent</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="parkingSlot" className="rounded-md w-5 h-5 border border-gray-300" />
                        <span className="text-lg">Parking slot</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="furnished" className="rounded-md w-5 h-5 border border-gray-300" />
                        <span className="text-lg">Furnished</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="offer" className="rounded-md w-5 h-5 border border-gray-300" />
                        <span className="text-lg">Offer</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5">
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" max="10" id="beds" className="rounded-lg p-3 border border-gray-300" required />
                        <p>Beds</p>
                    </div>
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" max="10" id="bathrooms" className="rounded-lg p-3 border border-gray-300" required />
                        <p>Baths</p>
                    </div>
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" id="regularPrice" className="rounded-lg p-3 border border-gray-300 max-w-32" required />
                        <p>Regular Price</p>
                    </div>
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" id="discountedPrice" className="rounded-lg p-3 border border-gray-300 max-w-32" required />
                        <p>Discounted Price</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-3">
                <div><b>Images: </b><span className="text-slate-600">The first image will be the cover (max 6)</span></div>
                <div className="flex gap-3">
                    <input type="file" className="p-3 rounded-md border border-slate-300 w-full" name="listingImages" id="imagesInput" accept="images./*" onChange={(e) => setFiles(e.target.files)} multiple required />
                    <button type="button" className="p-3 rounded-md border border-green-700 hover:shadow-lg disabled:opacity-50 uppercase text-green-700" onClick={handleUploadImgages}>Upload</button>
                </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity:50 uppercase">Create listing</button>
            </div>
        </form>
    </main>
}


export default CreateListing