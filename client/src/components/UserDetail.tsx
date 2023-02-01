import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "./AxiosBase"
import { useAuthContext } from "../hooks/useAuthContext"
import Switch from "./Switch"
import { ThemeContext } from "../context/ThemeContext"

const UserDetail = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const { toggleDarkMode, value } = useContext(ThemeContext)


    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')

    const fetchUser = async () => {
        try {
            const response = await api.post(`/api/userdetail`, { id })
            setName(response.data.user.name)
            setBio(response.data.user.bio)
            setPhone(response.data.user.phone)
            setEmail(response.data.user.email)
            setUrl(response.data.user?.url)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="py-20 ">
            <div className="mb-8 flex justify-center gap-2 ">
                <div>
                    <h2 className="text-2xl font-semibold sm:text-4xl mb-1 text-gray-800 text-center dark:text-white">Personal info</h2>
                    <p className="text-gray-800 text-center dark:text-white">Basic info, like your name and photo</p>
                </div>
                <Switch
                    isOn={value}
                    handleSwitch={toggleDarkMode}
                />
            </div>

            {/* User details */}
            <div className="rounded-lg sm:border sm:mx-20 ">
                {/* header */}
                <div className="flex items-center justify-between gap-x-5 mx-5 sm:mx-10 h-28">
                    <div className="">
                        <p className="text-2xl text-gray-900 dark:text-white">Profile</p>
                        <p className="text-gray-800 dark:text-white">Some info may be visible to other people</p>
                    </div>
                    <Link to={`/edit/${id}`} className="text-gray-800 border border-[#828282] px-6 py-1 rounded-xl h-[fit-content] dark:text-white">Edit</Link>
                </div>
                <hr />

                {/* photo */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">PHOTO</p>
                    <img src={url ? url : user.url ? user.url : ''} alt="" className="bg-blue-500 w-10 h-10 rounded-lg" />
                </div>
                <hr />

                {/* name */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">NAME</p>
                    <p className="font-semibold dark:text-white">{name}</p>
                </div>
                <hr />

                {/* bio */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">BIO</p>
                    <p className="font-semibold truncate  w-60 sm:w-[400px] text-ellipsis text-end dark:text-white">{bio}</p>
                </div>
                <hr />

                {/* phone */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">Phone</p>
                    <p className="font-semibold text-end dark:text-white">{phone}</p>
                </div>
                <hr />

                {/* email */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">EMAIL</p>
                    <p className="font-semibold">{email}</p>
                </div>
                <hr />

                {/* password */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700 dark:text-white">PASSWORD</p>
                    <input type="password" value={user.regularPwd ? user.regularPwd : '........'} readOnly={true} className="text-end outline-none bg-inherit" />
                </div>
                <hr className="sm:hidden" />
            </div>

        </div>
    )
}
export default UserDetail