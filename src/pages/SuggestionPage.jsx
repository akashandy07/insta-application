import React from "react";
import { useFollowLogics } from "../custom/FollowLogics";
import { useNavigate } from "react-router-dom";

const SuggestionPage = () => {
    const { data, toggleFollow } = useFollowLogics();
    const navigate = useNavigate();

    const suggestedUsers = data.filter(
        (user) => !user.isFollowing
    );

    return (
        <div className="w-full max-w-[400px] mx-auto h-auto pt-3 pb-3">

            <div className="w-[calc(100%-20px)] max-w-[380px] mx-auto">

                <h1 className="text-base sm:text-xl font-bold mb-5">
                    Suggested for you
                </h1>

                <div className="flex gap-5 sm:gap-8 items-start overflow-x-auto scrollbar-none">

                    {suggestedUsers.length > 0 ? (

                        suggestedUsers.map((user) => (

                            <div
                                key={user.id}
                                className="flex-shrink-0 w-[90px] sm:w-[100px] text-center"
                            >

                                {/* USER */}

                                <div
                                    onClick={() =>
                                        navigate(
                                            `/ProfilePage/${user?.id}`
                                        )
                                    }
                                    className="cursor-pointer"
                                >

                                    <img
                                        src={
                                            user.avatar ||
                                            "https://i.pravatar.cc/150"
                                        }
                                        alt={user.username}
                                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover"
                                    />

                                    <p className="font-semibold text-xs sm:text-sm pt-2 pb-2 truncate">
                                        {user.username}
                                    </p>

                                </div>

                                {/* FOLLOW BUTTON */}

                                <button
                                    onClick={() =>
                                        toggleFollow(user.id)
                                    }
                                    className="w-full px-2 py-1 bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-semibold"
                                >
                                    Follow
                                </button>

                            </div>

                        ))

                    ) : (

                        <h1 className="text-sm text-gray-600">
                            No Suggestions Found
                        </h1>

                    )}

                </div>

            </div>

        </div>
    );
};

export default SuggestionPage;