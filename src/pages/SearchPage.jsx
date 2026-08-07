import React, { useState } from "react";
import { Import, Search } from "lucide-react";
import { users } from "../data/users";

import SearchResult from "./SearchResult";

const SearchPage = () => {
    const [input, setInput] = useState("");
    const [showUser, setShowUser] = useState([]);


    const searchHandler = (value) => {
        setInput(value);

        if (value.trim() === "") {
            setShowUser([]);
            return;
        }

        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase())
        );

        setShowUser(filteredUsers);
    };

    return (
        <div className="w-[500px] mx-auto pt-5 overflow-x-auto scrollbar-none">
            <div className="max-w-[410px] mx-auto">
                <div className="flex items-center gap-3 mb-5  ">
                    <div className="flex-1 relative">
                        <Search className="absolute top-3 left-[90%] text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users by name or username..."
                            value={input}
                            onChange={(e) => searchHandler(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            {input.trim() === "" ? (
                <div className="max-w-[410px] mx-auto">
                    <div>
                        <h2>hiii</h2> {/* Replace this with your Reels component later */}
                    </div>
                </div>
            ) : (
                <SearchResult input={input} showUser={showUser} />
            )}


        </div>
    )
};

export default SearchPage;