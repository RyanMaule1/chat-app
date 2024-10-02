import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'
import useUniversalContext from '../Hooks/useUniversalContext'
import useFormsContext from '../Hooks/useFormsContext'

const Chat = ({chat}) => {

  const [name, setName] = useState(chat.name)

  const { members} = chat

  const {user} = useAuthContext()

  const {contacts, currentChat, dispatch} = useUniversalContext()

  const {contactsForm} = useFormsContext()
    useEffect(() => {
      if (!name || name === '') {
        // return 'Untitled Chat'
        const filteredMembers = members.filter(mem => {
          return mem.phone !== user.user.phone
        })
  
        const defaultName = filteredMembers.map(mem => {
          //for each member in the chat check if the
          for (let i = 0; i < contacts.length; i++) {
            if (mem.phone === contacts[i].phone) {
              return contacts[i].name
            }
          }
          return mem.phone
        })
  
          setName(defaultName.join(","))
      }
    },[contactsForm, currentChat])
    
 
  return (
    <button onClick={()=>dispatch({type: "SET_CURRENT_CHAT", payload:chat._id})} className={`relative flex items-center px-4 py-2 ${chat._id === currentChat ? "text-white bg-blue-600":"text-black bg-gray-300"} rounded-md dark:bg-gray-800 dark:text-gray-200`} >
        <span className="mx-4 font-medium">{name}</span>
    </button>
  )
}

export default Chat