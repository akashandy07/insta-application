import React from 'react'
import { stories } from '../data/stories'
import { users } from '../data/users'
 

const StoryPage = () => {
    const getUserById = (userId) => users.find(user => user.id === userId);
    return (
        <div className='w-[500px] mx-auto pt-5  overflow-x-auto hide-scrollbar '>
            <div className='max-w-[410px] mx-auto'>
               
                <div className='flex justify-around overflow-x-auto gap-7 hide-scrollbar'>
                    {stories.map(i => {
                        const user = getUserById(i.userId);  // ✅ Get user data

                        return (
                            <div key={i.id} className='flex flex-col items-center'>
                                {/* ✅ SHOW AVATAR IMAGE */}
                                <div className={`w-[70px] h-[70px] rounded-full border-2 flex-shrink-0 overflow-hidden ${
                                    i.seen 
                                        ? 'border-gray-700' 
                                        : 'border-pink-700'
                                }`}>
                                    <img 
                                        src={user?.avatar}  // ✅ Avatar from user
                                        alt={user?.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-xs mt-1">{user?.username}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default StoryPage