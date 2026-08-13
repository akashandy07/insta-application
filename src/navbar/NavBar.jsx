import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Plus,
    Heart,
    MessageCircle,
    Search,
    Home,
    Film
} from "lucide-react";

import akash from "../assets/akash.jpeg";

const NavBar = () => {

    const location = useLocation();

    // ================= GET USER =================

    const savedUser = localStorage.getItem("user");

    let storedUser = null;

    try {
        storedUser = savedUser
            ? JSON.parse(savedUser)
            : null;
    } catch (error) {
        storedUser = null;
    }

    // ================= DEFAULT AVATAR =================
    // If user has no uploaded avatar,
    // use akash.jpeg

    const userAvatar =
        storedUser?.avatar || akash;

    // ================= ACTIVE ROUTE =================

    const isActive = (path) =>
        location.pathname === path;

    return (
        <>
            {/* ================================================= */}
            {/* TOP HEADER */}
            {/* ================================================= */}

            <div className="w-[400px] mx-auto h-[68px] bg-white">

                <div className="flex justify-between items-center h-full max-w-[380px] mx-auto border-b border-gray-200">

                    {/* PLUS */}

                    <div className="cursor-pointer hover:opacity-70 transition">
                        <Plus
                            size={24}
                            strokeWidth={2}
                        />
                    </div>


                    {/* INSTAGRAM LOGO */}

                    <div className="font-bold text-xl italic tracking-tighter">
                        Instagram
                    </div>


                    {/* HEART + MESSAGE */}

                    <div className="flex gap-4">

                        <div className="cursor-pointer hover:opacity-70 transition">

                            <Heart
                                size={24}
                                strokeWidth={2}
                            />

                        </div>


                        <Link
                            to="/messages"
                            className="cursor-pointer hover:opacity-70 transition"
                        >

                            <MessageCircle
                                size={24}
                                strokeWidth={2}
                            />

                        </Link>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* BOTTOM NAVIGATION */}
            {/* ================================================= */}

            <div className="fixed bottom-0 w-[400px] h-[68px] max-w-[380px] mx-auto bg-white border-t border-gray-200 z-50 left-[50%] translate-x-[-50%]">

                <div className="flex justify-around items-center py-5">


                    {/* ================================================= */}
                    {/* HOME */}
                    {/* ================================================= */}

                    <Link
                        to="/PostPage"
                        className={`rounded-lg transition ${
                            isActive("/PostPage")
                                ? "text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >

                        <Home
                            size={24}
                            fill={
                                isActive("/PostPage")
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={2}
                        />

                    </Link>


                    {/* ================================================= */}
                    {/* SEARCH */}
                    {/* ================================================= */}

                    <Link
                        to="/SearchPage"
                        className={`rounded-lg transition ${
                            isActive("/SearchPage")
                                ? "text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >

                        <Search
                            size={24}
                            fill={
                                isActive("/SearchPage")
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={2}
                        />

                    </Link>


                    {/* ================================================= */}
                    {/* REELS */}
                    {/* ================================================= */}

                    <Link
                        to="/ReelsPage"
                        className={`rounded-lg transition ${
                            isActive("/ReelsPage")
                                ? "text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >

                        <Film
                            size={24}
                            fill={
                                isActive("/ReelsPage")
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={2}
                        />

                    </Link>


                    {/* ================================================= */}
                    {/* MESSAGES */}
                    {/* ================================================= */}

                    <Link
                        to="/messages"
                        className={`rounded-lg transition ${
                            isActive("/messages")
                                ? "text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >

                        <MessageCircle
                            size={24}
                            fill={
                                isActive("/messages")
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={2}
                        />

                    </Link>


                    {/* ================================================= */}
                    {/* PROFILE */}
                    {/* ================================================= */}

                    <Link
                        to="/UserProfile"
                        className={`rounded-lg transition ${
                            isActive("/UserProfile")
                                ? "text-black"
                                : "text-gray-600 hover:text-black"
                        }`}
                    >

                        <div
                            className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
                                isActive("/UserProfile")
                                    ? "border-black"
                                    : "border-gray-300"
                            }`}
                        >

                            <img
                                src={userAvatar}
                                alt={
                                    storedUser?.username ||
                                    "profile"
                                }
                                className="w-full h-full object-cover"
                            />

                        </div>

                    </Link>

                </div>

            </div>

        </>
    );
};

export default NavBar;