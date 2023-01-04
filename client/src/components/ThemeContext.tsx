import { ReactNode, createContext, useEffect, useState } from "react"

type Context = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const defaultContext = {
    theme: '',
    setTheme: () => { }
}

export const ThemeContext = createContext<Context>(defaultContext)


const Theme = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('dark')
    localStorage.theme = theme
    const setDefaultTheme = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        setDefaultTheme()
    }, [theme])

    return (
        <ThemeContext.Provider value={{
            theme, setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default Theme