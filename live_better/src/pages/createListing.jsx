import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CreateListing = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [files, setFiles] = useState([]);
    const formInitialState = {
        imageUrls: [],
        title: "",
        description: "",
        address: "",
        regularPrice: 0,
        discountPrice: 0,
        bathrooms: 0,
        bedrooms: 0,
        furnished: false,
        parking: false,
        type: null,
        offer: false,
        userRef: currentUser._id

    }
    const [formData, setFormData] = useState(formInitialState)

    const [imageUploadError, setImageUploadError] = useState(false);
    const [fileUploading, setFileUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // console.log("files: ", files, "formData: ", formData)

    // handling uploading images of listing 
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
            setImageUploadError("You cannot upload more than 6 images!");
            setFileUploading(false);
        }
    }


    // upload listing images 
    const uploadImages = async (file) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, `/better_live_project/listing_project/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log("Uploading: ", progress)
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

    // handle input of form on change 
    const handleInputChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    // submit form 
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.imageUrls.length < 1) { return setError("You must upload atleast 1 image!") };
            if (+formData.discountPrice > +formData.regularPrice) { return setError("Regular price must be more than discount price!") };

            setLoading(true);
            setError(null);

            const payload = {
                method: "POST",
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            const res = await fetch('http://localhost:5000/api/listing/create', payload);
            const data = await res.json();
            // console.log("Data: ", data)

            setLoading(false);
            if (!data || !data.success) {
                console.log("Could not create listing: " + data.message)
                setError(data.message);
                return
            }

            setError(false);
            // setFormData(formInitialState) ;
            navigate(`/listings/list/${currentUser._id}`)
        }
        catch (error) {
            console.log("catch: ", error)
            setLoading(false)
            setError(error.message)

        }
    }

    // delete any image of listing 
    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i !== index)
        })
    }

    // console.log('formData', formData);

    return <main className="create-listing-container my-5 p-3 max-w-7xl m-auto">
        <h2 className="text-3xl text-center font-semibold mt-5">Create a Listing</h2>
        <form className="flex flex-col lg:flex-row gap-6 my-10" onSubmit={handleFormSubmit}>
            <div className="flex flex-col flex-1 gap-5 shadow-slate-300 shadow-2xl px-5 py-10 rounded-lg">
                <input type="text" id="title" placeholder="Title" className="p-3 rounded-md border border-gray-300" value={formData.title} onChange={handleInputChange} required />

                <textarea type="textarea" id="description" placeholder="Descripion" className="p-3 rounded-md border border-gray-300" value={formData.description} onChange={handleInputChange} required />

                <input type="text" id="address" placeholder="Address" className="p-3 rounded-md border border-gray-300" value={formData.address} onChange={handleInputChange} required />

                <div className="flex flex-row flex-wrap gap-5">
                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="sale" className="rounded-md w-5 h-5 border border-gray-300" checked={formData.type === 'sale'} onChange={handleInputChange} />
                        <span className="text-lg">Sell</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="rent" className="rounded-md w-5 h-5 border border-gray-300" checked={formData.type === 'rent'} onChange={handleInputChange} />
                        <span className="text-lg">Rent</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="parking" className="rounded-md w-5 h-5 border border-gray-300" checked={formData.parking} onChange={handleInputChange} />
                        <span className="text-lg">Parking slot</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="furnished" className="rounded-md w-5 h-5 border border-gray-300" checked={formData.furnished} onChange={handleInputChange} />
                        <span className="text-lg">Furnished</span>
                    </div>

                    <div className="flex flex-row gap-3 text-center items-center">
                        <input type="checkbox" id="offer" className="rounded-md w-5 h-5 border border-gray-300" checked={formData.offer} onChange={handleInputChange} />
                        <span className="text-lg">Offer</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5">
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" max="10" id="bedrooms" className="rounded-lg p-3 border border-gray-300" value={formData.bedrooms} onChange={handleInputChange} required />
                        <p>Beds</p>
                    </div>
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" max="10" id="bathrooms" className="rounded-lg p-3 border border-gray-300" value={formData.bathrooms} onChange={handleInputChange} required />
                        <p>Baths</p>
                    </div>
                    <div className="flex gap-2 items-center text-center">
                        <input type="number" min="1" id="regularPrice" className="rounded-lg p-3 border border-gray-300 max-w-32" value={formData.regularPrice} onChange={handleInputChange} required />
                        <div className="flex flex-col items-center text-center">
                            <p>Regular Price</p>
                            {formData.type === 'rent' && <p className="text-xs text-gray-600">($ / month)</p>}
                        </div>
                    </div>
                    {formData.offer &&
                        <div className="flex gap-2 items-center text-center">
                            <input type="number" min="1" id="discountPrice" className="rounded-lg p-3 border border-gray-300 max-w-32" value={formData.discountPrice} onChange={handleInputChange} required />
                            <div className="flex flex-col items-center text-center">
                                <p>Discounted Price</p>
                                {formData.type === 'rent' && <p className="text-xs text-gray-600">($ / month)</p>}
                            </div>
                        </div>
                    }

                </div>
            </div>


            <div className="flex flex-col flex-1 gap-3">
                <div><b>Images: </b><span className="text-slate-600">The first image will be the cover (max 6)</span></div>
                <div className="flex gap-3">
                    <input type="file" className="p-3 rounded-md border border-slate-300 w-full" name="listingImages" id="imagesInput" accept="images./*" onChange={(e) => setFiles(e.target.files)} multiple required />
                    <button disabled={fileUploading} type="button" className="p-3 rounded-md border border-green-700 hover:shadow-lg hover:text-green-600 disabled:opacity-50 uppercase text-green-700" onClick={handleUploadImgages}>{fileUploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                <p className="text-red-700">{imageUploadError && imageUploadError}</p>

                <div className="imagesDiv">
                    {formData.imageUrls.length > 0 ? (formData.imageUrls.map((image, index) => {
                        return <div key={image} className="imageDiv flex justify-between items-center d-flex border m-3 rounded-md p-3">
                            <img src={image} alt="" className="w-20 h-20 object-cover" />
                            <button type="button" onClick={() => { handleDeleteImage(index) }} className="text-red-700 rounded-lg p-3 hover:shadow-md hover:text-red-600">Delete</button>
                        </div>
                    })) : ''}
                </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity:50 uppercase">{loading ? 'Creating...' : 'Create listing'}</button>
                {error && <p className="text-red-700">{error}</p>}
            </div>
        </form>
    </main >
}


export default CreateListing