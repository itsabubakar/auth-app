import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "./AxiosBase"
import { useAuthContext } from "../hooks/useAuthContext"

const UserDetail = () => {
    const { id } = useParams()
    const { user } = useAuthContext()


    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')

    const fetchUser = async () => {
        try {
            const response = await api.post(`/api/userdetail`, { id })
            setName(response.data.user.name)
            setBio(response.data.user.bio)
            setPhone(response.data.user.phone)
            setEmail(response.data.user.email)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="py-20">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold sm:text-4xl mb-1 text-gray-800 text-center">Personal info</h2>
                <p className="text-gray-800 text-center">Basic info, like your name and photo</p>
            </div>

            {/* User details */}
            <div className="rounded-lg sm:border sm:mx-20">
                {/* header */}
                <div className="flex items-center justify-between gap-x-5 mx-5 sm:mx-10 h-28">
                    <div className="">
                        <p className="text-2xl text-gray-900">Profile</p>
                        <p className="text-gray-800">Some info may be visible to other people</p>
                    </div>
                    <Link to={`/edit/${id}`} className="text-gray-800 border border-[#828282] px-6 py-1 rounded-xl h-[fit-content]">Edit</Link>
                </div>
                <hr />

                {/* photo */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">PHOTO</p>
                    <img src='' alt="" className="bg-blue-500 w-10 h-10 rounded-lg" />
                </div>
                <hr />

                {/* name */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">NAME</p>
                    <p className="font-semibold">{name}</p>
                </div>
                <hr />

                {/* bio */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">BIO</p>
                    <p className="font-semibold truncate  w-60 sm:w-[400px] text-ellipsis text-end">{bio}</p>
                </div>
                <hr />

                {/* phone */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">Phone</p>
                    <p className="font-semibold text-end">{phone}</p>
                </div>
                <hr />

                {/* email */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">EMAIL</p>
                    <p className="font-semibold">{email}</p>
                </div>
                <hr />

                {/* password */}
                <div className="mx-5 sm:mx-10 h-24 flex justify-between items-center">
                    <p className="text-gray-700">PASSWORD</p>
                    <input type="password" value={user.regularPwd} readOnly={true} className="text-end outline-none" />
                </div>
                <hr className="sm:hidden" />
            </div>

        </div>
    )
}
export default UserDetail