
import React, { useEffect, useState } from "react";
import { stories } from "../data/stories";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

const StoryPage = () => {
    const navigate = useNavigate();

    const [myStories, setMyStories] = useState([]);

    const storedUser =
        JSON.parse(localStorage.getItem("user")) || {};

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

            {/* =====================================
            MY PROFILE / STORY
        ===================================== */}

            <div className="flex flex-col items-center flex-shrink-0">


                <div className="relative w-[87px] h-[87px]">



                    <div
                        onClick={handleMyStoryClick}
                        className={`w-[87px] h-[87px] rounded-full border-4 overflow-hidden cursor-pointer ${myStories.length > 0
                            ? "border-pink-600"
                            : "border-gray-600"
                            }`}
                    >

                        <img
                            src={
                                myStories.length > 0
                                    ? myStories[0].image
                                    : storedUser?.avatar
                            }
                            alt={
                                storedUser?.username ||
                                "Profile"
                            }
                            className="w-full h-full object-cover"
                        />

                    </div>



                    <button
                        type="button"
                        onClick={handleAddStory}
                        className="absolute top-15 right-0 w-8 h-8 bg-blue-500 text-white rounded-full border-2 border-white flex items-center justify-center text-lg font-bold z-50"
                    >
                        +
                    </button>

                </div>

                {/* USERNAME */}

                <p className="text-xs mt-1">
                    {myStories.length > 0
                        ? "Your story"
                        : "Add story"}
                </p>

            </div>




            {stories.map((story) => {

                const user =
                    getUserById(story.userId);

                return (
                    <div
                        key={story.id}
                        className="flex flex-col items-center flex-shrink-0"
                    >

                        {/* STORY CIRCLE */}

                        <div
                            className={`w-[85px] h-[85px] rounded-full border-4 overflow-hidden ${story.seen
                                ? "border-gray-700"
                                : "border-pink-700"
                                }`}
                        >

                            <img
                                src={user?.avatar}
                                alt={user?.username}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() =>
                                    navigate(
                                        `/ProfilePage/${user?.id}`
                                    )
                                }
                            />

                        </div>

                        {/* USERNAME */}

                        <p className="text-xs mt-1">
                            {user?.username}
                        </p>

                    </div>
                );
            })}

        </div>
    );
}

export default StoryPage;

