import React, { useEffect, useState } from 'react'
import useUniversalContext from '../Hooks/useUniversalContext'
import Message from './Message'
import { useSocketContext } from '../Context/socketContext'


const ChatContainer = () => {

  const {socket} = useSocketContext()

  

  const {currentChat, dispatch, messages} = useUniversalContext()

  const [showMessages, setShowMessages] = useState(messages)
  
  //in here we will get the messages based on the current chat
  useEffect(() => {
    
    const getMessages = async () => {

      socket.on('showMsg', data => {
        setShowMessages([...showMessages, data])
      })
      
      const res = await fetch(`http://localhost:5000/api/messages/${currentChat}`)
      const json = await res.json()

      if (!res.ok) {
        console.log(json.error)
      }

      if (res.ok) {
        dispatch({type: 'GET_MESSAGES', payload: json})
      }
    }
    getMessages()
  },[currentChat])

 console.log(showMessages)
    
  return (
    <div className='p-10 relative border-1 h-full flex flex-col gap-10'>
        {showMessages.map(msg => {
          return <Message key={msg._id} msg={msg}/>
        })}
    </div>
  )
}

export default ChatContainer

//we only want access to messages that are directly tied to a users chats