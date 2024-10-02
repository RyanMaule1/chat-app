import  {useState} from 'react'
import useUniversalContext from '../Hooks/useUniversalContext'



const useGetContacts = () => {  
    //get dispatch to add contact and dispatch to toggle the form
    const {dispatch} = useUniversalContext()
    
    //error handling state
    const [error, setError] = useState(null)



    const getContacts = async (user_id) => {
        const res = await fetch(`http://localhost:5000/api/contacts/${user_id}`)

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }

        if (res.ok) {
            setError(null)
            dispatch({type: 'GET_CONTACTS', payload: json})
        }


    }

    return {getContacts, error}
}

export default useGetContacts