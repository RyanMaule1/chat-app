import React, { useState } from 'react'
import useUniversalContext from '../Hooks/useUniversalContext'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useSocketContext } from '../Context/socketContext';


const Footer = () => {

  const {socket} = useSocketContext()
 

  const [text, setText] = useState('')

  const {dispatch, currentChat} = useUniversalContext()

  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '' || currentChat === undefined || !currentChat) {
      return
    }

    const res = await fetch(`http://localhost:5000/api/messages/${currentChat}`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text, sender_id: user.user._id})
    })

    const json = await res.json()

    if (!res.ok) {
      console.log(json.error)
    }

    if (res.ok) {
      dispatch({type: 'ADD_MESSAGE', payload: json})
      setText('')
      socket.emit('sendMsg', json)

    }

  }


  return (
    <div className='relative'>
      <footer className="bg-white dark:bg-gray-900">
        <div className="container flex  items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Type Messages Here" className="flex bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
          <button onClick={(e)=>handleSubmit(e)} className=" flex justify-end items-center px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ">Send</button>
        </div>
      </footer>
    </div>
  )
}

export default Footer