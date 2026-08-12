import { useEffect, useState } from "react";
import { posts } from "../data/posts";

export const useCommentPage = () => {

    // ================= COMMENTS =================

    const [comments, setComments] = useState(() => {

        const savedComments =
            localStorage.getItem("comments");

        if (savedComments) {
            return JSON.parse(savedComments);
        }

        // Create initial comments structure
        return posts.map((post) => ({
            ...post,
            comments: Array.isArray(post.comments)
                ? post.comments
                : [],
        }));
    });


    // ================= INPUT =================

    const [input, setInput] = useState("");


    // ================= SAVE COMMENTS =================

    useEffect(() => {

        localStorage.setItem(
            "comments",
            JSON.stringify(comments)
        );

    }, [comments]);


    // ================= POST COMMENT =================

    function postComment(postId) {

        if (!input.trim()) return;

        const newComment = {
            id: Date.now(),
            text: input.trim(),
        };

        setComments((prev) => {

            // Check whether post already exists
            const postExists = prev.some(
                (post) => post.id === postId
            );

            // If post exists, add comment
            if (postExists) {

                return prev.map((post) => {

                    if (post.id !== postId) {
                        return post;
                    }

                    return {
                        ...post,

                        comments: [
                            ...(Array.isArray(post.comments)
                                ? post.comments
                                : []),

                            newComment,
                        ],
                    };
                });
            }

            // If post does not exist,
            // create it with the comment
            return [
                ...prev,
                {
                    id: postId,
                    comments: [newComment],
                },
            ];
        });

        // Clear input
        setInput("");
    }


    return {
        comments,
        postComment,
        setInput,
        input,
    };
};