import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <Link to = '/login' className='border-0 bg-amber-400 text-2xl font-bold rounded-2xl p-3 mx-4 text-black hover:bg-amber-500'>
        Login</Link>
        <Link to = '/register' className='border-0 bg-green-400 text-2xl font-bold rounded-2xl p-3 text-black hover:bg-green-500'>
        Register</Link>
    </div>
  )
}

export default Home