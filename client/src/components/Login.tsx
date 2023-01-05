import { SetStateAction, useContext, useState } from "react"
import { ThemeContext } from "./ThemeContext"
import DevChallenge from "../assets/DevChallenge"
import Google from "../assets/Google"
import Email from "../assets/Email"
import Password from "../assets/Password"
import Switch from "./Switch"
import Facebook from "../assets/Facebook"
import Twitter from "../assets/Twitter"
import Github from "../assets/Github"
import DevChallengesLight from "../assets/DevChallengesLight"
import Eye from "../assets/Eye"
import EyeHidden from "../assets/EyeHidden"
import { Link } from "react-router-dom"


const Login = () => {
    const { toggleDarkMode, value } = useContext(ThemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pwdVisibility, setPwdVisibility] = useState('password')
    const [emailErr, setEmailErr] = useState(false)
    const [pwdErr, setPwdErr] = useState(false)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const validEmail = isEmail(email)
        const validPwd = isValidPwd(password)

        if (validEmail && validPwd) {
            console.log(email, password)
            return
        }
    }

    const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: { target: { value: string } }) => {
        setPassword(e.target.value.trim())
    }

    const handleVisibility = () => {
        if (pwdVisibility === 'password') {
            setPwdVisibility('text')
            return
        }
        setPwdVisibility('password')
    }

    const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    const isValidPwd = (password: string) => /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z]).{6,}$/.test(password)


    return (
        <div className="items-center grid justify-center h-screen dark:bg-[#333333]">
            <div className="py-5 px-5 xs:border border-[#BDBDBD] xs:mx-4 xs:px-8 max-w-md rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    {value ? <DevChallengesLight /> : <DevChallenge />}

                    <Switch
                        isOn={value}
                        handleSwitch={toggleDarkMode}
                    />
                </div>
                <div>
                    <p className="mb-8 font-semibold text-lg text-slate-800 dark:text-white">Login</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="border-[#BDBDBD] border mb-4 py-2 rounded-lg flex">
                        <label className="mx-3" htmlFor="email"><Email /></label>
                        <input value={email} onChange={handleEmailChange} className="w-full outline-none dark:bg-inherit dark:text-white" type="text" placeholder="Email" name="email" />
                    </div>

                    <div className="border-[#BDBDBD] border mb-4 py-2 rounded-lg flex">
                        <span>{pwdErr && <p></p>}</span>
                        <label className="mx-2.5" htmlFor="password"><Password /></label>
                        <input value={password} onChange={handlePasswordChange} className="w-full outline-none dark:bg-[#333333] dark:text-white" type={pwdVisibility} placeholder="Password" name="password" />
                        <button onClick={handleVisibility} className="mr-1">{pwdVisibility === 'password' ? <Eye /> : <EyeHidden />}</button>
                    </div>
                    <button className="bg-blue-500 text-white w-full py-1.5 text-base font-semibold rounded-lg" type="submit">Start coding now</button>
                </form>

                <div className="flex flex-col items-center">
                    <p className="my-6 text-gray-600 dark:text-white">or continue with these social profile</p>

                    <div className="flex w-full justify-between max-w-[250px]">
                        <button className=""><Google /></button>
                        <button className=""><Facebook /></button>
                        <button className=""><Twitter /></button>
                        <button className=""><Github /></button>
                    </div>
                    <div className="flex mt-3">
                        <p className="text-gray-600 dark:text-white">Don't have an account yet?</p>
                        <Link className="text-blue-500 ml-1" to="/">Register</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Login