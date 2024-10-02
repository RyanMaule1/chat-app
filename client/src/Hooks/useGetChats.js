import useUniversalContext from "./useUniversalContext"

export const useGetChats = () => {
    const {dispatch} = useUniversalContext()
    
    const getChats = async (user_id) => {
        const res = await fetch(`http://localhost:5000/api/chats/${user_id}`)

        const json = await res.json()

        if (!res.ok) {
            console.log(json.error)
        }

        if (res.ok) {
            dispatch({type: 'GET_CHATS', payload: json})
        }
    }

    return {getChats}
}