import { useState } from "react";
import { posts } from "../data/posts";

export const useLikeLogic = () => {
  const [postData, setPostData] = useState(posts);

  function likeButton(id) {
    setPostData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  }

  return { postData, likeButton };
};