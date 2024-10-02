import { useContext } from 'react'
import { FormsContext } from '../Context/formsContext'

const useFormsContext = () => {
    const context = useContext(FormsContext)

    if (!context) {
        throw Error('Must be wrapped in context provider to be used')
    }
    
    return context
}

export default useFormsContext