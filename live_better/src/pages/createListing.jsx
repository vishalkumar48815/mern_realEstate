import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";


const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: []
    })

    const [imageUploadError, setImageUploadError] = useState(false);
    const [fileUploading, setFileUploading] = useState(false) ;


    console.log("files: ", files, "formData: ", formData)
    const handleUploadImgages = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setFileUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(uploadImages(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                })
                setImageUploadError(false);
                setFileUploading(false);

            }).catch((err) => {
                setImageUploadError("Image upload failed! (2 mb max per image)");
                setFileUploading(false);
            })
        }
        else {
            setImageUploadError("You cannot upload morwe than 6 images!");
            setFileUploading(false);
        }
    }


    const uploadImages = async (file) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Uploading: ", progress)
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        })
                    }
                )

            })
        }
    }


    const handleFormSubmit = () => {

    }

    const handleDeleteImage  = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i != index)
        })
    }


    return <main className="create-listing-container my-5 p-3 max-w-7xl m-auto">
        <h2 className="text-3xl text-center font-semibold mt-5">Create a Listing</h2>
        <form className="flex flex-col lg:flex-row gap-6 my-10" onSubmit={() => handleFormSubmit()}>
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
                    <button disabled={fileUploading} type="button" className="p-3 rounded-md border border-green-700 hover:shadow-lg hover:text-green-600 disabled:opacity-50 uppercase text-green-700" onClick={handleUploadImgages}>{fileUploading ? 'Uploading' : 'Upload'}</button>
                </div>
                <p className="text-red-700">{imageUploadError && imageUploadError}</p>

                <div className="imagesDiv">
                    {formData.imageUrls.length > 0 ? (formData.imageUrls.map((image, index) => {
                        return <div key={image} className="imageDiv flex justify-between items-center d-flex border m-3 rounded-md p-3">
                        <img src={image} alt="" className="w-20 h-20 object-cover" />
                        <button type="button"onClick={() => {handleDeleteImage(index)}} className="text-red-700 rounded-lg p-3 hover:shadow-md hover:text-red-600">Delete</button>
                    </div>
                    })) : ''}
                </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity:50 uppercase">Create listing</button>
            </div>
        </form>
    </main>
}


export default CreateListing