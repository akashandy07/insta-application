import React, { useState } from "react";
import { Search, Heart, MessageCircle, X } from "lucide-react";

import { users } from "../data/users";
import { reels } from "../data/Reels";

import SearchResult from "./SearchResult";

import { useReelLikeLogic } from "../custom/ReelLikeLogic";
import { useReelCommentLogic } from "../custom/ReelCommentLogic";
import { useFollowLogics } from "../custom/FollowLogics";

const SearchPage = () => {
    const [input, setInput] = useState("");
    const [showUser, setShowUser] = useState([]);

    // false = large reel
    // true = 3 column small reels
    const [reelSmall, setReelSmall] = useState(true);

    // =================================================
    // LIKE LOGIC
    // =================================================

    const {
        reelData,
        reelLikeButton,
    } = useReelLikeLogic();

    // =================================================
    // COMMENT LOGIC
    // =================================================

    const {
        reelComments,
        postReelComment,
        setInput: setCommentInput,
        input: commentInput,
    } = useReelCommentLogic();

    // =================================================
    // FOLLOW LOGIC
    // =================================================

    const {
        data,
        toggleFollow,
    } = useFollowLogics();

    // =================================================
    // COMMENT POPUP
    // =================================================

    const [showComment, setShowComment] = useState(null);

    // =================================================
    // SEARCH
    // =================================================

    const searchHandler = (value) => {
        setInput(value);

        if (value.trim() === "") {
            setShowUser([]);
            return;
        }

        const filteredUsers = users.filter(
            (user) =>
                user.name
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                user.username
                    .toLowerCase()
                    .includes(value.toLowerCase())
        );

        setShowUser(filteredUsers);
    };

    return (
        <div className="w-[400px] min-h-[100vh] mx-auto pt-5 overflow-x-auto scrollbar-none">

            {/* ================================================= */}
            {/* SEARCH BAR */}
            {/* ================================================= */}

            <div className="max-w-[380px] mx-auto">

                <div className="flex items-center gap-3 mb-5">

                    <div className="flex-1 relative">

                        <Search
                            className="absolute top-3 right-3 text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search users by name or username..."
                            value={input}
                            onChange={(e) =>
                                searchHandler(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        />

                    </div>

                </div>

            </div>

            {/* ================================================= */}
            {/* SEARCH RESULT */}
            {/* ================================================= */}

            {input.trim() !== "" ? (

                <SearchResult
                    input={input}
                    showUser={showUser}
                />

            ) : (

                /* ================================================= */
                /* REELS */
                /* ================================================= */

                <div
                    className={`w-full ${
                        reelSmall
                            ? "grid grid-cols-3 gap-2"
                            : "flex flex-col items-center gap-10"
                    }`}
                >

                    {reels.map((reel) => {

                        // =================================================
                        // FIND USER
                        // =================================================

                        const reelUser = users.find(
                            (user) => user.id === reel.userId
                        );

                        // User from follow logic
                        const followUser = data.find(
                            (user) => user.id === reel.userId
                        );

                        // =================================================
                        // GET REEL DATA
                        // =================================================

                        const currentReel =
                            reelData.find(
                                (item) =>
                                    item.id === reel.id
                            ) || reel;

                        // =================================================
                        // GET COMMENTS
                        // =================================================

                        const currentComments =
                            reelComments.find(
                                (item) =>
                                    item.id === reel.id
                            )?.comments || [];

                        return (

                            <div
                                key={reel.id}
                                className={`relative transition-all duration-300 ${
                                    reelSmall
                                        ? "w-[120px]"
                                        : "w-[380px]"
                                }`}
                            >

                                {/* ================================================= */}
                                {/* USER DETAILS - LARGE MODE */}
                                {/* ================================================= */}

                                {!reelSmall && (

                                    <div className="flex items-center justify-between mb-2 px-2">

                                        {/* USER INFO */}

                                        <div className="flex items-center gap-2">

                                            <img
                                                src={
                                                    reelUser?.avatar ||
                                                    "https://i.pravatar.cc/150"
                                                }
                                                alt="avatar"
                                                className="w-9 h-9 rounded-full object-cover"
                                            />

                                            <div>

                                                <p className="font-semibold text-sm">
                                                    {reelUser?.username}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {reelUser?.name}
                                                </p>

                                            </div>

                                        </div>

                                        {/* FOLLOW BUTTON */}

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                if (
                                                    followUser?.id
                                                ) {
                                                    toggleFollow(
                                                        followUser.id
                                                    );
                                                }
                                            }}
                                            className={
                                                followUser?.isFollowing
                                                    ? "text-gray-500 font-semibold text-sm"
                                                    : "text-blue-500 font-semibold text-sm"
                                            }
                                        >
                                            {followUser?.isFollowing
                                                ? "Following"
                                                : "Follow"}
                                        </button>

                                    </div>

                                )}

                                {/* ================================================= */}
                                {/* VIDEO */}
                                {/* ================================================= */}

                                <div
                                    className={`relative overflow-hidden rounded-lg bg-black transition-all duration-300 ${
                                        reelSmall
                                            ? "w-[120px] h-[120px]"
                                            : "w-[380px] h-[400px]"
                                    }`}
                                >

                                    <video
                                        src={reel.reel}
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover cursor-pointer"
                                        onClick={(e) => {

                                            // PLAY / PAUSE

                                            if (
                                                e.currentTarget.paused
                                            ) {

                                                e.currentTarget.play();

                                            } else {

                                                e.currentTarget.pause();

                                            }

                                            // CHANGE LAYOUT

                                            setReelSmall(
                                                (prev) => !prev
                                            );

                                        }}
                                    />

                                    {/* ================================================= */}
                                    {/* LIKE + COMMENT */}
                                    {/* ONLY LARGE MODE */}
                                    {/* ================================================= */}

                                    {!reelSmall && (

                                        <div className="absolute right-3 bottom-5 z-20 flex flex-col items-center gap-5">

                                            {/* ================================================= */}
                                            {/* LIKE */}
                                            {/* ================================================= */}

                                            <div className="flex flex-col items-center">

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        reelLikeButton(
                                                            reel.id
                                                        );
                                                    }}
                                                >

                                                    <Heart
                                                        size={30}
                                                        color="white"
                                                        fill={
                                                            currentReel.liked
                                                                ? "red"
                                                                : "none"
                                                        }
                                                    />

                                                </button>

                                                <span className="text-white text-xs font-semibold mt-1">

                                                    {
                                                        currentReel.likes
                                                    }

                                                </span>

                                            </div>

                                            {/* ================================================= */}
                                            {/* COMMENT */}
                                            {/* ================================================= */}

                                            <div className="flex flex-col items-center">

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setShowComment(
                                                            reel.id
                                                        );
                                                    }}
                                                >

                                                    <MessageCircle
                                                        size={30}
                                                        color="white"
                                                    />

                                                </button>

                                                <span className="text-white text-xs font-semibold mt-1">

                                                    {
                                                        currentComments.length
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    )}

                                </div>

                                {/* ================================================= */}
                                {/* COMMENT POPUP */}
                                {/* ================================================= */}

                                {showComment === reel.id && (

                                    <div
                                        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40"
                                        onClick={() =>
                                            setShowComment(null)
                                        }
                                    >

                                        <div
                                            className="w-[400px] h-[60vh] bg-white rounded-t-2xl p-5"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        >

                                            {/* ================================================= */}
                                            {/* HEADER */}
                                            {/* ================================================= */}

                                            <div className="flex justify-between items-center border-b pb-3">

                                                <h2 className="font-bold text-lg">
                                                    Comments
                                                </h2>

                                                <button
                                                    onClick={() =>
                                                        setShowComment(
                                                            null
                                                        )
                                                    }
                                                >
                                                    <X size={22} />
                                                </button>

                                            </div>

                                            {/* ================================================= */}
                                            {/* COMMENTS */}
                                            {/* ================================================= */}

                                            <div className="h-[40vh] overflow-y-auto mt-3">

                                                {currentComments.length >
                                                0 ? (

                                                    currentComments.map(
                                                        (comment) => {

                                                            return (

                                                                <div
                                                                    key={
                                                                        comment.id
                                                                    }
                                                                    className="flex gap-3 items-center py-3 border-b"
                                                                >

                                                                    <img
                                                                        src={
                                                                            reelUser?.avatar ||
                                                                            "https://i.pravatar.cc/150"
                                                                        }
                                                                        alt=""
                                                                        className="w-9 h-9 rounded-full object-cover"
                                                                    />

                                                                    <div>

                                                                        <p className="font-semibold text-sm">
                                                                            {
                                                                                reelUser?.username
                                                                            }
                                                                        </p>

                                                                        <p className="text-sm">
                                                                            {
                                                                                comment.text
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            );

                                                        }
                                                    )

                                                ) : (

                                                    <p className="text-gray-500 text-sm mt-5">
                                                        No comments yet
                                                    </p>

                                                )}

                                            </div>

                                            {/* ================================================= */}
                                            {/* COMMENT INPUT */}
                                            {/* ================================================= */}

                                            <div className="flex gap-2 mt-3">

                                                <input
                                                    type="text"
                                                    placeholder="Add a comment..."
                                                    value={
                                                        commentInput
                                                    }
                                                    onChange={(e) =>
                                                        setCommentInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1 border rounded-lg px-3 py-2 outline-none"
                                                />

                                                <button
                                                    onClick={() =>
                                                        postReelComment(
                                                            reel.id
                                                        )
                                                    }
                                                    className="bg-blue-500 text-white px-4 rounded-lg"
                                                >
                                                    Post
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
};

export default SearchPage;