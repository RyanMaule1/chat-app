import { createContext, useReducer } from "react";


export const FormsContext = createContext()

const formsReducer = (prevState, action) => {
    switch (action.type) {
        case 'SWITCH_CHAT_STATE':
            return {
                chatsForm: !prevState.chatsForm,
                contactsForm: prevState.contactsForm
            }
        case 'SWITCH_CONTACTS_STATE':
            return {
                chatsForm: prevState.chatsForm,
                contactsForm: !prevState.contactsForm
            }
        default:
            return {
                prevState
            }
    }
}

export const FormsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(formsReducer, {
        chatsForm: false,
        contactsForm: false
    })

    return (
        <FormsContext.Provider value={{...state, dispatch}}>
            {children}
        </FormsContext.Provider>
    )
}