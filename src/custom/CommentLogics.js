
import { useEffect, useState } from "react";
import { posts } from "../data/posts";

export const useCommentPage = () => {
    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem("comments");

        if (savedComments) {
            return JSON.parse(savedComments);
        }

        return posts;
    });

    const [input, setInput] = useState("");

    // Save comments whenever comments change
    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [comments]);

    function postComment(postId) {
        if (!input.trim()) return;

        setComments((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...(Array.isArray(post.comments)
                                ? post.comments
                                : []),
                            {
                                id: Date.now(),
                                text: input,
                            },
                        ],
                    }
                    : post
            )
        );

        setInput("");
    }

    

    return {
        comments,
        postComment,
        setInput,
        input,
    };
};

