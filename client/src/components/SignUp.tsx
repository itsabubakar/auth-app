import { useContext, useState } from "react"
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


const SignUp = () => {
    const { theme, setTheme, toggleDarkMode, value } = useContext(ThemeContext)


    return (
        <div className="items-center grid justify-center h-screen dark:bg-[#333333]">
            <div className="py-5 px-5 sm:rounded xs:border">
                <div className="flex justify-between items-center mb-5">
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

                <form>
                    <div className="border-[#BDBDBD] border mb-4 py-2 rounded-lg flex">
                        <label className="mx-3" htmlFor="email"><Email /></label>
                        <input className="w-full outline-none" type="text" placeholder="Email" name="email" />
                    </div>
                    <div className="border-[#BDBDBD] border mb-4 py-2 rounded-lg flex">
                        <label className="mx-2.5" htmlFor="password"><Password /></label>
                        <input className="w-full outline-none" type="text" placeholder="Password" name="password" />
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
                        <p className="text-gray-600 dark:text-white">Already a member?</p>
                        <a className="text-blue-500" href="/">Login</a>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default SignUp