import React from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import StoryPage from "./StoryPage";
import { useLikeLogic } from "../custom/LikeLogic";
import { Heart, MessageCircle } from "lucide-react";
const PostPage = () => {
    const getUser = (userId) =>
        users.find((user) => user.id === userId);

    const { postData, likeButton } = useLikeLogic();

    const navigate = useNavigate();

    return (
        <div className="w-[500px] mx-auto">
            <StoryPage />

            <div className="max-w-[410px] mx-auto mt-5 overflow-x-auto scrollbar-none">

                {postData.map((i) => {
                    const user = getUser(i.userId);

                    return (
                        <div
                            key={i.id}
                            className="mb-6 border-b border-gray-200 pb-6 overflow-x-auto scrollbar-none"
                        >

                            {/* USER HEADER */}
                            <div className="flex items-center gap-3 mb-3">

                                <img
                                    src={user?.avatar}
                                    alt={user?.username}
                                    onClick={() =>
                                        navigate(`/ProfilePage/${user?.id}`)
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

                                <div className="flex items-center gap-1">

                                    <MessageCircle
                                        size={20}
                                    />

                                    <span className="text-sm font-semibold">
                                        {i.comments}
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

                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default PostPage;