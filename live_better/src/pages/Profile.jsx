import React, { useState } from 'react'
import Input from '../components/Input'
import { useSelector } from 'react-redux';

export default function Profile() {
  const [loading, setLoading] = useState(false) ;
  let currentUser = useSelector(state => state.user.currentUser)

  function handleUpdateProfile(e) {
    e.preventDefault() ;
    console.log(e.target.userName.value)


  }
  
  return (
    <div className='proflie-container mt-10 max-w-lg m-auto'>
      <h2 className='text-center text-3xl font-semibold'>Profile</h2>

      <form action="" className='flex flex-col gap-4 mt-3' onSubmit={handleUpdateProfile}>
        <img src={currentUser.profile_img} alt="" className='rounded-full w-30 h-30 self-center' />
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
