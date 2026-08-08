import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ShowFollow = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

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
                    <div
                        key={user.id}
                        className="flex items-center gap-3 mb-4"
                        onClick={() => navigate(`/ProfilePage/${user.id}`)}
                    >
                        <img
                            src={user.avatar || "https://i.pravatar.cc/150"}
                            alt={user.username}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <p>{user.username}</p>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default ShowFollow;