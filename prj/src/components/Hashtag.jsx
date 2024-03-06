import React, { useState, useEffect } from "react"
import axios from "axios"
import Client from "../services/api"

const Hashtag = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Client.get("/post")

        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
  }, [])

  const getRandomHashtags = (count) => {
    const allHashtags = posts.reduce((acc, post) => {
      return acc.concat(post.hashtag)
    }, [])
    const shuffled = allHashtags.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const handleClick = (hashtag) => {
    const postsWithHashtag = posts.filter((post) =>
      post.hashtag.includes(hashtag)
    )
    if (postsWithHashtag.length > 0) {
      setSelectedPost(postsWithHashtag[0])
    }
  }

  return user ? (
    <div>
      <h1 className="HeaderH1">Hashtags</h1>
      <div>
        {getRandomHashtags(5).map((hashtag, index) => (
          <span
            key={index}
            className="Hashtags"
            onClick={() => handleClick(hashtag)}
          >
            #{hashtag}&nbsp;
          </span>
        ))}
      </div>

      {selectedPost && (
        <div>
          <div>
            <img
              src={selectedPost.image}
              alt="Image"
              className="hashtaChosIMG"
            />
            <p className="hashtaChosTXT"> {selectedPost.text}</p>
            {selectedPost.hashtag.map((h) => (
              <span className="HashtagsChos">#{h} &nbsp;</span>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  )
}

export default Hashtag
