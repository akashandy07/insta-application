import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFollowLogics } from "../custom/FollowLogics";
import { Reels } from "../data/Reels";
import { Heart, MessageCircle } from "lucide-react";
import { useLikeLogic } from "../custom/LikeLogic";

const ProfilePage = () => {
    const { data, toggleFollow } = useFollowLogics();
    const { id } = useParams();
    const { postData, likeButton } = useLikeLogic();
    const navigate = useNavigate();

    const user = data.find(
        (i) => i.id === parseInt(id)
    );

    const userReels = Reels.filter(
        (reel) => reel.userId === parseInt(id)
    );

    const getpost = postData.filter(
        (post) => post.userId === parseInt(id)
    );

    const [activeTab, setActiveTab] = useState("posts");

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

    return (
        <div className="w-[500px] mx-auto min-h-[100vh] bg-white overflow-x-auto scrollbar-none">

            {/* ================= PROFILE HEADER ================= */}

            <div className="border-b border-gray-300 pb-8">

                <div className="max-w-[410px] mx-auto pt-8">

                    {user ? (
                        <>
                            {/* PROFILE INFO */}

                            <div className="flex gap-10 mb-3 items-center">

                                {/* PROFILE AVATAR */}

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
                                    onClick={() => toggleFollow(user.id)}
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
                                        navigate(`/messages/${user.id}`)
                                    }
                                    className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-sm w-[120px]"
                                >
                                    Message
                                </button>

                                <button
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

            {/* ================= TABS ================= */}

            <div className="max-w-[410px] mx-auto border-b border-gray-300">

                <div className="flex justify-between">

                    {tabs.map(({ key, label }) => (

                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider ${
                                activeTab === key
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-600"
                            }`}
                        >
                            {label}
                        </button>

                    ))}

                </div>

            </div>

            {/* ================= POSTS ================= */}

            {activeTab === "posts" && (

                <div className="max-w-[410px] mx-auto py-8">

                    {getpost.length > 0 ? (

                        <div className="flex flex-col gap-8">

                            {getpost.map((p) => (

                                <div
                                    key={p.id}
                                    className="border-b border-gray-200 pb-6"
                                >

                                    {/* ================= POST USER HEADER ================= */}

                                    <div className="flex items-center gap-3 mb-3">

                                        {/* AVATAR */}

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

                                        {/* USERNAME + NAME */}

                                        <div>

                                            <p className="font-semibold text-sm">
                                                {user.username}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {user.name}
                                            </p>

                                        </div>

                                    </div>

                                    {/* ================= POST IMAGE ================= */}

                                    <img
                                        src={p.image}
                                        alt={p.caption}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />

                                    {/* ================= LIKE + COMMENT ================= */}

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

                                        <div className="flex items-center gap-1">

                                            <MessageCircle
                                                size={20}
                                            />

                                            <span className="text-sm font-semibold">
                                                {p.comments}
                                            </span>

                                        </div>

                                    </div>

                                    {/* ================= CAPTION ================= */}

                                    <div className="pt-2">

                                        <p className="text-sm">
                                            <span className="font-semibold">
                                                {user.username}
                                            </span>{" "}
                                            {p.caption}
                                        </p>

                                    </div>

                                    {/* ================= TIMESTAMP ================= */}

                                    <div className="pt-2">

                                        <p className="text-xs text-gray-500">
                                            {p.timestamp}
                                        </p>

                                    </div>

                                </div>

                            ))}

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

            {/* ================= REELS ================= */}

            {activeTab === "reels" && (

                <div className="max-w-[410px] mx-auto py-8">

                    {userReels.length > 0 ? (

                        <div className="grid grid-cols-3 gap-4">

                            {userReels.map((reel) => (

                                <div
                                    key={reel.id}
                                    className="aspect-square cursor-pointer"
                                >

                                    <video
                                        src={reel.video}
                                        className="w-full h-full object-cover rounded"
                                    />

                                </div>

                            ))}

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

            {/* ================= TAGGED ================= */}

            {activeTab === "tagged" && (

                <div className="max-w-[410px] mx-auto py-8">

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