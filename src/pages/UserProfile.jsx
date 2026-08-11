
import React, { useState } from "react";
import {
    Clapperboard,
    Menu,
    User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    // Edit form visibility
    const [hide, setHide] = useState(false);

    // Active profile tab
    const [activeTab, setActiveTab] = useState("posts");

    // Image states
    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState(
        storedUser?.avatar || null
    );

    // Form states
    const [forms, setForms] = useState([
        {
            name: storedUser?.name || "",
            username: storedUser?.username || "",
            pronouns: storedUser?.pronouns || "",
            bio: storedUser?.bio || "",
            links: storedUser?.links || "",
        }
    ]);

    // Handle text input changes
    const handleChange = (field, value) => {

        setForms((prev) =>
            prev.map((form, index) =>
                index === 0
                    ? {
                        ...form,
                        [field]: value
                    }
                    : form
            )
        );

    };

    // Handle image upload
    function handleImageChange(e) {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    }

    // Submit profile
    function handler(e) {

        e.preventDefault();

        const updatedUser = {
            ...storedUser,

            name: forms[0].name,
            username: forms[0].username,
            pronouns: forms[0].pronouns,
            bio: forms[0].bio,
            links: forms[0].links,

            // Save image as base64
            avatar: preview
        };

        // Save updated user
        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        // Close edit form
        setHide(false);

        console.log("Updated User:", updatedUser);
        console.log("Image File:", image);
    }

    return (

        <div className="w-[400px] mx-auto overflow-x-auto scrollbar-none">

            <div className="max-w-[380px] mx-auto">

                {/* ================= PROFILE ================= */}

                {!hide && (
                    <>

                        {/* PROFILE HEADER */}

                        <div className="flex gap-7 pt-7 max-w-[410px] mx-auto items-center">

                            {/* PROFILE IMAGE */}

                            <div className="flex flex-col w-[120px]">

                                <div
                                    onClick={() => setHide(true)}
                                    className="cursor-pointer"
                                >

                                    {preview ? (

                                        <img
                                            src={preview}
                                            alt="profile"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />

                                    ) : (

                                        <span className="text-sm text-gray-500">
                                            Update Your Profile
                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* USER DETAILS */}

                            <div className="flex flex-col justify-between items-start">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        {forms[0].username}
                                    </p>

                                </div>


                                {/* PROFILE COUNTS */}

                                <div className="flex gap-5 text-center mt-2">

                                    <div>

                                        <h1 className="font-medium">
                                            0
                                        </h1>

                                        <h1 className="font-medium">
                                            posts
                                        </h1>

                                    </div>


                                    <div>

                                        <h1 className="font-medium">
                                            0
                                        </h1>

                                        <h1 className="font-medium">
                                            followers
                                        </h1>

                                    </div>


                                    <div
                                        onClick={() =>
                                            navigate("/ShowFollow")
                                        }
                                        className="cursor-pointer"
                                    >

                                        <h2 className="font-medium">
                                            {storedUser?.following || 0}
                                        </h2>

                                        <h2 className="font-medium">
                                            following
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* BIO */}

                        <div className="pt-3">

                            <h1>
                                {forms[0].bio}
                            </h1>

                            <h1>
                                {forms[0].links}
                            </h1>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-3 text-center pt-8">

                            <button
                                onClick={() => setHide(true)}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[170px] hover:bg-blue-600"
                            >
                                Edit
                            </button>


                            <button
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[170px] hover:bg-blue-600"
                            >
                                Message
                            </button>


                            <button
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg w-[40px] hover:bg-blue-600"
                            >
                                +
                            </button>

                        </div>


                        {/* ================= PROFILE TABS ================= */}

                        <div className="flex justify-between items-center pt-6 border-b border-t border-gray-300  border-gray-300 mt-5 items-center text-center">

                            {/* POSTS */}

                            <button
                                onClick={() =>
                                    setActiveTab("posts")
                                }
                                className={
                                    activeTab === "posts"
                                        ? "border-b-2 border-black pb-3 "
                                        : "pb-3"
                                }
                            >
                                <Menu size={26} />
                            </button>


                            {/* REELS */}

                            <button
                                onClick={() =>
                                    setActiveTab("reels")
                                }
                                className={
                                    activeTab === "reels"
                                        ? "border-b-2 border-black pb-3"
                                        : "pb-3"
                                }
                            >
                                <Clapperboard size={26} />
                            </button>


                            {/* TAGGED */}

                            <button
                                onClick={() =>
                                    setActiveTab("tagged")
                                }
                                className={
                                    activeTab === "tagged"
                                        ? "border-b-2 border-black pb-3"
                                        : "pb-3"
                                }
                            >
                                <User size={26} />
                            </button>

                        </div>


                        {/* ================= TAB CONTENT ================= */}

                        <div className="flex justify-center items-center py-16">

                            {activeTab === "posts" ? (

                                <p className="text-gray-500">
                                    No posts available
                                </p>

                            ) : activeTab === "reels" ? (

                                <p className="text-gray-500">
                                    No reels available
                                </p>

                            ) : (

                                <p className="text-gray-500">
                                    No tagged posts available
                                </p>

                            )}

                        </div>

                    </>
                )}


                {/* ================= EDIT FORM ================= */}

                {hide && (

                    <div className="w-full min-h-screen pt-10">

                        <form
                            onSubmit={handler}
                            className="flex flex-col gap-4"
                        >

                            {/* IMAGE */}

                            <div className="flex flex-col items-center gap-2 mb-4">

                                {preview && (

                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />

                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                            </div>


                            {/* NAME */}

                            <div className="flex gap-6 items-center">

                                <label className="w-24">
                                    Name:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={forms[0].name}
                                    onChange={(e) =>
                                        handleChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1"
                                />

                            </div>


                            {/* USERNAME */}

                            <div className="flex gap-6 items-center">

                                <label className="w-24">
                                    Username:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Username"
                                    value={forms[0].username}
                                    onChange={(e) =>
                                        handleChange(
                                            "username",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1"
                                />

                            </div>


                            {/* PRONOUNS */}

                            <div className="flex gap-6 items-center">

                                <label className="w-24">
                                    Pronouns:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Pronouns"
                                    value={forms[0].pronouns}
                                    onChange={(e) =>
                                        handleChange(
                                            "pronouns",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1"
                                />

                            </div>


                            {/* BIO */}

                            <div className="flex gap-6 items-center">

                                <label className="w-24">
                                    Bio:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Bio"
                                    value={forms[0].bio}
                                    onChange={(e) =>
                                        handleChange(
                                            "bio",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1"
                                />

                            </div>


                            {/* LINKS */}

                            <div className="flex gap-6 items-center">

                                <label className="w-24">
                                    Links:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Links"
                                    value={forms[0].links}
                                    onChange={(e) =>
                                        handleChange(
                                            "links",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1"
                                />

                            </div>


                            {/* SUBMIT / CANCEL */}

                            <div className="flex gap-4 items-center">

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Submit
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setHide(false)
                                    }
                                    className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}

            </div>

        </div>
    );
};

export default UserProfile;
