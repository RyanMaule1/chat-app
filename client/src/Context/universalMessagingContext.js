import { useReducer, createContext } from "react"


export const MessagingContext = createContext()

export const universalReducer = (state, action) => {
    switch(action.type) {
        case 'GET_CONTACTS': 
            return {
                ...state,
                contacts: [...action.payload]
            }
        case 'ADD_CONTACTS':
            return {
                ...state,
                contacts: [action.payload,...state.contacts].sort((a,b) => a.name - b.name)
            }
        case 'ADD_CHAT': 
            return {
                ...state,
                chats: [...state.chats, action.payload]
            } 
        case 'GET_CHATS':
            return {
               ...state,
               chats: [...action.payload]
            }  
        case 'ADD_MESSAGE': 
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case 'GET_MESSAGES':
            return {
                ...state, 
                messages: [...action.payload]
            }
        case 'SET_CURRENT_CHAT': 
            return {
                ...state,
                currentChat: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export const MessagingContextProvider = ({children}) => {


    const [state, dispatch] = useReducer(universalReducer, {
        chats: [],
        contacts: [],
        messages: [],
        currentChat: null,
        
    })

    return (
       <MessagingContext.Provider value={{...state, dispatch}}>
            {children}
       </MessagingContext.Provider>
    )
}