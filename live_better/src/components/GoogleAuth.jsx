import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth' ;
import { app } from '../firebase.js' ;
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/reducers/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleAuth = () => {
    const [loading, SetLoading] = useState(false) ;
    let navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const  handleAuthClick = async () => {
        try{
            SetLoading(true);
            const provider = new GoogleAuthProvider() ;
            const auth = getAuth(app) ;
            const result = await signInWithPopup(auth, provider) ;
            // console.log("result", result)
            const res = await fetch('http://localhost:5000/api/auth/googleAuth', {
                method: "POST",
                headers: {
                    "content-type" : 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photoUrl: result.user.photoURL })
            })
            const data = await res.json();
            console.log("Data: ", data)
            dispatch(signInSuccess(data)) ;
            navigate('/')

        }
        catch(error){
            console.log("Could not signIn with Google: " , error)
            SetLoading(false);

        }

    }

    return <button type="button" className="p-3 rounded-lg bg-red-900 text-white hover:bg-red-800 uppercase" onClick={handleAuthClick}>continue with google</button>
}