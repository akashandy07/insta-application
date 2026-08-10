
import React, { useState } from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import StoryPage from "./StoryPage";
import { useLikeLogic } from "../custom/LikeLogic";
import { Heart, MessageCircle, X } from "lucide-react";
import { useCommentPage } from "../custom/CommentLogics";

const PostPage = () => {

    const getUser = (userId) =>
        users.find((user) => user.id === userId);

    const { postData, likeButton } = useLikeLogic();

    const { comments, postComment, setInput, input } = useCommentPage();

    const [hide, setHide] = useState(null);
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));


    return (
        <div className="w-[400px] mx-auto">

            <StoryPage />

            <div className="max-w-[380px] mx-auto mt-5">

                {postData.map((i) => {

                    const user = getUser(i.userId);

                    return (
                        <div
                            key={i.id}
                            className="mb-6 border-b border-gray-200 pb-6"
                        >

                            {/* USER HEADER */}

                            <div className="flex items-center gap-3 mb-3">

                                <img
                                    src={user?.avatar}
                                    alt={user?.username}
                                    onClick={() =>
                                        navigate(
                                            `/ProfilePage/${user?.id}`
                                        )
                                    }
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                />

                                <div>

                                    <h3 className="font-semibold">
                                        {user?.username}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        {user?.name}
                                    </p>

                                </div>

                            </div>


                            {/* POST IMAGE */}

                            <img
                                src={i.image}
                                alt={i.caption}
                                className="w-full h-auto object-cover rounded-lg"
                            />


                            {/* LIKE & COMMENT */}

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

                                    <span className="text-sm font-semibold">
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

                                    <MessageCircle size={20} />

                                    <span className="text-sm font-semibold">
                                        {comments.find(post => post.id === i.id)?.comments?.length || 0}
                                    </span>

                                </div>

                            </div>


                            {/* CAPTION */}

                            <div className="mt-2">

                                <h1 className="font-semibold">
                                    {i.caption}
                                </h1>

                            </div>


                            {/* TIMESTAMP */}

                            <div className="mt-1">

                                <h1 className="text-sm text-gray-500">
                                    {i.timestamp}
                                </h1>

                            </div>


                            {/* COMMENT POPUP */}

                            {hide === i.id && (

                                <div className=" fixed bottom-18 flex items-center justify-center z-30 overflow-y-auto">

                                    <div className="bg-white w-[380px] h-[60vh]  rounded-xl p-5 shadow-lg">

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

                                        <div className="mt-4 max-h-[400px] overflow-y-auto">

                                            {comments
                                                .find(
                                                    (post) =>
                                                        post.id === i.id
                                                )
                                                ?.comments?.length > 0 ? (

                                                comments
                                                    .find(
                                                        (post) =>
                                                            post.id === i.id
                                                    )
                                                    .comments.map(
                                                        (comment) => (

                                                            <div key={comment.id} className="py-2 border-b flex items-center gap-5">
                                                                <div>
                                                                    <img
                                                                        src={storedUser?.avatar}
                                                                        alt={storedUser?.username}
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                    />
                                                                </div>
                                                                <p className="text-sm">
                                                                    {
                                                                        comment.text

                                                                    }
                                                                </p>
                                                                <h1>{ }</h1>

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

                                        <div className="flex gap-2 mt-4 h-1000px">

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
                                                    postComment(i.id)
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

        </div>
    );
};

export default PostPage;
