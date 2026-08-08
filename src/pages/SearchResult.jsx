import React from 'react'
import { useNavigate } from 'react-router-dom'


const SearchResult = ({ input, showUser }) => {
    const navigate = useNavigate()
    return (
        <div className="w-[400px] mx-auto min-h-[100vh] pt-5 overflow-x-auto scrollbar-none">
            <div className='max-w-[380px] mx-auto'>
                {input.trim() !== "" ? (
                    showUser.length > 0 ? (
                        <div >
                            <p className="text-sm text-gray-600 mb-3">Found {showUser.length} user(s)</p>
                            {showUser.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between border-b py-4 hover:bg-gray-50 px-2 rounded transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                            onClick={() => navigate(`/ProfilePage/${user.id}`)}
                                        />

                                        <div>
                                            <h2 className="font-semibold">{user.name}</h2>
                                            <p className="text-gray-500 text-sm">@{user.username}</p>
                                        </div>
                                        
                                    </div>

                                    <button onClick={() => navigate(`/messages/${user.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                        Message
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-10 text-gray-500">
                            <p>No users found for "{input}"</p>
                        </div>
                    )
                ) : null}

            </div>
        </div>
    )
}

export default SearchResult