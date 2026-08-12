import { useEffect, useState } from "react";
import { reels } from "../data/Reels";

export const useReelCommentLogic = () => {
    const [reelComments, setReelComments] = useState(() => {
        const savedComments = localStorage.getItem("reelComments");

        if (savedComments) {
            return JSON.parse(savedComments);
        }

        return reels.map((reel) => ({
            ...reel,
            comments: [],
        }));
    });

    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem(
            "reelComments",
            JSON.stringify(reelComments)
        );
    }, [reelComments]);

    function postReelComment(reelId) {
        if (!input.trim()) return;

        setReelComments((prev) =>
            prev.map((reel) =>
                reel.id === reelId
                    ? {
                        ...reel,
                        comments: [
                            ...(Array.isArray(reel.comments)
                                ? reel.comments
                                : []),
                            {
                                id: Date.now(),
                                text: input,
                            },
                        ],
                    }
                    : reel
            )
        );

        setInput("");
    }

    return {
        reelComments,
        postReelComment,
        setInput,
        input,
    };
};