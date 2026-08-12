import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFollowLogics } from "../custom/FollowLogics";

const ShowFollow = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const { data, toggleFollow } = useFollowLogics()

    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState("following");
    const navigate = useNavigate()
    const followingList = storedUser?.followingList || [];
    const followersList = storedUser?.followersList || [];

    const currentList =
        activeTab === "following"
            ? followingList
            : followersList;

    const filteredUsers = currentList.filter((user) =>
        user.username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className="w-[400px] mx-auto min-h-screen pt-5">

            {/* Tabs */}
            <div className="flex justify-around border-b mb-5">

                <button
                    onClick={() => setActiveTab("followers")}
                    className={
                        activeTab === "followers"
                            ? "font-bold border-b-2 pb-2"
                            : "pb-2"
                    }
                >
                    Followers
                </button>

                <button
                    onClick={() => setActiveTab("following")}
                    className={
                        activeTab === "following"
                            ? "font-bold border-b-2 pb-2"
                            : "pb-2"
                    }
                >
                    Following

                </button>

            </div>

            {/* Search */}
            <input
                type="text"
                placeholder={`Search ${activeTab}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border rounded-lg p-2"
            />

            {/* User List */}
            <div className="mt-5">

                {filteredUsers.map((user) => (
                    <>
                        <div className="flex justify-between ">
                            <div key={user.id} className="flex items-center gap-3 mb-4" >
                                <img
                                    src={user.avatar || "https://i.pravatar.cc/150"}
                                    alt={user.username}
                                    className="w-14 h-14 rounded-full object-cover"
                                    onClick={() => navigate(`/ProfilePage/${user.id}`)}
                                />
                                <p className="text-lg text-black  ">{user.username}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/messages/${user.id}`
                                        )
                                    }
                                    className="px-8 py-1.5 bg-gray-200 text-black font-semibold rounded text-lg w-[120px]"
                                >

                                    Message

                                </button>
                            </div>

                        </div>
                    </>
                ))}


            </div>

        </div>
    );
};

export default ShowFollow;