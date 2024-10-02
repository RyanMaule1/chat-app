import React from 'react'
import useLogout from '../Hooks/useLogout'

const Navbar = () => {

  const {logout} = useLogout()
  
  const handleSubmit = () => {
     logout()
  }

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800 w-full ">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-end md:items-center ">
            <div className="flex justify-end">
              <button onClick={handleSubmit} className=" flex justify-end  px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ">
                Log Out
              </button>
            </div>  
        </div>
    </nav>
  )
}

export default Navbar