import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useState } from 'react';
import { GoogleAuth } from '../components/GoogleAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  // console.log("formData", formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = {
        method: "POST",
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
        
      }

      const res = await fetch('http://localhost:5000/api/auth/signup', payload)
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setError(data.message);
        return
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      // console.log("data: ", data)

    }
    catch (err) {
      setLoading(false);
      setError(err.message);
      console.log("error", err)
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-5 '>Sign up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input type="text" placeholder="Username" id="username" onChange={handleChange} />
        <Input type="email" placeholder="Email" id="email" onChange={handleChange} />
        <Input type="password" placeholder="Password" id="password" onChange={handleChange} />

        <button disabled={loading} className='p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 disabled:opacity-80 uppercase' type='submit'>{loading ? 'LOADING...' : 'Sign Up'}</button>


        <GoogleAuth />
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700"> Sign in</Link>
      </div>
    </div>
  )
}
