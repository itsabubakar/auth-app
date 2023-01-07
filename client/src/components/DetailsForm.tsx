import { Link } from "react-router-dom"
import Back from "../assets/Back"
import Header from "./Header"

const DetailsForm = () => {
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log(e)
    }

    const photoChange = () => {
        console.log('foo')
    }
    return (
        <div className="overflow-hidden">
            <Header />
            <div className="pt-20 max-w-5xl lg:mx-auto mx-5 ">
                <div className="text-blue-500 flex items-center gap-x-2 mb-4">
                    <Back />
                    <Link to="/" className="font-medium">Back</Link>
                </div>

                <div className="sm:border rounded-lg sm:px-10 sm:py-5">
                    <h2 className="text-2xl">Change Info</h2>
                    <p className="text-gray-700">Changes will be reflected to every services</p>
                    <div className="flex items-center gap-x-6 mt-10">
                        <img src="" alt="" className="w-16 bg-blue-500 h-16 rounded-lg" />
                        <button onClick={photoChange} className="text-gray-800">CHANGE PHOTO</button>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="mt-6">
                            <label htmlFor="name" className="text-gray-700">Name</label>
                            <input type="text" name="name" id="name" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="bio" className="text-gray-700">Bio</label>
                            <textarea className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2" name="bio" id="bio" cols={30} rows={3}></textarea>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="phone" className="text-gray-700">Phone</label>
                            <input type="text" name="phone" id="phone" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="text-gray-700">Email</label>
                            <input type="text" name="email" id="email" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="password" className="text-gray-700">Password</label>
                            <input type="text" name="password" id="password" className="mt-2 outline-none border border-[#828282] w-full rounded-lg px-2 py-2" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-lg mt-6">Save</button>
                    </form>
                </div>



            </div>
        </div>
    )
}
export default DetailsForm