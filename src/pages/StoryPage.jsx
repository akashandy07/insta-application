import React from "react";
import { stories } from "../data/stories";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

const StoryPage = () => {
    const getUserById = (userId) =>
        users.find((user) => user.id === userId);

    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="flex justify-around overflow-x-auto gap-5 hide-scrollbar mt-1.5">

            <div className="flex flex-col items-center flex-shrink-0 items-center">

                <div className="w-[87px] h-[87px] rounded-full border-4 border-pink-700 overflow-hidden">

                    <img
                        src={storedUser?.avatar}
                        alt={storedUser?.username}
                        className="w-full h-full object-cover"
                    />

                </div>

                <p className="text-xs mt-1">
                    {storedUser?.username}
                </p>

            </div>


            {/* OTHER USERS' STORIES */}
            {stories.map((i) => {

                const user = getUserById(i.userId);

                return (
                    <div
                        key={i.id}
                        className="flex flex-col items-center flex-shrink-0"
                    >

                        <div
                            className={`w-[85px] h-[85px] rounded-full border-4 overflow-hidden ${
                                i.seen
                                    ? "border-gray-700"
                                    : "border-pink-700"
                            }`}
                        >

                            <img
                                src={user?.avatar}
                                alt={user?.username}
                                className="w-full h-full object-cover"
                                onClick={() =>
                                    navigate(
                                        `/ProfilePage/${user?.id}`
                                    )
                                }
                            />

                        </div>

                        <p className="text-xs mt-1">
                            {user?.username}
                        </p>

                    </div>
                );
            })}

        </div>
    );
};

export default StoryPage;