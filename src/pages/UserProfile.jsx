import React, { useState, useEffect } from 'react'

import {
    Send,
    MoreHorizontal,
    Clapperboard,
    Menu,
    User
} from "lucide-react";

const UserProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const followingList = storedUser?.followingList || []
   

    const [showPosts, setShowPosts] = useState(false)
    const [showReels, setShowReels] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [hide, setHide] = useState(false)
    const [forms, setForms] = useState([
        {
            name: "",
            username: "",
            pronouns: "",
            bio: "",
            links: "",
        }
    ]);

    const handleChange = (field, value) => {
        setForms(prev =>
            prev.map((f, i) => (i === 0 ? { ...f, [field]: value } : f))
        );
    };

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (!file) return

        // delete/revoke the old preview before creating a new one
        if (preview) {
            URL.revokeObjectURL(preview)
        }

        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    // clean up the preview URL if the component unmounts
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    function handler(e) {
        e.preventDefault()
        console.log("Form data:", forms[0])
        console.log("Image file:", image)
        setHide(false) // close the form after submitting
        // send forms[0] + image to your API here
    }

    return (
        <div className='w-[500px] mx-auto overflow-x-auto scrollbar-none '>
            <div className='max-w-[410px] mx-auto '>

                {/* PROFILE VIEW — hidden while editing */}
                {!hide &&
                    <>
                        <div className='flex gap-7 pt-7 max-w-[410px] mx-auto h-[90px]  '>
                            <div className='flex flex-col w-[120px]  '>
                                <div onClick={() => setHide(!hide)} className="cursor-pointer">
                                    {preview ?
                                        <img src={preview} alt="uploaded" className="w-24 h-24 rounded-full object-cover " />
                                        :
                                        <span className="text-sm text-gray-500">Update Your Profile</span>
                                    }
                                </div>
                            </div>

                            <div className='flex flex-col gap-1  justify-between'>
                                <div>
                                    <h1>{forms[0].name}</h1>
                                </div>
                                <div className='flex gap-7 text-center  '>
                                    <div>
                                        <h1>0</h1>
                                        <h1>post</h1>
                                    </div>

                                    <div>
                                        <h1>0</h1>
                                        <h1>followers</h1>
                                    </div>

                                    <div>
                                        <h2>{storedUser?.following || 0}</h2>
                                        <h2>following</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-3'>
                            <h1>{forms[0].bio}</h1>
                            <h1>{forms[0].links}</h1>
                        </div>

                        <div className='flex gap-6 text-center pt-13 '>
                            <button onClick={() => setHide(!hide)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[170px] hover:bg-blue-600"> Edit</button>
                            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[170px] hover:bg-blue-600"> message</button>
                            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[40px] hover:bg-blue-600"> +</button>
                        </div>
                        <div className='flex justify-between align-middle pt-6'>
                            <button onClick={() => setShowPosts(!showPosts)}>
                                <Menu size={26} />
                            </button>

                            <button onClick={() => setShowReels(!showReels)}>
                                <Clapperboard size={26} />
                            </button>



                            <button onClick={() => setShowProfile(!showProfile)}>
                                <User size={26} />
                            </button>
                        </div>
                    </>
                }

                {/* EDIT FORM — takes over the full page while hide is true */}
                {hide &&
                    <div className='w-full min-h-screen pt-10'>
                        <form onSubmit={handler} className='flex flex-col gap-4'>
                            <div className="flex flex-col items-center gap-2 mb-4">
                                {preview && (
                                    <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className='flex gap-6 flex-row items-center'>
                                <label className='w-24'>Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Name'
                                    value={forms[0].name}
                                    onChange={e => handleChange("name", e.target.value)}
                                    className='border-b px-2 py-1 flex-1'
                                />
                            </div>

                            <div className='flex gap-6 flex-row items-center'>
                                <label className='w-24'>Username:</label>
                                <input
                                    type="text"
                                    value={forms[0].username}
                                    placeholder='Enter Your username'
                                    onChange={e => handleChange("username", e.target.value)}
                                    className='border-b px-2 py-1 flex-1'
                                />
                            </div>

                            <div className='flex gap-6 flex-row items-center'>
                                <label className='w-24'>Pronouns:</label>
                                <input
                                    type="text"
                                    value={forms[0].pronouns}
                                    placeholder='Enter Your Pronouns'
                                    onChange={e => handleChange("pronouns", e.target.value)}
                                    className='border-b px-2 py-1 flex-1'
                                />
                            </div>

                            <div className='flex gap-6 flex-row items-center'>
                                <label className='w-24'>Bio:</label>
                                <input
                                    value={forms[0].bio}
                                    placeholder='Enter Your Bio'
                                    onChange={e => handleChange("bio", e.target.value)}
                                    className='border-b px-2 py-1 flex-1'
                                />
                            </div>

                            <div className='flex gap-6 flex-row items-center'>
                                <label className='w-24'>Links:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Links'
                                    value={forms[0].links}
                                    onChange={e => handleChange("links", e.target.value)}
                                    className='border-b px-2 py-1 flex-1'
                                />
                            </div>

                            <div className='flex   gap-4 items-center'>
                                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
                                <button type="button" onClick={() => setHide(false)} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>

                            </div>
                        </form>
                    </div>
                }

            </div>
        </div>
    )
}

export default UserProfile