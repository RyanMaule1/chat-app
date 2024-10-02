import  { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const {dispatch} = useAuthContext()
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (phone, password) => {
        setError(null)

        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({phone, password})
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }

        if (res.ok) {
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            navigate("/chats")
        }
    }
    return {login, error, setError}
}

export default useLogin