import { ReactNode, createContext, useEffect, useReducer } from "react"

type Context = {
    user: {
        email: string,
        regularPwd?: string,
        url?: string
    },
    dispatch: React.Dispatch<{
        type: any;
        payload: any;
    }>
}

const defaultContext = {
    user: {
        email: '',
        regularPwd: ''
    },
    dispatch: () => { }
}

export const authReducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: '' }
        default:
            return state
    }
}

export const AuthContext = createContext<Context>(defaultContext)

const Auth = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: {
            email: ''
        }
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }

    }, [])

    console.log('auth context state:', state)

    return (
        <AuthContext.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default Auth

