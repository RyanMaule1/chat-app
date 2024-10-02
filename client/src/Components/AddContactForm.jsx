import React, { useState } from 'react'
import useFormsContext from '../Hooks/useFormsContext'
import useAddContact from '../Hooks/useAddContact'
import { useAuthContext } from '../Hooks/useAuthContext'

const AddContactForm = () => {

    //state for inputs and error message
    const [phone,setPhone] = useState("")
    const [name, setName] = useState("")

    //context for getting user
    const {user} = useAuthContext()
  

    //context for displaying form
    const {dispatch} = useFormsContext()

    //hook for adding contact 
    const {addContact, error} = useAddContact()

    const handleSubmit = async () => {

        await addContact(phone, name, user.user._id)
    }

  return (
    <div  className="absolute z-10 left-0 right-0 bg-opacity-25 backdrop-blur-sm  flex justify-center">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                        <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                           Add a contact
                        </h3>

                        <form className="mt-4" action="#">
                           

                            <label className="block mt-3" htmlFor="phone"> 
                                <input value={phone} onChange={(e)=>setPhone(e.target.value)} required={true} type="tel" name="phone"  placeholder="Phone Number"  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            </label>

                            <label className="block mt-3" htmlFor="Display Name">
                                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="Display Name"  placeholder="Display Name" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            </label>
                            


                            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                <button onClick={()=>dispatch({type: 'SWITCH_CONTACTS_STATE'})} type="button" className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>

                                <button onClick={handleSubmit} type="button" className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                    Add contact
                                </button>
                            </div>
                            
                            {error && <p className='text-red-700'>{error}</p>}
                        </form>  
                    </div>
            </div>
        </div>
  )
}

export default AddContactForm