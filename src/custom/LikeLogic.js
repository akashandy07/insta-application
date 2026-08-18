import { useState } from "react";
import { posts } from "../data/posts";

export const useLikeLogic = () => {

  // Get saved likes from localStorage
  const [postData, setPostData] = useState(() => {

    const savedLikes = localStorage.getItem("postLikes");

    if (savedLikes) {
      return JSON.parse(savedLikes);
    }

    return posts;
  });


  function likeButton(id) {

    setPostData((prevPosts) => {

      const updatedPosts = prevPosts.map((post) =>

        post.id === id
          ? {
              ...post,

              liked: !post.liked,

              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      );

      // Save updated posts to localStorage
      localStorage.setItem(
        "postLikes",
        JSON.stringify(updatedPosts)
      );

      return updatedPosts;
    });
  }


  return {
    postData,
    likeButton
  };
};