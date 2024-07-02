import React, { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [imgUploadError, setImgUploadError] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(undefined);
  const [uploadImgProgressPerc, setUploadImgProgressPerc] = useState(0);
  const [formData, setFormData] = useState();
  const imageUploadRef = useRef(null);

  let currentUser = useSelector(state => state.user.currentUser);


  useEffect(() => {
    if (fileUploaded) {
      handleAvatarUpload(fileUploaded);

    }
  }, [fileUploaded]) ;

  function handleAvatarUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `mern-realestate-avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', async (snapshot) => {
      const progressPrecentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadImgProgressPerc(Math.round(progressPrecentage));

      // console.log("progressPercentage: ", progressPrecentage)

    },
      (error) => {
        setImgUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl })
          // console.log("formData", formData, downloadUrl)
        })
      })
  }


  function handleUpdateProfile(e) {
    e.preventDefault();

    // console.log(e.target.userName.value)
  }

  return (
    <div className='proflie-container mt-10 max-w-lg m-auto'>
      <h2 className='text-center text-3xl font-semibold'>Profile</h2>

      <form action="" className='flex flex-col gap-4 mt-3' onSubmit={handleUpdateProfile}>
        <input onChange={(e) => setFileUploaded(e.target.files[0])} type="file" accept='image./*' ref={imageUploadRef} hidden />
        <img className='w-28 h-28 max-w-28 max-h-28 rounded-full self-center' src={formData?.avatar || currentUser.profile_img} alt="" onClick={() => imageUploadRef.current.click()}  />
        <p className='self-center text-sm'>
          {imgUploadError ? <span className='text-red-700'>Failed Upload Image!</span> :
            (uploadImgProgressPerc > 0 && uploadImgProgressPerc < 100) ? <span className='text-slate-700'>`Uploading {uploadImgProgressPerc}%`</span> : (uploadImgProgressPerc === 100) ? <span className='text-green-700'>Image Successfully Uploaded!</span> : ''}
        </p>

        <Input type="text" placeholder="Username" id="userName" value={currentUser.username} />
        <Input type="email" placeholder="Email" id="userEmail" value={currentUser.email} />
        <Input type="password" placeholder="Password" id="userPassword" />

        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80 uppercase">{loading ? 'loading...' : 'Update'}</button>
        <button disabled={loading} className="bg-green-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80 uppercase">{loading ? 'loading...' : 'Create Listing'}</button>
      </form>
      <div className="flex justify-between mt-3">
        <span className='text-red-700 cursor-pointer font-medium hover:opacity-70'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-medium hover:opacity-70'>Sign Out</span>
      </div>

    </div>
  )
}
