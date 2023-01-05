import { ReactNode, createContext, useEffect, useState } from "react"

type Context = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>,
    toggleDarkMode: () => void,
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContext = {
    theme: '',
    setTheme: () => { },
    toggleDarkMode: () => { },
    value: true,
    setValue: () => { }
}

export const ThemeContext = createContext<Context>(defaultContext)


const Theme = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('')
    const [value, setValue] = useState(true)

    const setDefaultTheme = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.theme = 'dark'
            setValue(true)
            document.documentElement.classList.add('dark')
        } else {
            setValue(false)
            document.documentElement.classList.remove('dark')
        }
    }

    const toggleDarkMode = () => {
        if (localStorage.theme == 'dark') {
            setTheme('light')
            localStorage.theme = 'light'

        } else {
            setTheme('dark')
            localStorage.theme = 'dark'
        }
    }

    useEffect(() => {
        setDefaultTheme()
    }, [theme])



    return (
        <ThemeContext.Provider value={{
            theme, setTheme, toggleDarkMode, value, setValue
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default Theme