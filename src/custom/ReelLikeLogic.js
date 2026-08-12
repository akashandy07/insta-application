import { useEffect, useState } from "react";
import { reels } from "../data/Reels";

export const useReelLikeLogic = () => {
    const [reelData, setReelData] = useState(() => {
        const savedLikes = localStorage.getItem("reelLikes");

        if (savedLikes) {
            return JSON.parse(savedLikes);
        }

        return reels.map((reel) => ({
            ...reel,
            liked: false,
        }));
    });

    useEffect(() => {
        localStorage.setItem(
            "reelLikes",
            JSON.stringify(reelData)
        );
    }, [reelData]);

    function reelLikeButton(reelId) {
        setReelData((prev) =>
            prev.map((reel) =>
                reel.id === reelId
                    ? {
                        ...reel,
                        liked: !reel.liked,
                        likes: reel.liked
                            ? reel.likes - 1
                            : reel.likes + 1,
                    }
                    : reel
            )
        );
    }

    return {
        reelData,
        reelLikeButton,
    };
};