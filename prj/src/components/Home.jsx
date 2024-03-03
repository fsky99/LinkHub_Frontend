import React, { useState, useEffect } from "react"
import Client from "../services/api"
import Hashtag from "./Hashtag"
const Home = ({ user }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Client.get("/post")
        console.log("posts returned" + response.data)
        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
  }, [])

  const getRandomPosts = (count) => {
    const shuffled = posts.sort(() => 0.6 - Math.random())
    return shuffled.slice(1, count)
  }

  return user ? (
    <div>
      {getRandomPosts(6).map((p) => (
        <div key={p._id} onClick={() => handleClick(p)}>
          <img src={p.image} />
          <h2>{p.text}</h2>
        </div>
      ))}
      <Hashtag user={user} />
    </div>
  ) : (
    <div>WElcome to LinkHub Page</div>
  )
}

export default Home
