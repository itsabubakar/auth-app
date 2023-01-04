import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const SignUp = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleDarkMode = () => {
        if (theme == 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <div className="items-center grid justify-center h-screen dark:bg-slate-400">
            <div className="w-[300px] rounded border py-5 px-5">
                <p>{theme}</p>
                <button onClick={toggleDarkMode} className="text-blue-400 text-lg hover:text-xl">Toggle mode</button>
            </div>
        </div>
    )
}
export default SignUp