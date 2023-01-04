import { ReactNode, createContext, useState } from "react"

type User = {
    name: string,
    email: string,
    setName: React.Dispatch<React.SetStateAction<string>>
}

const defaultUser = {
    name: '',
    email: '',
    setName: () => { }
}

export const UserContext = createContext<User>(defaultUser)


const Context = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    return (
        <UserContext.Provider value={{
            name,
            email,
            setName,
        }}>
            {children}
        </UserContext.Provider>
    )
}
export default Context