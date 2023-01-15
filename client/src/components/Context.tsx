import { ReactNode, createContext, useState } from "react"

type Context = {
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>,
    email: string,
    setUserEmail: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setUserPassword: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    bio: string,
    setBio: React.Dispatch<React.SetStateAction<string>>,
    phone: number,
    setPhone: React.Dispatch<React.SetStateAction<number>>,
}

const defaultContext = {
    id: '',
    setId: () => { },
    email: '',
    setUserEmail: () => { },
    password: '',
    setUserPassword: () => { },
    name: '',
    setName: () => { },
    bio: '',
    setBio: () => { },
    phone: 0,
    setPhone: () => { },
}

export const UserContext = createContext<Context>(defaultContext)


const Context = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState(0)
    return (
        <UserContext.Provider value={{
            name,
            bio,
            phone,
            id,
            email,
            setUserEmail,
            password,
            setUserPassword,
            setName,
            setBio,
            setPhone,
            setId
        }}>
            {children}
        </UserContext.Provider>
    )
}
export default Context