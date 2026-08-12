import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFollowLogics } from "../custom/FollowLogics";
import { useLikeLogic } from "../custom/LikeLogic";
import { useReelCommentLogic } from "../custom/ReelCommentLogic";
import { useReelLikeLogic } from "../custom/ReelLikeLogic";

import { reels } from "../data/Reels";

import {
    Heart,
    MessageCircle,
    X,
} from "lucide-react";

import SuggestionPage from "./SuggestionPage";


const ProfilePage = () => {

    const { data, toggleFollow } = useFollowLogics();

    const { id } = useParams();

    const navigate = useNavigate();

    // ================= POST LIKE =================

    const {
        postData,
        likeButton
    } = useLikeLogic();


    // ================= REEL LIKE =================

    const {
        reelData,
        reelLikeButton
    } = useReelLikeLogic();


    // ================= REEL COMMENTS =================

    const {
        reelComments,
        postReelComment,
        setInput: setReelInput,
        input: reelInput
    } = useReelCommentLogic();


    // ================= STATES =================

    const [show, setShow] = useState(false);

    const [hide, setHide] = useState(null);

    const [activeTab, setActiveTab] = useState("posts");


    // ================= POST COMMENTS =================

    const [postComments, setPostComments] = useState(() => {

        const savedComments =
            localStorage.getItem("postComments");

        if (savedComments) {
            return JSON.parse(savedComments);
        }

        return [];
    });


    const [postInput, setPostInput] = useState("");


    // Save post comments

    useEffect(() => {

        localStorage.setItem(
            "postComments",
            JSON.stringify(postComments)
        );

    }, [postComments]);


    // ================= USER =================

    const user = data.find(
        (item) => item.id === parseInt(id)
    );


    // ================= USER REELS =================

    const userReels = reelData.filter(
        (reel) =>
            reel.userId === parseInt(id)
    );


    // ================= USER POSTS =================

    const getpost = postData.filter(
        (post) =>
            post.userId === parseInt(id)
    );


    // ================= STORED USER =================

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );


    // ================= TABS =================

    const tabs = [
        {
            key: "posts",
            label: "POSTS",
        },
        {
            key: "reels",
            label: "REELS",
        },
        {
            key: "tagged",
            label: "TAGGED",
        },
    ];


    // ================= POST COMMENT =================

    function postComment(postId) {

        if (!postInput.trim()) return;

        setPostComments((prev) => [

            ...prev,

            {
                id: Date.now(),
                postId: postId,
                text: postInput,
            },

        ]);

        setPostInput("");
    }


    // ================= GET POST COMMENTS =================

    function getPostComments(postId) {

        return postComments.filter(
            (comment) =>
                comment.postId === postId
        );
    }


    return (

        <div className="w-[400px] mx-auto min-h-[80vh] bg-white overflow-x-auto scrollbar-none">


            {/* ================================================= */}
            {/* PROFILE HEADER */}
            {/* ================================================= */}

            <div className="border-b border-gray-300 pb-8">

                <div className="max-w-[380px] mx-auto pt-8">

                    {user ? (

                        <>

                            {/* PROFILE INFO */}

                            <div className="flex gap-10 mb-3 items-center">

                                <div className="flex-shrink-0">

                                    <div className="w-20 h-20 rounded-full border-4 border-gray-300 bg-gradient-to-tr from-yellow-400 to-pink-600 flex items-center justify-center">

                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="w-full h-full rounded-full object-cover"
                                        />

                                    </div>

                                </div>


                                {/* POSTS / FOLLOWERS / FOLLOWING */}

                                <div className="flex-1">

                                    <div className="flex gap-10">

                                        <div>

                                            <p className="font-bold text-lg">
                                                {getpost.length}
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                posts
                                            </p>

                                        </div>


                                        <div>

                                            <p className="font-bold text-lg">
                                                {user.followers}
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                followers
                                            </p>

                                        </div>


                                        <div>

                                            <p className="font-bold text-lg">
                                                {user.following}
                                            </p>

                                            <p className="text-gray-600 text-sm">
                                                following
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* NAME + BIO */}

                            <div>

                                <p className="font-semibold text-sm">
                                    {user.name}
                                </p>

                                <p className="text-gray-700 text-sm">
                                    {user.bio}
                                </p>

                            </div>


                            {/* BUTTONS */}

                            <div className="flex pt-6 justify-around">

                                <button
                                    onClick={() =>
                                        toggleFollow(user.id)
                                    }
                                    className={
                                        user.isFollowing
                                            ? "px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-sm w-[120px]"
                                            : "px-8 py-1.5 bg-blue-500 text-white font-semibold rounded text-sm w-[120px]"
                                    }
                                >
                                    {user.isFollowing
                                        ? "Unfollow"
                                        : "Follow"}
                                </button>


                                <button
                                    onClick={() =>
                                        navigate(
                                            `/messages/${user.id}`
                                        )
                                    }
                                    className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-sm w-[120px]"
                                >
                                    Message
                                </button>


                                <button
                                    onClick={() =>
                                        setShow(true)
                                    }
                                    className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-sm w-[40px]"
                                >
                                    +
                                </button>

                            </div>

                        </>

                    ) : (

                        <p className="text-center py-8">
                            User not found
                        </p>

                    )}

                </div>

            </div>


            {/* SUGGESTIONS */}

            {show && (
                <SuggestionPage />
            )}


            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

            <div className="max-w-[380px]  mx-auto border-b border-gray-300">

                <div className="flex justify-between">

                    {tabs.map(({ key, label }) => (

                        <button
                            key={key}
                            onClick={() =>
                                setActiveTab(key)
                            }
                            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider ${activeTab === key
                                ? "text-black border-b-2 border-black"
                                : "text-gray-600"
                                }`}
                        >
                            {label}
                        </button>

                    ))}

                </div>

            </div>


            {/* ================================================= */}
            {/* POSTS */}
            {/* ================================================= */}

            {activeTab === "posts" && (

                <div className="max-w-[380px] mx-auto py-8">

                    {getpost.length > 0 ? (

                        <div className="flex flex-col gap-8">

                            {getpost.map((p) => {

                                const currentComments =
                                    getPostComments(p.id);

                                return (

                                    <div
                                        key={p.id}
                                        className="border-b border-gray-200 pb-6"
                                    >


                                        {/* POST USER */}

                                        <div className="flex items-center gap-3 mb-3">

                                            <img
                                                src={user.avatar}
                                                alt={user.username}
                                                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                                onClick={() =>
                                                    navigate(
                                                        `/ProfilePage/${user.id}`
                                                    )
                                                }
                                            />


                                            <div>

                                                <p className="font-semibold text-sm">
                                                    {user.username}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {user.name}
                                                </p>

                                            </div>

                                        </div>


                                        {/* POST IMAGE */}

                                        <img
                                            src={p.image}
                                            alt={p.caption}
                                            className="w-full h-auto object-cover rounded-lg"
                                        />


                                        {/* LIKE + COMMENT */}

                                        <div className="flex gap-5 pt-3">


                                            {/* LIKE */}

                                            <div
                                                className="flex items-center gap-1 cursor-pointer"
                                                onClick={() =>
                                                    likeButton(p.id)
                                                }
                                            >

                                                <Heart
                                                    size={20}
                                                    fill={
                                                        p.liked
                                                            ? "red"
                                                            : "none"
                                                    }
                                                    color={
                                                        p.liked
                                                            ? "red"
                                                            : "black"
                                                    }
                                                />

                                                <span className="text-sm font-semibold">
                                                    {p.likes}
                                                </span>

                                            </div>


                                            {/* COMMENT */}

                                            <div
                                                className="flex items-center gap-1 cursor-pointer"
                                                onClick={() =>
                                                    setHide(
                                                        hide === p.id
                                                            ? null
                                                            : p.id
                                                    )
                                                }
                                            >

                                                <MessageCircle
                                                    size={20}
                                                />

                                                <span className="text-sm font-semibold">
                                                    {
                                                        currentComments.length
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* ================================================= */}
                                        {/* POST COMMENT POPUP */}
                                        {/* ================================================= */}

                                        {hide === p.id && (

                                            <div className="fixed inset-0 z-50 flex items-end justify-center">

                                                <div className="bg-white w-[400px] h-[60vh] rounded-t-xl p-5 shadow-lg">


                                                    {/* HEADER */}

                                                    <div className="flex items-center justify-between border-b pb-3">

                                                        <h2 className="text-lg font-bold">
                                                            Comments
                                                        </h2>

                                                        <button
                                                            onClick={() =>
                                                                setHide(null)
                                                            }
                                                        >
                                                            <X size={22} />
                                                        </button>

                                                    </div>


                                                    {/* COMMENTS */}

                                                    <div className="mt-4 h-[40vh] overflow-y-auto">

                                                        {currentComments.length > 0 ? (

                                                            currentComments.map(
                                                                (comment) => (

                                                                    <div
                                                                        key={
                                                                            comment.id
                                                                        }
                                                                        className="py-2 border-b flex items-center gap-5"
                                                                    >

                                                                        <img
                                                                            src={
                                                                                storedUser?.avatar
                                                                            }
                                                                            alt=""
                                                                            className="w-10 h-10 rounded-full object-cover"
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

                                                            <p className="text-gray-500 text-sm">
                                                                No comments yet
                                                            </p>

                                                        )}

                                                    </div>


                                                    {/* INPUT */}

                                                    <div className="flex gap-2 mt-4">

                                                        <input
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            value={
                                                                postInput
                                                            }
                                                            onChange={(e) =>
                                                                setPostInput(
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="flex-1 border rounded-lg px-3 py-2 outline-none"
                                                        />


                                                        <button
                                                            onClick={() =>
                                                                postComment(
                                                                    p.id
                                                                )
                                                            }
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Post
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        )}


                                        {/* CAPTION */}

                                        <div className="pt-2">

                                            <p className="text-sm">

                                                <span className="font-semibold">
                                                    {user.username}
                                                </span>

                                                {" "}

                                                {p.caption}

                                            </p>

                                        </div>


                                        {/* TIMESTAMP */}

                                        <div className="pt-2">

                                            <p className="text-xs text-gray-500">
                                                {p.timestamp}
                                            </p>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    ) : (

                        <div className="flex justify-center items-center py-20">

                            <p className="text-gray-600">
                                No posts yet
                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* ================================================= */}
            {/* REELS */}
            {/* ================================================= */}

            {activeTab === "reels" && (

                <div className="py-2 h-50vh">

                    {userReels.length > 0 ? (

                        <div className="flex flex-col">

                            {userReels.map((reel) => {

                                const currentReelComments =
                                    reelComments.find(
                                        (item) =>
                                            item.id === reel.id
                                    )?.comments || [];


                                return (

                                    <div
                                        key={reel.id}
                                        className="relative w-full h-auto bg-white "
                                    >


                                        {/* VIDEO */}

                                        <video
                                            src={reel.reel}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            onClick={(e) => {
                                                if (e.currentTarget.paused) {
                                                    e.currentTarget.play();
                                                } else {
                                                    e.currentTarget.pause();
                                                }
                                            }}
                                            className="w-full h-[50vh] object-cover cursor-pointer"
                                        />


                                        {/* RIGHT SIDE */}

                                        <div className="absolute right-3 bottom-10 flex flex-col items-center gap-5" >

                                            {/* LIKE */}

                                            <div className="flex flex-col items-center">

                                                <button
                                                    onClick={() =>
                                                        reelLikeButton(
                                                            reel.id
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >

                                                    <Heart
                                                        size={30}
                                                        fill={
                                                            reel.liked
                                                                ? "red"
                                                                : "white"
                                                        }
                                                        color={
                                                            reel.liked
                                                                ? "red"
                                                                : "white"
                                                        }
                                                    />

                                                </button>


                                                <span className="text-white text-xs font-semibold">
                                                    {reel.likes}
                                                </span>

                                            </div>


                                            {/* COMMENT */}

                                            <div className="flex flex-col items-center">

                                                <button
                                                    onClick={() =>
                                                        setHide(
                                                            hide ===
                                                                `reel-${reel.id}`
                                                                ? null
                                                                : `reel-${reel.id}`
                                                        )
                                                    }
                                                >

                                                    <MessageCircle
                                                        size={30}
                                                        color="white"
                                                    />

                                                </button>


                                                <span className="text-white text-xs font-semibold">
                                                    {
                                                        currentReelComments.length
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* USER INFO */}

                                        <div className="absolute bottom-10 left-4">

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={
                                                        user?.avatar
                                                    }
                                                    alt=""
                                                    className="w-15 h-15 rounded-full object-cover"
                                                />

                                                <p className="text-white font-semibold text-sm">
                                                    {user?.username}
                                                </p>
                                                <p className="bg-black">{reel.caption}</p>

                                            </div>

                                        </div>


                                        {/* ================================================= */}
                                        {/* REEL COMMENT POPUP */}
                                        {/* ================================================= */}

                                        {hide ===
                                            `reel-${reel.id}` && (

                                                <div className="fixed inset-0 z-50 flex items-end justify-center">

                                                    <div className="bg-white w-[400px] h-[60vh] rounded-t-xl p-5">


                                                        {/* HEADER */}

                                                        <div className="flex items-center justify-between border-b pb-3">

                                                            <h2 className="text-lg font-bold">
                                                                Comments
                                                            </h2>

                                                            <button
                                                                onClick={() =>
                                                                    setHide(null)
                                                                }
                                                            >
                                                                <X size={22} />
                                                            </button>

                                                        </div>


                                                        {/* COMMENTS */}

                                                        <div className="mt-4 h-[40vh] overflow-y-auto">

                                                            {currentReelComments.length >
                                                                0 ? (

                                                                currentReelComments.map(
                                                                    (comment) => (

                                                                        <div
                                                                            key={
                                                                                comment.id
                                                                            }
                                                                            className="flex items-center gap-3 py-3 border-b"
                                                                        >

                                                                            <img
                                                                                src={
                                                                                    storedUser?.avatar
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

                                                                <p className="text-gray-500 text-sm">
                                                                    No comments yet
                                                                </p>

                                                            )}

                                                        </div>


                                                        {/* INPUT */}

                                                        <div className="flex gap-2 mt-4">

                                                            <input
                                                                type="text"
                                                                placeholder="Add a comment..."
                                                                value={
                                                                    reelInput
                                                                }
                                                                onChange={(e) =>
                                                                    setReelInput(
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
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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

                    ) : (

                        <div className="flex justify-center items-center py-20">

                            <p className="text-gray-600">
                                No reels yet
                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* ================================================= */}
            {/* TAGGED */}
            {/* ================================================= */}

            {activeTab === "tagged" && (

                <div className="max-w-[380px] mx-auto py-8">

                    <div className="flex justify-center items-center py-20">

                        <p className="text-gray-600">
                            No tagged posts
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ProfilePage;