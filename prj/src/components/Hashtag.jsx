import React, { useState, useEffect } from "react";
import axios from "axios";

const Hashtag = () => {
  const [hashtags, setHashtags] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post")
        setHashtags(response.data);
      } catch (error) {
        console.error("Error fetching hashtags:", error);
      }
    };

    fetchHashtags();
  }, []);

  const getRandomHashtags = (count) => {
    const shuffled = hashtags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      <h1>Hashtags</h1>
      <ul>
        {getRandomHashtags(5).map((post) => (
          <li key={post._id} onClick={() => handleClick(post)}>
            {post.hashtag.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </li>
        ))}
      </ul>

      {selectedPost && (
        <div>
          <h2>Selected Post</h2>
          <div>
            <img src={selectedPost.image} alt="Post Image" />
            <p>{selectedPost.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hashtag;
