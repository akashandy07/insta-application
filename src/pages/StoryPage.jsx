import React, { useEffect, useState } from "react";
import { stories } from "../data/stories";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

import akash from "../assets/akash.jpeg";

const StoryPage = () => {

    const navigate = useNavigate();

    const [myStories, setMyStories] = useState([]);

    // ==========================================
    // GET STORED USER
    // ==========================================

    const getStoredUser = () => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return {};
        }

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            return {};

        }

    };

    const [storedUser, setStoredUser] =
        useState(getStoredUser);

    // ==========================================
    // DEFAULT AVATAR
    // ==========================================

    const userAvatar =
        storedUser?.avatar || akash;

    // ==========================================
    // LOAD MY STORIES
    // ==========================================

    useEffect(() => {

        loadMyStories();

    }, []);

    const loadMyStories = () => {

        const savedStories =
            JSON.parse(
                localStorage.getItem("myStories")
            ) || [];

        setMyStories(savedStories);

    };

    // ==========================================
    // UPDATE USER WHEN LOCAL STORAGE CHANGES
    // ==========================================

    useEffect(() => {

        const handleStorage = () => {

            const savedUser =
                localStorage.getItem("user");

            if (savedUser) {

                try {

                    setStoredUser(
                        JSON.parse(savedUser)
                    );

                } catch (error) {

                    setStoredUser({});

                }

            }

        };

        window.addEventListener(
            "storage",
            handleStorage
        );

        return () => {

            window.removeEventListener(
                "storage",
                handleStorage
            );

        };

    }, []);

    // ==========================================
    // GET USER
    // ==========================================

    const getUserById = (userId) => {

        return users.find(
            (user) => user.id === userId
        );

    };

    // ==========================================
    // MY STORY CLICK
    // ==========================================

    const handleMyStoryClick = () => {

        // No story yet
        if (myStories.length === 0) {

            navigate("/PhotoUploadIcon");

            return;

        }

        // Story exists
        navigate("/MyStory");

    };

    // ==========================================
    // ADD NEW STORY
    // ==========================================

    const handleAddStory = (e) => {

        e.stopPropagation();

        navigate("/PhotoUploadIcon");

    };

    return (

        <div className="flex justify-around overflow-x-auto gap-5 hide-scrollbar mt-1.5 relative">

            {/* ================================================= */}
            {/* MY PROFILE / STORY */}
            {/* ================================================= */}

            <div className="flex flex-col items-center flex-shrink-0">

                <div className="relative w-[87px] h-[87px]">

                    {/* ================================================= */}
                    {/* MY STORY CIRCLE */}
                    {/* ================================================= */}

                    <div
                        onClick={handleMyStoryClick}
                        className={`w-[87px] h-[87px] rounded-full border-4 overflow-hidden cursor-pointer ${
                            myStories.length > 0
                                ? "border-pink-600"
                                : "border-gray-600"
                        }`}
                    >

                        {myStories.length > 0 ? (

                            /* MY STORY IMAGE */

                            <img
                                src={myStories[0].image}
                                alt="Your story"
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            /* DEFAULT / USER AVATAR */

                            <img
                                src={userAvatar}
                                alt={
                                    storedUser?.username ||
                                    "Profile"
                                }
                                className="w-full h-full object-cover"
                            />

                        )}

                    </div>


                    {/* ================================================= */}
                    {/* ADD STORY BUTTON */}
                    {/* ================================================= */}

                    <button
                        type="button"
                        onClick={handleAddStory}
                        className="absolute top-15 right-0 w-8 h-8 bg-blue-500 text-white rounded-full border-2 border-white flex items-center justify-center text-lg font-bold z-50"
                    >
                        +
                    </button>

                </div>


                {/* ================================================= */}
                {/* USERNAME */}
                {/* ================================================= */}

                <p className="text-xs mt-1">

                    {myStories.length > 0
                        ? "Your story"
                        : "Add story"}

                </p>

            </div>


            {/* ================================================= */}
            {/* OTHER STORIES */}
            {/* ================================================= */}

            {stories.map((story) => {

                const user =
                    getUserById(story.userId);

                return (

                    <div
                        key={story.id}
                        className="flex flex-col items-center flex-shrink-0"
                    >

                        {/* ================================================= */}
                        {/* STORY CIRCLE */}
                        {/* ================================================= */}

                        <div
                            className={`w-[85px] h-[85px] rounded-full border-4 overflow-hidden ${
                                story.seen
                                    ? "border-gray-700"
                                    : "border-pink-700"
                            }`}
                        >

                            <img
                                src={
                                    user?.avatar ||
                                    akash
                                }
                                alt={
                                    user?.username ||
                                    "User"
                                }
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() =>
                                    navigate(
                                        `/ProfilePage/${user?.id}`
                                    )
                                }
                            />

                        </div>


                        {/* ================================================= */}
                        {/* USERNAME */}
                        {/* ================================================= */}

                        <p className="text-xs mt-1">

                            {user?.username || "User"}

                        </p>

                    </div>

                );

            })}

        </div>
    );
};

export default StoryPage;