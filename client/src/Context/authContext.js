import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext() 

export const authReducer = (prevState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT': 
            return {
                user: null
            }
        default:
            return {
                user: prevState
            }
    }
}



export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
       const user = JSON.parse(localStorage.getItem('user'))
       if (user) {
            dispatch({type: 'LOGIN', payload: user})
       }
    }, [])

   // console.log('AuthContext', state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
