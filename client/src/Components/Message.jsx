import React, { useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'

const Message = ({msg}) => {
    //need to render these in the chatContainer

    const {user} = useAuthContext()
    
  return (
    <button className={`flex ${msg.sender_id === user.user._id ? "self-end text-white bg-blue-600" : "self-start text-black bg-gray-300"} w-fit px-6 py-2 font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80`}>
        <div className="text-left rtl:text-right">
            <h1 className={`text-sm font-medium ${msg.sender_id === user.user._id ? "text-white": "text-black"} capitalize`}>{msg.text}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400"></p>
        </div>
    </button>
  )
}

export default Message