import React, { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, X } from "lucide-react";

import { useReelLikeLogic } from "../custom/ReelLikeLogic";
import { useReelCommentLogic } from "../custom/ReelCommentLogic";
import { useFollowLogics } from "../custom/FollowLogics";

const ReelsPage = () => {

    const { reelData, reelLikeButton } =
        useReelLikeLogic();

    const {
        reelComments,
        postReelComment,
        setInput,
        input,
    } = useReelCommentLogic();

    const {
        data,
        toggleFollow,
    } = useFollowLogics();

    const [showComment, setShowComment] =
        useState(null);

    // Store all video elements
    const videoRefs = useRef([]);

    // =================================================
    // AUTO PLAY WHEN SCROLLING
    // =================================================

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        // Video is visible
                        video.play().catch(() => {});

                    } else {

                        // Video is not visible
                        video.pause();

                    }

                });

            },
            {
                threshold: 0.6,
            }
        );

        videoRefs.current.forEach((video) => {

            if (video) {
                observer.observe(video);
            }

        });

        return () => {

            videoRefs.current.forEach((video) => {

                if (video) {
                    observer.unobserve(video);
                }

            });

        };

    }, [reelData]);

    return (

        <div className="w-[400px] mx-auto bg-white h-[100vh] overflow-y-auto">

            {/* ================================================= */}
            {/* REELS */}
            {/* ================================================= */}

            <div className="w-[380px] mx-auto">

                {reelData.map((reel, index) => {

                    // Find user using reel.userId
                    const user = data.find(
                        (u) => u.id === reel.userId
                    );

                    // Find comments
                    const currentComments =
                        reelComments.find(
                            (item) =>
                                item.id === reel.id
                        )?.comments || [];

                    return (

                        <div
                            key={reel.id}
                            className="relative w-[380px] h-[86vh] overflow-hidden bg-black"
                        >

                            {/* ================================================= */}
                            {/* VIDEO */}
                            {/* ================================================= */}

                            <video
                                ref={(element) => {
                                    videoRefs.current[index] =
                                        element;
                                }}
                                src={reel.reel}
                                muted
                                loop
                                playsInline
                                onClick={(e) => {

                                    if (
                                        e.currentTarget.paused
                                    ) {

                                        e.currentTarget.play();

                                    } else {

                                        e.currentTarget.pause();

                                    }

                                }}
                                className="w-full h-full object-cover"
                            />

                            {/* ================================================= */}
                            {/* USER INFO */}
                            {/* ================================================= */}

                            <div className="absolute left-4 bottom-20 z-20">

                                <div className="flex items-center gap-3">

                                    {/* AVATAR */}

                                    <img
                                        src={user?.avatar}
                                        alt={user?.username}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                    />

                                    {/* USER DETAILS */}

                                    <div>

                                        <p className="text-white font-semibold text-sm">
                                            {user?.username}
                                        </p>

                                        <p className="text-white text-xs mt-1">
                                            {reel.caption}
                                        </p>

                                    </div>

                                    {/* FOLLOW BUTTON */}

                                    <button
                                        onClick={() =>
                                            toggleFollow(
                                                user.id
                                            )
                                        }
                                        className={
                                            user?.isFollowing
                                                ? "ml-2 px-3 py-1 bg-gray-200 text-black text-xs font-semibold rounded"
                                                : "ml-2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded"
                                        }
                                    >
                                        {user?.isFollowing
                                            ? "Following"
                                            : "Follow"}
                                    </button>

                                </div>

                            </div>

                            {/* ================================================= */}
                            {/* RIGHT SIDE LIKE + COMMENT */}
                            {/* ================================================= */}

                            <div className="absolute right-5 bottom-20 z-20 flex flex-col items-center gap-6">

                                {/* LIKE */}

                                <div className="flex flex-col items-center">

                                    <button
                                        onClick={() =>
                                            reelLikeButton(
                                                reel.id
                                            )
                                        }
                                    >

                                        <Heart
                                            size={32}
                                            color="white"
                                            fill={
                                                reel.liked
                                                    ? "red"
                                                    : "none"
                                            }
                                        />

                                    </button>

                                    <span className="text-white text-xs font-semibold mt-1">
                                        {reel.likes}
                                    </span>

                                </div>

                                {/* COMMENT */}

                                <div className="flex flex-col items-center">

                                    <button
                                        onClick={() =>
                                            setShowComment(
                                                reel.id
                                            )
                                        }
                                    >

                                        <MessageCircle
                                            size={32}
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

                            {/* ================================================= */}
                            {/* COMMENT WINDOW */}
                            {/* ================================================= */}

                            {showComment === reel.id && (

                                <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40">

                                    <div className="w-[400px] h-[60vh] bg-white rounded-t-2xl p-5">

                                        {/* HEADER */}

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

                                        {/* COMMENTS */}

                                        <div className="h-[40vh] overflow-y-auto mt-3">

                                            {currentComments.length > 0 ? (

                                                currentComments.map(
                                                    (comment) => (

                                                        <div
                                                            key={
                                                                comment.id
                                                            }
                                                            className="flex gap-3 items-center py-3 border-b"
                                                        >

                                                            <img
                                                                src={
                                                                    user?.avatar
                                                                }
                                                                alt=""
                                                                className="w-9 h-9 rounded-full object-cover"
                                                            />

                                                            <p className="text-sm">
                                                                {
                                                                    comment.text
                                                                }
                                                            </p>

                                                        </div>

                                                    )
                                                )

                                            ) : (

                                                <p className="text-gray-500 text-sm mt-5">
                                                    No comments yet
                                                </p>

                                            )}

                                        </div>

                                        {/* INPUT */}

                                        <div className="flex gap-2 mt-3">

                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                value={input}
                                                onChange={(e) =>
                                                    setInput(
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

        </div>
    );
};

export default ReelsPage;