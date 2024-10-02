import  { useContext } from 'react'
import { AuthContext } from '../Context/authContext'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('Must be wrapped in context provider to be used')
  }

  return context
}

