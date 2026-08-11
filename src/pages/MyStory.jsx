
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyStory = () => {
    const navigate = useNavigate();

    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showViews, setShowViews] = useState(false);

    // ==========================================
    // LOAD STORIES
    // ==========================================

    useEffect(() => {
        const savedStories =
            JSON.parse(localStorage.getItem("myStories")) || [];

        setStories(savedStories);
    }, []);

    // ==========================================
    // ADD ANOTHER STORY
    // ==========================================

    const addAnotherStory = () => {
        navigate("/PhotoUploadIcon");
    };

    // ==========================================
    // PREVIOUS STORY
    // ==========================================

    const previousStory = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setShowViews(false);
        }
    };

    // ==========================================
    // NEXT STORY
    // ==========================================

    const nextStory = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setShowViews(false);
        }
    };

    // ==========================================
    // DELETE CURRENT STORY
    // ==========================================

    const deleteStory = () => {
        if (stories.length === 0) return;

        const updatedStories = stories.filter(
            (_, index) => index !== currentIndex
        );

        localStorage.setItem(
            "myStories",
            JSON.stringify(updatedStories)
        );

        setStories(updatedStories);
        setShowViews(false);

        // No stories left
        if (updatedStories.length === 0) {
            navigate("/PostPage");
            return;
        }

        // If last story was deleted
        if (currentIndex >= updatedStories.length) {
            setCurrentIndex(updatedStories.length - 1);
        }
    };

    // ==========================================
    // CLOSE STORY
    // ==========================================

    const closeStory = () => {
        navigate("/PostPage");
    };

    // ==========================================
    // NO STORIES
    // ==========================================

    if (stories.length === 0) {
        return (
            <div className="w-[400px] mx-auto min-h-screen bg-white-300 flex items-center justify-center text-white">
                <p>No story available</p>
            </div>
        );
    }

    const currentStory = stories[currentIndex];

    return (
        <div className="w-[400px] mx-auto min-h-screen bg-white-300  relative overflow-hidden">

            {/* =====================================
                TOP BAR
            ===================================== */}

            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-5 text-white">

                {/* CLOSE */}

                <button
                    type="button"
                    onClick={closeStory}
                    className="text-2xl hover:opacity-70"
                >
                    ✕
                </button>

                {/* RIGHT BUTTONS */}

                <div className="flex items-center gap-4">

                    {/* ADD STORY */}

                    <button
                        type="button"
                        onClick={addAnotherStory}
                        className="w-10 h-10 rounded-full bg-white text-black text-3xl flex items-center justify-center hover:bg-gray-200"
                    >
                        +
                    </button>

                    {/* DELETE */}

                    <button
                        type="button"
                        onClick={deleteStory}
                        className="text-2xl hover:scale-110 transition"
                    >
                        🗑️
                    </button>

                </div>
            </div>

            {/* =====================================
                STORY IMAGE
            ===================================== */}

            <div className="w-full min-h-screen flex items-center justify-center">

                <img
                    src={currentStory.image}
                    alt="My story"
                    className="w-full max-h-screen object-contain"
                />

            </div>

            {/* =====================================
                PREVIOUS BUTTON
            ===================================== */}

            {currentIndex > 0 && (
                <button
                    type="button"
                    onClick={previousStory}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/70 text-black text-3xl flex items-center justify-center hover:bg-white"
                >
                    ‹
                </button>
            )}

            {/* =====================================
                NEXT BUTTON
            ===================================== */}

            {currentIndex < stories.length - 1 && (
                <button
                    type="button"
                    onClick={nextStory}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/70 text-black text-3xl flex items-center justify-center hover:bg-white"
                >
                    ›
                </button>
            )}

            {/* =====================================
                STORY COUNTER
            ===================================== */}

            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 text-white text-sm">
                {currentIndex + 1} / {stories.length}
            </div>

            {/* =====================================
                BOTTOM VIEW AREA
            ===================================== */}

            <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/70 to-transparent pt-20 pb-8">

                {/* VIEW BUTTON */}

                <button
                    type="button"
                    onClick={() =>
                        setShowViews((prev) => !prev)
                    }
                    className="mx-auto flex flex-col items-center text-white hover:opacity-80"
                >

                    <span className="text-3xl">
                        👁️
                    </span>

                    <span className="text-sm mt-1">
                        {showViews ? "Hide views" : "View"}
                    </span>

                </button>

                {/* VIEWERS */}

                {showViews && (
                    <div className="text-center text-white text-sm mt-3">
                        No people viewed your story
                    </div>
                )}

            </div>

        </div>
    );
};

export default MyStory;

