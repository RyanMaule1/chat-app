import { useState } from "react"
import useUniversalContext from "./useUniversalContext"

export const useAddChat = () => {
    const [error, setError] = useState(null)
    const {dispatch} = useUniversalContext()

    const addChat = async (admin, members, name) => {

        if (members.length < 2) {
            return
        }
        
        const res = await fetch('http://localhost:5000/api/chats', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({admin, members, name})
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }

        if (res.ok) {
            dispatch({type: 'ADD_CHAT', payload: json})
            setError(null)
            console.log('working')
        }
    }

    return {error, addChat}
}

//we will be sending over a name if one is given, the members, the user_id