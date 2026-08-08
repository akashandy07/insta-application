import { useState } from 'react'
import { users } from '../data/users'

function getInitialData() {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {}
    const followingList = storedUser.followingList || []
    const followingIds = new Set(followingList.map((u) => u.id))

    return users.map((u) => ({
        ...u,
        isFollowing: followingIds.has(u.id)
    }))
}

export const useFollowLogics = () => {
    const [data, setData] = useState(getInitialData)

    function toggleFollow(id) {
        const target = data.find((i) => i.id === id)
        if (!target) return

        const wasFollowing = target.isFollowing

        setData((prevData) =>
            prevData.map((i) => {
                if (i.id !== id) return i
                return wasFollowing
                    ? { ...i, isFollowing: false, followers: i.followers - 1 }
                    : { ...i, isFollowing: true, followers: i.followers + 1 }
            })
        )

        const storedUser = JSON.parse(localStorage.getItem('user')) || {}
        const currentList = storedUser.followingList || []
        const updatedList = wasFollowing
            ? currentList.filter((u) => u.id !== target.id)
            : [...currentList, { id: target.id, username: target.username, avatar: target.avatar, name: target.name }]

        const updatedUser = {
            ...storedUser,
            followingList: updatedList,
            following: updatedList.length
        }

        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return { data, toggleFollow }
}