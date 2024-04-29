import { Link } from 'react-router-dom';
import Input from '../components/Input';

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-5 '>Sign up</h1>

      <form className='flex flex-col gap-4'>
        <Input type="text" placeholder='Username' />
        <Input type="email" placeholder='Email' />
        <Input type="password" placeholder='Password' />

        <button className='p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 disabled:opacity-80 uppercase'>Sign Up</button>

        <button className='p-3 rounded-lg bg-red-700 text-white hover:opacity-95 disabled:opacity-80 uppercase'>Continue With Google</button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700"> Sign in</Link>
      </div>
    </div>
  )
}
