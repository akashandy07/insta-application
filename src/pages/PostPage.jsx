import React, { useState } from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import StoryPage from "./StoryPage";
import { useLikeLogic } from "../custom/LikeLogic";
import { Heart, MessageCircle, X } from "lucide-react";
import { useCommentPage } from "../custom/CommentLogics";
import akash from "../assets/akash.jpeg";

const PostPage = () => {

    // ==========================================
    // GET USER
    // ==========================================

    const getUser = (userId) =>
        users.find((user) => user.id === userId);

    // ==========================================
    // LIKE LOGIC
    // ==========================================

    const {
        postData,
        likeButton
    } = useLikeLogic();

    // ==========================================
    // COMMENT LOGIC
    // ==========================================

    const {
        comments,
        postComment,
        setInput,
        input
    } = useCommentPage();

    // ==========================================
    // STATES
    // ==========================================

    const [hide, setHide] = useState(null);

    const navigate = useNavigate();

    // ==========================================
    // STORED USER
    // ==========================================

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    // ==========================================
    // DEFAULT AVATAR
    // ==========================================

    const userAvatar =
        storedUser?.avatar || akash;

    return (

        <div className="w-[400px] mx-auto overflow-y-auto">

            {/* STORY */}

            <StoryPage />

            <div className="max-w-[380px] mx-auto mt-5">

                {postData.map((i) => {

                    const user = getUser(i.userId);

                    // ==========================================
                    // GET COMMENTS FOR THIS POST
                    // ==========================================

                    const currentComments =
                        comments.find(
                            (post) =>
                                post.id === i.id
                        )?.comments || [];

                    return (

                        <div
                            key={i.id}
                            className="mb-6 border-b border-gray-200 pb-6"
                        >

                            {/* ==========================================
                                USER HEADER
                            ========================================== */}

                            <div className="flex items-center gap-3 mb-3">

                                <img
                                    src={
                                        user?.avatar ||
                                        akash
                                    }
                                    alt={
                                        user?.username ||
                                        "user"
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/ProfilePage/${user?.id}`
                                        )
                                    }
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                />

                                <div>

                                    <h3 className="font-semibold text-sm">

                                        {user?.username}

                                    </h3>

                                    <p className="text-xs text-gray-500">

                                        {user?.name}

                                    </p>

                                </div>

                            </div>


                            {/* ==========================================
                                POST IMAGE
                            ========================================== */}

                            <img
                                src={i.image}
                                alt={i.caption}
                                className="w-full h-auto object-cover rounded-lg"
                            />


                            {/* ==========================================
                                LIKE & COMMENT
                            ========================================== */}

                            <div className="flex gap-5 pt-3">

                                {/* LIKE */}

                                <div
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() =>
                                        likeButton(i.id)
                                    }
                                >

                                    <Heart
                                        size={20}
                                        fill={
                                            i.liked
                                                ? "red"
                                                : "none"
                                        }
                                        color={
                                            i.liked
                                                ? "red"
                                                : "black"
                                        }
                                    />

                                    <span className="text-xs font-semibold">

                                        {i.likes}

                                    </span>

                                </div>


                                {/* COMMENT */}

                                <div
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() =>
                                        setHide(
                                            hide === i.id
                                                ? null
                                                : i.id
                                        )
                                    }
                                >

                                    <MessageCircle
                                        size={20}
                                    />

                                    <span className="text-xs font-semibold">

                                        {currentComments.length}

                                    </span>

                                </div>

                            </div>


                            {/* ==========================================
                                CAPTION
                            ========================================== */}

                            <div className="mt-2">

                                <h1 className="font-semibold text-sm">

                                    {i.caption}

                                </h1>

                            </div>


                            {/* ==========================================
                                TIMESTAMP
                            ========================================== */}

                            <div className="mt-1">

                                <h1 className="text-xs text-gray-500">

                                    {i.timestamp}

                                </h1>

                            </div>


                            {/* ==========================================
                                COMMENT POPUP
                            ========================================== */}

                            {hide === i.id && (

                                <div className="fixed inset-0   z-30 flex items-end justify-center bg-black/30 z-50">

                                    <div className="bg-white w-[380px] h-[60vh] rounded-t-xl p-5 shadow-lg">

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


                                        {/* ==========================================
                                            COMMENTS
                                        ========================================== */}

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

                                                            {/* MY DEFAULT AVATAR */}

                                                            <img
                                                                src={
                                                                    userAvatar
                                                                }
                                                                alt={
                                                                    storedUser?.username ||
                                                                    "user"
                                                                }
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />

                                                            <div>

                                                                <p className="text-xs font-semibold">

                                                                    {storedUser?.username ||
                                                                        "username"}

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

                                                <p className="text-xs text-gray-500">

                                                    No comments yet

                                                </p>

                                            )}

                                        </div>


                                        {/* ==========================================
                                            INPUT
                                        ========================================== */}

                                        <div className="flex gap-2 mt-4 ">

                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                value={input}
                                                onChange={(e) =>
                                                    setInput(
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm"
                                            />

                                            <button
                                                onClick={() => {
                                                    postComment(
                                                        i.id
                                                    );
                                                }}
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

        </div>
    );
};

export default PostPage;