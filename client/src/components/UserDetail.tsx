const UserDetail = () => {
    return (
        <div className="mx-5 sm:mx-20 my-10">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold sm:text-4xl mb-1 text-gray-800 text-center">Personal info</h2>
                <p className="text-gray-800 text-center">Basic info, like your name and photo</p>
            </div>

            {/* User details */}
            <div>
                {/* header */}
                <div className="flex items-center gap-x-5">
                    <div className="">
                        <p className="text-2xl text-gray-900">Profile</p>
                        <p className="text-gray-800">Some info may be visible to other people</p>
                    </div>
                    <button className="text-gray-800 border border-[#828282] px-6 py-1 rounded-xl h-[fit-content]">Edit</button>
                </div>

                {/* photo */}
                <div>

                </div>
            </div>

        </div>
    )
}
export default UserDetail