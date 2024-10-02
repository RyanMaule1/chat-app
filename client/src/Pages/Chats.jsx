import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import MessageArea from '../Components/MessageArea'
import useFormsContext from '../Hooks/useFormsContext'
import AddChatForm from '../Components/AddChatForm'
import AddContactForm from '../Components/AddContactForm'


const Chats = () => {

  //context for rendering forms
  const {chatsForm, contactsForm} = useFormsContext()
  

   //current chat, will set most recent chat to default
   
  

  return (
  
      <div className='flex relative'>
        <Sidebar className='absolute z-0'  />
        <MessageArea className='absolute z-0'  />
        {chatsForm && <AddChatForm/>}
        {contactsForm && <AddContactForm/>}
      </div>

    
  )
}

export default Chats