import { Link, useNavigate, useParams } from "react-router-dom"
import Back from "../assets/Back"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import api from "./AxiosBase"
import { useAuthContext } from "../hooks/useAuthContext"
import Loading from "./Loading"

const DetailsForm = () => {
    const [loading, setLoading] = useState(false)
    const [imgUpload, setImgUpload] = useState(false)
    const { id } = useParams()
    // navigation
    const navigate = useNavigate()

    const { user } = useAuthContext()
    // context states

    // form states
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState()
    const [_id, set_Id] = useState()
    const [url, setUrl] = useState("")



    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.post('/api/updateuser', { name, bio, phone, _id, url })
            navigate(`/userinfo/${_id}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    // form change handlers

    const handleNameChange = (e: { target: { value: string } }) => {
        setName(e.target.value.replace(/\s+/g, ' '))
    }

    const handleBioChange = (e: { target: { value: string } }) => {
        setBio(e.target.value.replace(/\s+/g, ' '))
    }

    const handlePhoneChange = (e: any) => {
        setPhone(e.target.value.replace(/\s+/g, ' '))
    }



    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64: unknown) {
        setImgUpload(true);
        api
            .post("/api/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(res.data);
            })
            .then(() => setImgUpload(false))
            .catch(console.log);
    }

    const uploadImage = async (event: { target: { files: any; }; }) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    }

    const fetchUser = async () => {

        try {
            const response = await api.post(`/api/userdetail`, { id })
            setName(response.data.user?.name)
            setBio(response.data.user?.bio)
            setPhone(response.data.user?.phone)
            setUrl(response.data.user?.url)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        set_Id(user.userId)
        try {
            fetchUser()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="overflow-hidden">
            <Header />
            {loading && <div className="h-[70vh] items-center flex justify-center">
                <Loading />
            </div>}

            {!loading && <div className="pt-20 max-w-5xl lg:mx-auto mx-5 ">
                <div className="text-blue-500 flex items-center gap-x-2 mb-4">
                    <Back />
                    <Link to={`/dashboard/${id}`} className="font-medium">Back</Link>
                </div>

                <div className="dark:text-white sm:border rounded-lg sm:px-10 sm:py-5">
                    <h2 className="text-2xl">Change Info</h2>
                    <p className="text-gray-700 dark:text-white">Changes will be reflected to every services</p>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="mt-6 flex items-center gap-3">
                            <div>
                                {imgUpload ? <Loading /> : <img src={url ? url : ''} className={url ? "h-20 w-20 rounded-xl" : 'bg-blue-500 h-20 w-20 rounded-xl'} alt="profile img" />}
                            </div>

                            <label
                                htmlFor="dropzone-file"
                                className="cursor-pointer"
                            >
                                <input
                                    onChange={uploadImage}
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"

                                />
                                Change photo
                            </label>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="name" className="text-gray-700 dark:text-white">Name</label>
                            <input onChange={handleNameChange} value={name} type="text" name="name" id="name" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2 dark:bg-inherit" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="bio" className="text-gray-700 dark:text-white">Bio</label>
                            <textarea value={bio} onChange={handleBioChange} className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2 dark:bg-inherit" name="bio" id="bio" cols={30} rows={3}></textarea>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="phone" className="text-gray-700 dark:text-white">Phone</label>
                            <input value={phone} onChange={handlePhoneChange} type="text" name="phone" id="phone" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2 dark:bg-inherit" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="text-gray-700 dark:text-white">Email</label>
                            <p className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2 dark:bg-inherit">{user.email}</p>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="password" className="text-gray-700 dark:text-white">Password</label>
                            <input disabled={true} value={user.regularPwd} type="password" name="password" id="password" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2 bg-inherit" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-lg mt-6">Save</button>
                    </form>
                </div>
            </div>}
        </div>
    )
}
export default DetailsForm