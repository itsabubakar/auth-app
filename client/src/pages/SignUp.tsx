import { SetStateAction, useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import DevChallenge from "../assets/DevChallenge"
import Email from "../assets/Email"
import Password from "../assets/Password"
import Switch from "../components/Switch"
import DevChallengesLight from "../assets/DevChallengesLight"
import Eye from "../assets/Eye"
import EyeHidden from "../assets/EyeHidden"
import { Link, } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"
import Loading from "../components/Loading"


const SignUp = () => {

    const { signup } = useSignup()
    const [loading, setLoading] = useState(false)


    const { toggleDarkMode, value } = useContext(ThemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pwdVisibility, setPwdVisibility] = useState('password')

    // error states
    const [emailErr, setEmailErr] = useState(false)
    const [emailExist, setEmailExist] = useState('')
    const [upperCaseErr, setUpperCaseErr] = useState(false)
    const [lowerCaseErr, setLowerCaseErr] = useState(false)
    const [charsErr, setCharsErr] = useState(false)

    // states from context

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const validEmail = isEmail(email)
        const hasUpperCase = containsUpperCase(password)
        const hasLowerCase = containsLowerCase(password)
        const hasSixOrMoreChars = sixOrMoreChars(password)


        if (!validEmail) {
            setEmailErr(true)
        }

        if (!hasUpperCase) {
            setUpperCaseErr(true)

        }
        if (!hasLowerCase) {
            setLowerCaseErr(true)

        }
        if (!hasSixOrMoreChars) {
            setCharsErr(true)
        }

        if (validEmail && hasUpperCase && hasLowerCase && hasSixOrMoreChars) {
            try {
                setLoading(true)
                await signup(email, password)
            } catch (error: any) {
                setLoading(false)
                setEmailExist(error.response.data.email)
            }
        }
    }

    const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
        setEmail(e.target.value)
        setEmailErr(false)
        setEmailExist('')
    }

    const handlePasswordChange = (e: { target: { value: string } }) => {
        setPassword(e.target.value.trim())
        setCharsErr(false)
        setLowerCaseErr(false)
        setUpperCaseErr(false)
    }

    const handleVisibility = () => {
        if (pwdVisibility === 'password') {
            setPwdVisibility('text')
            return
        }
        setPwdVisibility('password')
    }

    const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

    // password validators
    // const isValidPwd = (password: string) => /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z]).{6,}$/.test(password) 
    const containsUpperCase = (password: string) => /^(?=[^A-Z]*[A-Z])/.test(password)
    const containsLowerCase = (password: string) => /^(?=[^a-z]*[a-z])/.test(password)
    const sixOrMoreChars = (password: string) => {
        if (password.length >= 6) { return true }
        else { return false }
    }

    return (
        <div className="items-center grid justify-center h-screen">
            {loading && <Loading />}
            {!loading && <div className="py-5 px-5 xs:border border-[#BDBDBD] xs:mx-4 xs:px-8 max-w-sm rounded-xl">
                <div className="flex justify-between items-center mb-8">
                    {value ? <DevChallengesLight /> : <DevChallenge />}

                    <Switch
                        isOn={value}
                        handleSwitch={toggleDarkMode}
                    />
                </div>
                <div>
                    <p className="mb-4 font-semibold text-lg text-slate-800 dark:text-white">Join thousands of learners from around the world</p>
                    <p className="mb-4 text-slate-700 dark:text-white">Master web development by making real-life projects. There are multiple paths for you to choose</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <span>{emailErr && <p className="text-center mb-2 text-red-500">Please enter a valid email</p>}</span>
                    <span>{emailExist && <p className="text-center mb-2 text-red-500">{emailExist}</p>}</span>
                    <div className={`${emailErr ? 'border-red-500' : 'border-[#BDBDBD]'} border mb-4 py-2 rounded-lg flex`}>
                        <label className="mx-3" htmlFor="email"><Email /></label>
                        <input value={email} onChange={handleEmailChange} className={`w-full outline-none dark:bg-inherit dark:text-white`} type="text" placeholder="Email" name="email" />
                    </div>

                    <span>{charsErr && <p className=" mb-2 text-red-500 text-sm">Password less than 6 characters</p>}</span>
                    <span>{lowerCaseErr && <p className=" mb-2 text-red-500 text-sm">Password must contain atleast one lowercase</p>}</span>
                    <span>{upperCaseErr && <p className=" mb-2 text-red-500 text-sm">Password must contain atleast one uppercase</p>}</span>
                    <div className={`${charsErr || upperCaseErr || lowerCaseErr ? 'border-red-500' : 'border-[#BDBDBD]'} border mb-4 py-2 rounded-lg flex`}>
                        <label className="mx-2.5" htmlFor="password"><Password /></label>
                        <input value={password} onChange={handlePasswordChange} className="w-full outline-none dark:bg-[#333333] dark:text-white" type={pwdVisibility} placeholder="Password" name="password" />
                        <button type="button" onClick={handleVisibility} className="mr-1">{pwdVisibility === 'password' ? <Eye /> : <EyeHidden />}</button>
                    </div>
                    <button className="bg-blue-500 text-white w-full py-1.5 text-base font-semibold rounded-lg" type="submit">Start coding now</button>
                </form>

                <div className="flex flex-col items-center">
                    <div className="flex mt-3">
                        <p className="text-gray-600 dark:text-white">Already a member?</p>
                        <Link className="text-blue-500 ml-1" to="/login">Login</Link>
                    </div>

                </div>

            </div>}
        </div>
    )
}
export default SignUp