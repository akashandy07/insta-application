import React, { useState } from "react";
import {
    Clapperboard,
    Menu,
    User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import akash from "../assets/akash.jpeg";

const DEFAULT_USER = {
    id: 0,
    name: "AKASH",
    username: "AKASH07",
    pronouns: "",
    bio: "FRONTEND DEVELOPER",
    links: "",
    avatar: akash,
    followers: 0,
    following: 0
};

const UserProfile = () => {

    const navigate = useNavigate();

    // ==========================================
    // GET USER FROM LOCAL STORAGE
    // ==========================================

    const getStoredUser = () => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return DEFAULT_USER;
        }

        try {

            const parsedUser =
                JSON.parse(savedUser);

            return {
                ...DEFAULT_USER,
                ...parsedUser,

                // If localStorage has no avatar,
                // use akash image
                avatar:
                    parsedUser.avatar ||
                    akash
            };

        } catch (error) {

            return DEFAULT_USER;

        }
    };

    const [storedUser, setStoredUser] =
        useState(getStoredUser);

    // ==========================================
    // EDIT FORM
    // ==========================================

    const [hide, setHide] =
        useState(false);

    // ==========================================
    // PROFILE TAB
    // ==========================================

    const [activeTab, setActiveTab] =
        useState("posts");

    // ==========================================
    // IMAGE
    // ==========================================

    const [image, setImage] =
        useState(null);

    const [preview, setPreview] =
        useState(
            storedUser.avatar ||
            akash
        );

    // ==========================================
    // FORM DATA
    // ==========================================

    const [forms, setForms] = useState([
        {
            name:
                storedUser.name ||
                DEFAULT_USER.name,

            username:
                storedUser.username ||
                DEFAULT_USER.username,

            pronouns:
                storedUser.pronouns || "",

            bio:
                storedUser.bio ||
                DEFAULT_USER.bio,

            links:
                storedUser.links || "",
        }
    ]);

    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (
        field,
        value
    ) => {

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

    // ==========================================
    // HANDLE IMAGE
    // ==========================================

    function handleImageChange(e) {

        const file =
            e.target.files[0];

        if (!file) return;

        setImage(file);

        const reader =
            new FileReader();

        reader.onloadend = () => {

            setPreview(
                reader.result
            );

        };

        reader.readAsDataURL(file);
    }

    // ==========================================
    // SUBMIT PROFILE
    // ==========================================

    function handler(e) {

        e.preventDefault();

        const updatedUser = {

            ...storedUser,

            name:
                forms[0].name ||
                DEFAULT_USER.name,

            username:
                forms[0].username ||
                DEFAULT_USER.username,

            pronouns:
                forms[0].pronouns,

            bio:
                forms[0].bio ||
                DEFAULT_USER.bio,

            links:
                forms[0].links,

            // Uploaded image if available.
            // Otherwise keep current image.
            // If nothing exists, use akash.
            avatar:
                preview ||
                storedUser.avatar ||
                akash
        };

        // ==========================================
        // SAVE TO LOCAL STORAGE
        // ==========================================

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        // ==========================================
        // UPDATE STATE
        // ==========================================

        setStoredUser(
            updatedUser
        );

        setPreview(
            updatedUser.avatar ||
            akash
        );

        // ==========================================
        // CLOSE EDIT
        // ==========================================

        setHide(false);

        console.log(
            "Updated User:",
            updatedUser
        );

    }

    // ==========================================
    // RETURN
    // ==========================================

    return (

        <div className="w-[400px] max-w-full mx-auto overflow-x-hidden scrollbar-none">

            <div className="w-[calc(100%-20px)] max-w-[380px] mx-auto">

                {/* ================================================= */}
                {/* PROFILE */}
                {/* ================================================= */}

                {!hide && (

                    <>

                        {/* ========================================= */}
                        {/* PROFILE HEADER */}
                        {/* ========================================= */}

                        <div className="flex gap-7 pt-7 items-center">

                            {/* PROFILE IMAGE */}

                            <div className="flex flex-col w-[120px] flex-shrink-0">

                                <div
                                    onClick={() =>
                                        setHide(true)
                                    }
                                    className="cursor-pointer"
                                >

                                    <img
                                        src={
                                            preview ||
                                            akash
                                        }
                                        alt="profile"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* USER DETAILS */}
                            {/* ================================= */}

                            <div className="flex flex-col justify-between items-start">

                                <p className="text-sm text-gray-500">

                                    {forms[0].username ||
                                        DEFAULT_USER.username}

                                </p>


                                {/* PROFILE COUNTS */}

                                <div className="flex gap-5 text-center mt-2">

                                    <div>

                                        <h1 className="font-medium text-sm">
                                            0
                                        </h1>

                                        <h1 className="font-medium text-xs">
                                            posts
                                        </h1>

                                    </div>


                                    <div>

                                        <h1 className="font-medium text-sm">
                                            {storedUser.followers || 0}
                                        </h1>

                                        <h1 className="font-medium text-xs">
                                            followers
                                        </h1>

                                    </div>


                                    <div
                                        onClick={() =>
                                            navigate(
                                                "/ShowFollow"
                                            )
                                        }
                                        className="cursor-pointer"
                                    >

                                        <h2 className="font-medium text-sm">

                                            {storedUser.following ||
                                                0}

                                        </h2>

                                        <h2 className="font-medium text-xs">
                                            following
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ========================================= */}
                        {/* NAME + BIO */}
                        {/* ========================================= */}

                        <div className="pt-3">

                            <h1 className="font-semibold text-sm">

                                {forms[0].name ||
                                    DEFAULT_USER.name}

                            </h1>

                            <p className="text-sm">

                                {forms[0].bio ||
                                    DEFAULT_USER.bio}

                            </p>

                            {forms[0].links && (

                                <p className="text-sm text-blue-500">

                                    {forms[0].links}

                                </p>

                            )}

                        </div>


                        {/* ========================================= */}
                        {/* BUTTONS */}
                        {/* ========================================= */}

                        <div className="flex gap-2 pt-5">

                            <button
                                onClick={() =>
                                    setHide(true)
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-[150px] text-sm"
                            >
                                Edit
                            </button>


                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-[150px] text-sm"
                            >
                                Message
                            </button>


                            <button
                                className="px-3 py-2 bg-blue-500 text-white rounded-lg w-[40px] text-sm"
                            >
                                +
                            </button>

                        </div>


                        {/* ========================================= */}
                        {/* PROFILE TABS */}
                        {/* ========================================= */}

                        <div className="flex justify-between items-center pt-6 border-b border-t border-gray-300 mt-5 text-center">

                            {/* POSTS */}

                            <button
                                onClick={() =>
                                    setActiveTab("posts")
                                }
                                className={
                                    activeTab === "posts"
                                        ? "border-b-2 border-black pb-3"
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

                                <Clapperboard
                                    size={26}
                                />

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


                        {/* ========================================= */}
                        {/* TAB CONTENT */}
                        {/* ========================================= */}

                        <div className="flex justify-center items-center py-16">

                            {activeTab === "posts" ? (

                                <p className="text-gray-500 text-sm">
                                    No posts available
                                </p>

                            ) : activeTab === "reels" ? (

                                <p className="text-gray-500 text-sm">
                                    No reels available
                                </p>

                            ) : (

                                <p className="text-gray-500 text-sm">
                                    No tagged posts available
                                </p>

                            )}

                        </div>

                    </>

                )}


                {/* ================================================= */}
                {/* EDIT FORM */}
                {/* ================================================= */}

                {hide && (

                    <div className="w-full min-h-screen pt-10">

                        <form
                            onSubmit={handler}
                            className="flex flex-col gap-5"
                        >

                            {/* ================================= */}
                            {/* IMAGE */}
                            {/* ================================= */}

                            <div className="flex flex-col items-center gap-3 mb-4">

                                <img
                                    src={
                                        preview ||
                                        akash
                                    }
                                    alt="Preview"
                                    className="w-24 h-24 rounded-full object-cover"
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                    className="text-sm"
                                />

                            </div>


                            {/* ================================= */}
                            {/* NAME */}
                            {/* ================================= */}

                            <div className="flex gap-4 items-center">

                                <label className="w-24 text-sm">
                                    Name:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={
                                        forms[0].name
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1 text-sm outline-none"
                                />

                            </div>


                            {/* ================================= */}
                            {/* USERNAME */}
                            {/* ================================= */}

                            <div className="flex gap-4 items-center">

                                <label className="w-24 text-sm">
                                    Username:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Username"
                                    value={
                                        forms[0].username
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "username",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1 text-sm outline-none"
                                />

                            </div>


                            {/* ================================= */}
                            {/* PRONOUNS */}
                            {/* ================================= */}

                            <div className="flex gap-4 items-center">

                                <label className="w-24 text-sm">
                                    Pronouns:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Pronouns"
                                    value={
                                        forms[0].pronouns
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "pronouns",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1 text-sm outline-none"
                                />

                            </div>


                            {/* ================================= */}
                            {/* BIO */}
                            {/* ================================= */}

                            <div className="flex gap-4 items-center">

                                <label className="w-24 text-sm">
                                    Bio:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Bio"
                                    value={
                                        forms[0].bio
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "bio",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1 text-sm outline-none"
                                />

                            </div>


                            {/* ================================= */}
                            {/* LINKS */}
                            {/* ================================= */}

                            <div className="flex gap-4 items-center">

                                <label className="w-24 text-sm">
                                    Links:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Your Links"
                                    value={
                                        forms[0].links
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "links",
                                            e.target.value
                                        )
                                    }
                                    className="border-b px-2 py-1 flex-1 text-sm outline-none"
                                />

                            </div>


                            {/* ================================= */}
                            {/* BUTTONS */}
                            {/* ================================= */}

                            <div className="flex gap-3 pt-3">

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm"
                                >
                                    Submit
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setHide(false)
                                    }
                                    className="px-6 py-2 bg-gray-300 rounded-lg text-sm"
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