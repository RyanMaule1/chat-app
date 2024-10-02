import  { useContext } from 'react'
import { MessagingContext } from '../Context/universalMessagingContext'

const useUniversalContext = () => {
  const context = useContext(MessagingContext)

  if (!context) {
    throw Error('Must be wrapped in context provider to be used')
  }

  return context
}

export default useUniversalContext