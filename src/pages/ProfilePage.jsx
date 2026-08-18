import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useFollowLogics } from "../custom/FollowLogics";
import { useLikeLogic } from "../custom/LikeLogic";
import { useReelCommentLogic } from "../custom/ReelCommentLogic";
import { useReelLikeLogic } from "../custom/ReelLikeLogic";
import { useCommentPage } from "../custom/CommentLogics";

import {
    Heart,
    MessageCircle,
    X,
} from "lucide-react";

import SuggestionPage from "./SuggestionPage";

import akash from "../assets/akash.jpeg";

const ProfilePage = () => {

    // ================= FOLLOW =================

    const {
        data,
        toggleFollow
    } = useFollowLogics();


    // ================= URL ID =================

    const { id } = useParams();

    const navigate = useNavigate();

    const userId = parseInt(id);


    // ================= POST LIKE =================

    const {
        postData,
        likeButton,
    } = useLikeLogic();


    // ================= POST COMMENTS =================

    const {
        comments,
        postComment,
        setInput: setPostInput,
        input: postInput,
    } = useCommentPage();


    // ================= REEL LIKE =================

    const {
        reelData,
        reelLikeButton,
    } = useReelLikeLogic();


    // ================= REEL COMMENTS =================

    const {
        reelComments,
        postReelComment,
        setInput: setReelInput,
        input: reelInput,
    } = useReelCommentLogic();


    // ================= STATES =================

    const [show, setShow] = useState(false);

    const [hide, setHide] = useState(null);

    const [activeTab, setActiveTab] = useState("posts");

    // true = grid
    // false = normal
    const [grid, setGrid] = useState(true);

    // Number of items currently rendered
    const [visiblePosts, setVisiblePosts] = useState(6);

    const [visibleReels, setVisibleReels] = useState(4);


    // ================= STORED USER =================

    const [storedUser, setStoredUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    // ================= UPDATE USER =================

    useEffect(() => {

        const handleStorage = () => {

            const savedUser =
                localStorage.getItem("user");

            if (savedUser) {

                setStoredUser(
                    JSON.parse(savedUser)
                );

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


    // ================= DEFAULT USER =================

    const defaultUser = {

        id: userId,

        name: "User",

        username: "user",

        pronouns: "",

        bio: "No bio available",

        links: "",

        avatar: akash,

        followers: 0,

        following: 0,

        isFollowing: false,
    };


    // ================= FIND USER =================

    const foundUser = data.find(
        (item) => item.id === userId
    );


    // ================= FINAL USER =================

    let user;

    if (
        storedUser &&
        storedUser.id === userId
    ) {

        user = {

            ...defaultUser,

            ...foundUser,

            ...storedUser,

            avatar:
                storedUser.avatar ||
                foundUser?.avatar ||
                akash,
        };

    } else if (foundUser) {

        user = {

            ...defaultUser,

            ...foundUser,

            avatar:
                foundUser.avatar ||
                akash,
        };

    } else {

        user = {

            ...defaultUser,

            avatar: akash,

        };

    }


    // ================= USER POSTS =================

    const getpost = postData.filter(
        (post) =>
            post.userId === userId
    );


    // ================= USER REELS =================

    const userReels = reelData.filter(
        (reel) =>
            reel.userId === userId
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


    // ================= GET POST COMMENTS =================

    function getPostComments(postId) {

        const post = comments.find(
            (item) =>
                item.id === postId
        );

        return post?.comments || [];
    }


    // =================================================
    // USE IN VIEW
    // =================================================

    // POSTS GRID

    const {
        ref: postsGridRef,
        inView: postsGridInView
    } = useInView({
        threshold: 0.1,
    });


    // POSTS NORMAL

    const {
        ref: postsNormalRef,
        inView: postsNormalInView
    } = useInView({
        threshold: 0.1,
    });


    // REELS GRID

    const {
        ref: reelsGridRef,
        inView: reelsGridInView
    } = useInView({
        threshold: 0.1,
    });


    // ================= RESET VISIBLE COUNT =================

    useEffect(() => {

        setVisiblePosts(6);

        setVisibleReels(4);

    }, [userId]);


    // ================= LOAD MORE POSTS GRID =================

    useEffect(() => {

        if (
            activeTab === "posts" &&
            grid &&
            postsGridInView &&
            visiblePosts < getpost.length
        ) {

            setVisiblePosts((current) =>
                Math.min(
                    current + 6,
                    getpost.length
                )
            );

        }

    }, [
        activeTab,
        grid,
        postsGridInView,
        visiblePosts,
        getpost.length,
    ]);


    // ================= LOAD MORE POSTS NORMAL =================

    useEffect(() => {

        if (
            activeTab === "posts" &&
            !grid &&
            postsNormalInView &&
            visiblePosts < getpost.length
        ) {

            setVisiblePosts((current) =>
                Math.min(
                    current + 6,
                    getpost.length
                )
            );

        }

    }, [
        activeTab,
        grid,
        postsNormalInView,
        visiblePosts,
        getpost.length,
    ]);


    // ================= LOAD MORE REELS =================

    useEffect(() => {

        if (
            activeTab === "reels" &&
            grid &&
            reelsGridInView &&
            visibleReels < userReels.length
        ) {

            setVisibleReels((current) =>
                Math.min(
                    current + 4,
                    userReels.length
                )
            );

        }

    }, [
        activeTab,
        grid,
        reelsGridInView,
        visibleReels,
        userReels.length,
    ]);


    return (

        <div className="w-[400px] mx-auto min-h-[80vh] bg-white overflow-x-auto scrollbar-none overflow-y-auto">


            {/* ================================================= */}
            {/* PROFILE HEADER */}
            {/* ================================================= */}

            <div className="border-b border-gray-300 pb-8">

                <div className="max-w-[380px] mx-auto pt-8">


                    {/* PROFILE INFO */}

                    <div className="flex gap-10 mb-3 items-center">


                        {/* PROFILE IMAGE */}

                        <div className="flex-shrink-0">

                            <div className="w-20 h-20 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">

                                <img
                                    src={
                                        user?.avatar ||
                                        akash
                                    }
                                    alt={
                                        user?.username ||
                                        "User"
                                    }
                                    className="w-full h-full rounded-full object-cover"
                                />

                            </div>

                        </div>


                        {/* COUNTS */}

                        <div className="flex-1">

                            <div className="flex gap-10">


                                {/* POSTS */}

                                <div>

                                    <p className="font-bold text-base">
                                        {getpost.length}
                                    </p>

                                    <p className="text-gray-600 text-xs">
                                        posts
                                    </p>

                                </div>


                                {/* FOLLOWERS */}

                                <div>

                                    <p className="font-bold text-base">
                                        {user?.followers || 0}
                                    </p>

                                    <p className="text-gray-600 text-xs">
                                        followers
                                    </p>

                                </div>


                                {/* FOLLOWING */}

                                <div>

                                    <p className="font-bold text-base">
                                        {user?.following || 0}
                                    </p>

                                    <p className="text-gray-600 text-xs">
                                        following
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* NAME */}

                    <div>

                        <p className="font-semibold text-sm">
                            {user?.name || "User"}
                        </p>


                        {/* USERNAME */}

                        <p className="text-gray-500 text-xs">
                            @{user?.username || "user"}
                        </p>


                        {/* PRONOUNS */}

                        {user?.pronouns && (

                            <p className="text-gray-500 text-xs">
                                {user.pronouns}
                            </p>

                        )}


                        {/* BIO */}

                        <p className="text-gray-700 text-xs mt-1">
                            {user?.bio || "No bio available"}
                        </p>


                        {/* LINKS */}

                        {user?.links && (

                            <p className="text-blue-500 text-xs mt-1">
                                {user.links}
                            </p>

                        )}

                    </div>


                    {/* BUTTONS */}

                    <div className="flex pt-6 justify-around">


                        {/* FOLLOW */}

                        <button
                            onClick={() =>
                                toggleFollow(user.id)
                            }
                            className={
                                user.isFollowing
                                    ? "px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-xs w-[120px]"
                                    : "px-8 py-1.5 bg-blue-500 text-white font-semibold rounded text-xs w-[120px]"
                            }
                        >

                            {user.isFollowing
                                ? "Unfollow"
                                : "Follow"}

                        </button>


                        {/* MESSAGE */}

                        <button
                            onClick={() =>
                                navigate(
                                    `/messages/${user.id}`
                                )
                            }
                            className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-xs w-[120px]"
                        >
                            Message
                        </button>


                        {/* SUGGESTIONS */}

                        <button
                            onClick={() =>
                                setShow(true)
                            }
                            className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-xs w-[40px]"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* SUGGESTIONS */}
            {/* ================================================= */}

            {show && (
                <SuggestionPage />
            )}


            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

            <div className="max-w-[380px] mx-auto border-b border-gray-300">

                <div className="flex justify-between">

                    {tabs.map(
                        ({ key, label }) => (

                            <button
                                key={key}
                                onClick={() =>
                                    setActiveTab(key)
                                }
                                className={`
                                    flex-1
                                    py-3
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    ${activeTab === key
                                        ? "text-black border-b-2 border-black"
                                        : "text-gray-600"
                                    }
                                `}
                            >
                                {label}
                            </button>

                        )
                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* POSTS */}
            {/* ================================================= */}

            {activeTab === "posts" && (

                <div className="max-w-[380px] mx-auto py-5">

                    {getpost.length > 0 ? (

                        grid ? (

                            /* ================= GRID ================= */

                            <div className="grid grid-cols-2 gap-4">

                                {getpost
                                    .slice(0, visiblePosts)
                                    .map((p) => (

                                        <div
                                            key={p.id}
                                            className="w-[170px] h-[160px]"
                                        >

                                            <img
                                                src={p.image}
                                                alt={p.caption}
                                                onClick={() =>
                                                    setGrid(false)
                                                }
                                                className="w-[170px] h-[160px] object-cover cursor-pointer"
                                            />

                                        </div>

                                    ))}


                                {/* USE IN VIEW */}

                                <div
                                    ref={postsGridRef}
                                    className="col-span-2 h-4"
                                />

                            </div>

                        ) : (

                            /* ================= NORMAL VIEW ================= */

                            <div className="flex flex-col gap-8">

                                {getpost
                                    .slice(0, visiblePosts)
                                    .map((p) => {

                                        const currentComments =
                                            getPostComments(
                                                p.id
                                            );

                                        return (

                                            <div
                                                key={p.id}
                                                className="border-b border-gray-200 pb-6"
                                            >


                                                {/* POST USER */}

                                                <div className="flex items-center gap-3 mb-3">

                                                    <img
                                                        src={
                                                            user?.avatar ||
                                                            akash
                                                        }
                                                        alt={
                                                            user?.username ||
                                                            "User"
                                                        }
                                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                                        onClick={() =>
                                                            navigate(
                                                                `/ProfilePage/${user.id}`
                                                            )
                                                        }
                                                    />

                                                    <div>

                                                        <p className="font-semibold text-sm">
                                                            {
                                                                user?.username ||
                                                                "user"
                                                            }
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                user?.name ||
                                                                "User"
                                                            }
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* POST IMAGE */}

                                                <img
                                                    src={p.image}
                                                    alt={p.caption}
                                                    onClick={() =>
                                                        setGrid(true)
                                                    }
                                                    className="w-[370px] h-[70vh] object-cover rounded-lg cursor-pointer"
                                                />


                                                {/* LIKE + COMMENT */}

                                                <div className="flex gap-5 pt-3">


                                                    {/* LIKE */}

                                                    <div
                                                        className="flex items-center gap-1 cursor-pointer"
                                                        onClick={() =>
                                                            likeButton(
                                                                p.id
                                                            )
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

                                                        <span className="text-xs font-semibold">
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

                                                        <span className="text-xs font-semibold">
                                                            {
                                                                currentComments.length
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* COMMENT POPUP */}

                                                {hide === p.id && (

                                                    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">

                                                        <div className="bg-white w-[400px] h-[60vh] rounded-t-xl p-5 shadow-lg">


                                                            {/* HEADER */}

                                                            <div className="flex items-center justify-between border-b pb-3">

                                                                <h2 className="text-base font-bold">
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
                                                                                        comment.avatar ||
                                                                                        akash
                                                                                    }
                                                                                    alt={
                                                                                        comment.username ||
                                                                                        "user"
                                                                                    }
                                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                                />

                                                                                <div>

                                                                                    <p className="text-xs font-semibold">
                                                                                        {
                                                                                            comment.username ||
                                                                                            "user"
                                                                                        }
                                                                                    </p>

                                                                                    <p className="text-xs">
                                                                                        {
                                                                                            comment.text
                                                                                        }
                                                                                    </p>

                                                                                </div>

                                                                            </div>

                                                                        )
                                                                    )

                                                                ) : (

                                                                    <p className="text-gray-500 text-xs">
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
                                                                    className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm"
                                                                />

                                                                <button
                                                                    onClick={() =>
                                                                        postComment(
                                                                            p.id
                                                                        )
                                                                    }
                                                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                                                                >
                                                                    Post
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )}


                                                {/* CAPTION */}

                                                <div className="pt-2">

                                                    <p className="text-xs">

                                                        <span className="font-semibold">
                                                            {
                                                                user?.username ||
                                                                "user"
                                                            }
                                                        </span>

                                                        {" "}

                                                        {p.caption}

                                                    </p>

                                                </div>


                                                {/* TIMESTAMP */}

                                                <div className="pt-2">

                                                    <p className="text-[11px] text-gray-500">
                                                        {p.timestamp}
                                                    </p>

                                                </div>

                                            </div>

                                        );

                                    })}


                                {/* USE IN VIEW */}

                                <div
                                    ref={postsNormalRef}
                                    className="h-4"
                                />

                            </div>

                        )

                    ) : (

                        <div className="flex justify-center items-center py-20">

                            <p className="text-gray-600 text-sm">
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

                <div className="max-w-[380px] mx-auto">

                    {userReels.length > 0 ? (

                        grid ? (

                            /* ================= REEL GRID ================= */

                            <div className="grid grid-cols-2 gap-1 py-2">

                                {userReels
                                    .slice(0, visibleReels)
                                    .map((reel) => (

                                        <div
                                            key={reel.id}
                                            className="w-[150px] h-[150px]"
                                        >

                                            <video
                                                src={reel.reel}
                                                muted
                                                playsInline
                                                loop
                                                onClick={() =>
                                                    setGrid(false)
                                                }
                                                className="w-[150px] h-[150px] object-cover cursor-pointer"
                                            />

                                        </div>

                                    ))}


                                {/* USE IN VIEW */}

                                <div
                                    ref={reelsGridRef}
                                    className="col-span-2 h-4"
                                />

                            </div>

                        ) : (

                            /* ================= REEL NORMAL ================= */

                            <div className="fixed inset-0 flex flex-col bg-black w-[400px] z-50 mx-auto right-0 h-[105vh]">

                                {userReels
                                    .slice(0, visibleReels)
                                    .map((reel) => {

                                        const currentReelComments =
                                            reelComments.find(
                                                (item) =>
                                                    item.id === reel.id
                                            )?.comments || [];

                                        return (

                                            <div
                                                key={reel.id}
                                                className="relative w-full h-[100vh] bg-black"
                                            >


                                                {/* VIDEO */}

                                                <video
                                                    src={reel.reel}
                                                    autoPlay
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
                                                    className="w-[400px] h-[100vh] object-cover cursor-pointer"
                                                />


                                                {/* BACK */}

                                                <button
                                                    onClick={() =>
                                                        setGrid(true)
                                                    }
                                                    className="absolute top-5 left-5 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-xs"
                                                >
                                                    Back
                                                </button>


                                                {/* RIGHT SIDE */}

                                                <div className="absolute right-8 bottom-20 flex flex-col items-center gap-5">


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

                                                <div className="absolute bottom-20 left-4">

                                                    <div className="flex items-center gap-4">

                                                        <img
                                                            src={
                                                                user?.avatar ||
                                                                akash
                                                            }
                                                            alt={
                                                                user?.username ||
                                                                "User"
                                                            }
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />

                                                        <div>

                                                            <p className="text-white font-semibold text-xs">
                                                                {
                                                                    user?.username
                                                                }
                                                            </p>

                                                            <p className="text-white text-xs bg-black/50">
                                                                {
                                                                    reel.caption
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* REEL COMMENT POPUP */}

                                                {hide ===
                                                    `reel-${reel.id}` && (

                                                        <div className="fixed inset-0 z-50 flex items-end justify-center">

                                                            <div className="bg-white w-[400px] h-[60vh] rounded-t-xl p-5">


                                                                {/* HEADER */}

                                                                <div className="flex items-center justify-between border-b pb-3">

                                                                    <h2 className="text-base font-bold">
                                                                        Comments
                                                                    </h2>

                                                                    <button
                                                                        onClick={() =>
                                                                            setHide(
                                                                                null
                                                                            )
                                                                        }
                                                                    >
                                                                        <X size={22} />
                                                                    </button>

                                                                </div>


                                                                {/* COMMENTS */}

                                                                <div className="mt-4 h-[40vh] overflow-y-auto">

                                                                    {currentReelComments.length > 0 ? (

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
                                                                                            storedUser?.avatar ||
                                                                                            akash
                                                                                        }
                                                                                        alt={
                                                                                            storedUser?.username ||
                                                                                            "User"
                                                                                        }
                                                                                        className="w-9 h-9 rounded-full object-cover"
                                                                                    />

                                                                                    <p className="text-xs">
                                                                                        {
                                                                                            comment.text
                                                                                        }
                                                                                    </p>

                                                                                </div>

                                                                            )
                                                                        )

                                                                    ) : (

                                                                        <p className="text-gray-500 text-xs">
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
                                                                        className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm"
                                                                    />

                                                                    <button
                                                                        onClick={() =>
                                                                            postReelComment(
                                                                                reel.id
                                                                            )
                                                                        }
                                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
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

                        )

                    ) : (

                        <div className="flex justify-center items-center py-20">

                            <p className="text-gray-600 text-sm">
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

                        <p className="text-gray-600 text-sm">
                            No tagged posts
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ProfilePage;