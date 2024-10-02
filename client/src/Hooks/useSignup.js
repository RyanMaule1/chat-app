import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {

    const [error, setError] = useState(null)

    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const signup = async (phone, password, checkPassword) => {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({phone, password, checkPassword})
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }

        if (res.ok) {
            setError(null)
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            navigate("/chats")
        }
    }

    return {signup, error, setError}
}

