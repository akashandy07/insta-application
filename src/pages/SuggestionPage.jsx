import React from "react";
import { useFollowLogics } from "../custom/FollowLogics";
import { useNavigate } from "react-router-dom";
const SuggestionPage = () => {
    const { data, toggleFollow } = useFollowLogics();
    const navigate = useNavigate();
    const suggestedUsers = data.filter((user) => !user.isFollowing);

    return (
        <div className="w-[400px] mx-auto h-auto  pt-3 pb-3 ">
            <div className="max-w-[380px] mx-auto ">
                <h1 className="text-xl font-bold mb-5">
                    Suggested for you
                </h1>

                <div className="flex gap-8 items-center  overflow-x-auto scrollbar-none   ">
                    {suggestedUsers.length > 0 ? (
                        suggestedUsers.map((user) => (

                            <div key={user.id}>
                                <div onClick={() =>
                                    navigate(`/ProfilePage/${user?.id}`)
                                }>
                                    <img
                                        src={user.avatar || "https://i.pravatar.cc/150"}
                                        alt={user.username}
                                        className="w-20 h-20 rounded-full object-cover "

                                    />
                                    <p className="font-semibold pb-2">
                                        {user.username}
                                    </p>
                                    <button
                                        onClick={() => toggleFollow(user.id)}
                                        className="px-4 py-1 bg-blue-500 text-white rounded-lg "
                                    >
                                        Follow
                                    </button>

                                </div>
                            </div>

                        ))
                    ) : (
                        <h1>No Suggestions Found</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestionPage;