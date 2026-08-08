import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, Heart, MessageCircle, Search, Home, Film } from 'lucide-react'

const NavBar = () => {
    const location = useLocation()

    // Check if current route matches a nav link
    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* Top Header */}
            <div className='w-[500px] mx-auto h-[80px] bg-white '>
                
                <div className='flex justify-between items-center h-full max-w-[410px] mx-auto border-b  border-gray-200 '>
                    {/* Plus Icon */}
                    <div className='cursor-pointer hover:opacity-70 transition'>
                        <Plus size={24} strokeWidth={2} />
                    </div>

                    {/* Instagram Logo */}
                    <div className='font-bold text-xl italic tracking-tighter'>
                        Instagram
                    </div>

                    {/* Heart & Message Icons */}
                    <div className='flex gap-4'>
                        <div className='cursor-pointer hover:opacity-70 transition'>
                            <Heart size={24} strokeWidth={2} />
                        </div>
                        <Link
                            to="/messages"
                            className='cursor-pointer hover:opacity-70 transition'
                        >
                            <MessageCircle size={24} strokeWidth={2} />
                        </Link>
                    </div>
                </div>
            </div>


            {/* Bottom Navigation */}
            <div className="fixed bottom-0  w-[500px] h-[80px]  max-w-[410px] mx-auto bg-white border-t border-gray-200 z-50 left-[50%] translate-x-[-50%] ">
                <div className='flex justify-around items-center py-5' >


                    <Link
                        to="/PostPage"
                        className={` rounded-lg transition ${isActive('/PostPage')
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        <Home
                            size={24}
                            fill={isActive('/PostPage') ? 'currentColor' : 'none'}
                            strokeWidth={2}
                        />
                    </Link>

                    {/* Search */}
                    <Link
                        to="/SearchPage"
                        className={` rounded-lg transition ${isActive('/SearchPage')
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        <Search
                            size={24}
                            fill={isActive('/SearchPage') ? 'currentColor' : 'none'}
                            strokeWidth={2}
                        />
                    </Link>

                    {/* Create/Post */}


                    {/* Reels */}
                    <Link
                        to="/ReelsPage"
                        className={` rounded-lg transition ${isActive('/ReelsPage')
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        <Film
                            size={24}
                            fill={isActive('/ReelsPage') ? 'currentColor' : 'none'}
                            strokeWidth={2}
                        />
                    </Link>

                    {/* Messages */}
                    <Link
                        to="/messages"
                        className={` rounded-lg transition ${isActive('/messages')
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        <MessageCircle
                            size={24}
                            fill={isActive('/messages') ? 'currentColor' : 'none'}
                            strokeWidth={2}
                        />
                    </Link>

                    {/* Profile */}
                    <Link
                        to="/UserProfile"
                        className={`rounded-lg transition ${isActive('/UserProfile')
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        {/* Circle for profile picture placeholder */}
                        <div className={`w-6 h-6 rounded-full border-2 transition ${isActive('/UserProfile')
                            ? 'border-black'
                            : 'border-gray-600 hover:border-black'
                            }`}></div>
                    </Link>
                </div>
            </div>

            {/* Spacer for bottom nav */}

        </>
    )
}

export default NavBar