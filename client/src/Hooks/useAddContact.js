import  {useState} from 'react'
import useUniversalContext from '../Hooks/useUniversalContext'
import useFormsContext from './useFormsContext'


const useAddContact = () => {  
    //get dispatch to add contact and dispatch to toggle the form
    const {dispatch} = useUniversalContext()
    const {dispatch: formDispatch} = useFormsContext()

    //error handling state
    const [error, setError] = useState(null)


    const addContact = async (phone, name, user_id) => {
        const res = await fetch('http://localhost:5000/api/contacts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({phone, name, user_id})
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }

        if (res.ok) {
            setError(null)
            dispatch({type: 'ADD_CONTACT', payload: json})
            
            formDispatch({type: 'SWITCH_CONTACTS_STATE'})
        }


    }

    return {addContact, error}
}

export default useAddContact