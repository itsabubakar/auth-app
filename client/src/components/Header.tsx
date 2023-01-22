import { useState } from "react"
import DevChallenge from "../assets/DevChallenge"
import Drop from "../assets/Drop"
import Profile from "../assets/Profile"
import LogOut from "../assets/LogOut"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"


const Header = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const [drop, setDrop] = useState(false)
    const handleClick = () => {
        setDrop(!drop)
    }

    const Logout = () => {
        logout()
    }

    return (
        <header className="flex justify-between px-5 py-5 items-center sm:px-20 relative w-full">
            <DevChallenge />

            <button className="flex gap-x-2.5 items-center" onClick={handleClick}>
                <img src="" alt="" className="w-8 h-8 rounded-lg bg-blue-500" />
                <p className="font-semibold hidden xs:block">{user.email}</p>
                <div className={`${drop && 'rotate-180'} transition mt-1 hidden xs:block`}><Drop /></div>
            </button>
            <nav className={`bg-white ease-in duration-150 absolute top-[70px]  ${drop ? 'right-0' : '-right-[200%]'} border mx-5 sm:mx-20 rounded-lg shadow-lg py-5`}>
                <ul className="flex flex-col gap-y-3">
                    <li className="flex gap-x-2 bg-[#F2F2F2] py-2 mx-2 px-4 rounded-lg text-gray-900"><Profile /> My Profile</li>
                    <hr className="mx-2" />
                    <button onClick={Logout} className="flex gap-x-2 py-2 mx-2 px-4 rounded-lg text-red-500"><LogOut /> Logout</button>
                </ul>
            </nav>
        </header>
    )
}
export default Header