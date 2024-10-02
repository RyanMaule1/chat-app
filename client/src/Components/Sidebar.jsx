import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import useFormsContext from '../Hooks/useFormsContext'
import useUniversalContext from '../Hooks/useUniversalContext'
import ContactCard from "./ContactCard"
import useGetContacts from '../Hooks/useGetContacts'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useGetChats } from '../Hooks/useGetChats'
import Chat from './Chat'

const Sidebar = () => {

    

    const [showContacts, setShowContacts] = useState(false)
    const {dispatch} = useFormsContext()
   
    //Get chats and contacts for display
    const {contacts, chats} = useUniversalContext()


    const {getContacts} = useGetContacts()
    const {getChats} = useGetChats()

  const {user} = useAuthContext()

  //get contacts everytime the contactsForm is submitted
  useEffect(() => {
      getContacts(user.user._id)

      getChats(user.user._id)
  },[showContacts])

    
    const [chatFilter, setChatFilter] = useState('')

    const handleChange = (e) => {
        setChatFilter(e.target.value)
       
    }
   
     return (
        showContacts ?  
        <div className="flex flex-col gap-2 w-96 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className='p-2 flex justify-center items-center'>
            <FontAwesomeIcon onClick={()=>setShowContacts(!showContacts)} icon={faArrowLeft} className='justify-start cursor-pointer'/>
            <h1 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Contacts</h1>
            </div>
        <button onClick={()=>dispatch({type: 'SWITCH_CHAT_STATE'})} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" >New Chat</button>
        

        <div className="mt-8 space-y-4">
            {contacts.map(contact => {
                return <ContactCard 
                    key={contact._id}
                    contact={contact}
                />
            })}
        </div>
    </div> : 
    <div className='relative'>
                <aside className="flex flex-col gap-2 w-96 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                    <button onClick={()=>dispatch({type: 'SWITCH_CONTACTS_STATE'})} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Add a contact</button>
                    <div className="relative mt-6 flex justify-between align-middle">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 justify-stretch">
                
                            {/* <input value={chatFilter} onChange={(e)=>handleChange(e)} type="text"  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search for a chat" /> */}
                            <button onClick={()=>setShowContacts(!showContacts)} className="ml-6 px-6 py-2 font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-gray-300 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Start a new chat<FontAwesomeIcon  className='text-2xl  w-24 cursor-pointer' icon={faEnvelope} />
                            </button>
                         </span>

                
            </div>


            <div className="flex flex-col gap-2 justify-between flex-1 mt-6">
                <nav className='flex flex-col gap-2  flex-1 mt-6'>
                    {chats.map(chat => {
                        return <Chat 
                        key={chat._id} 
                        chat={chat} 
                        />
                    })}
                 
                </nav>

               
            </div> 

             
        </aside>
    </div>
    ) 
}

export default Sidebar