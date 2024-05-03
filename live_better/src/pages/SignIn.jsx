import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    // to handle the data of inputs on change  
    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // to submit the login form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let payload = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            const res = await fetch('http://localhost:5000/api/auth/signin', payload);
            const data = await res.json();
            console.log('data', data)

            if (!data.success) {
                setLoading(false);
                setErrorMessage(data.message);
                return
            }
            if (data.success) {
                setLoading(false);
                setErrorMessage(null);
                navigate('/');
            }
        }
        catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
            console.log("error", error.message);
        }
    }

    console.log(formData)

    // html code 
    return (
        <div className="max-w-lg m-auto">
            <h1 className="text-center text-3xl my-5 font-semibold">Sign in</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input type="email" placeholder="Your email" onchange={handleInput} id="email" />
                <Input type="password" placeholder="Your password" onchange={handleInput} id="password" />

                <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80 uppercase">{loading ? 'loading' : 'Sign in'}</button>

            </form>

            {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}

            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to="/sign-up" className="text-blue-700"> Sign up</Link>
            </div>
        </div>
    )
}