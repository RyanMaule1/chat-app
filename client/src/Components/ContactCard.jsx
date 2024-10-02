import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import useFormsContext from '../Hooks/useFormsContext'
const ContactCard = ({contact, setChatMembers}) => {

  //only need to pass these to the chatMember array
  const {name, phone} = contact
  
  const [inChat, setInChat] = useState(false)

  //Needed for the togglec ontact function
  const {chatsForm} = useFormsContext()
  

  //will toggle adding contact to group
  const toggleContact = (e) => {
    e.preventDefault()

    //only interact with contacts when using the chat from to select them
    if (!chatsForm) {
      return
    }

    if (!inChat) {
      setChatMembers(prevMembers => [...prevMembers, {name, phone}])
      setInChat(!inChat)
    } else if (inChat) {
      setChatMembers(prevMembers => prevMembers.filter(mem => {
        return mem.phone !== contact.phone
      }))
      setInChat(!inChat)
    }

    
    

  }

  return (
    <button onClick={(e)=>toggleContact(e)} className="flex items-center justify-between w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
            

            <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{contact.name}</h1>

                <p className="text-xs text-gray-500 dark:text-gray-400"></p>
            </div>
            {inChat && <FontAwesomeIcon className='text-blue-600' icon={faCheck} />}
    </button>
  )
}

export default ContactCard