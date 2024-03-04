import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Client from '../services/api'

const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState([])
  const [likes, setLikes] = useState({})

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    getFollowingPosts()
    findLoggedInUser()
  }, [])

  const handleLikes = async (event, id) => {
    const postToUpdate = await Client.get(`/post/${id}`)
    if (postToUpdate.data && !postToUpdate.data.like.includes(user.id)) {
      const likePost = { ...postToUpdate.data }
      setLikes(likePost.like.length)
      console.log(likePost)
      likePost.like.push(user.id)

      //setLikes(likePost.like.length)
      await Client.put(`/post/${id}`, { like: likePost.like })
      //setLikes(likes + 1)
    } else {
      console.log('already liked the post')
    }
  }

  const findLoggedInUser = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    setLoggedInUser(res.data.following)
  }

  const getFollowingPosts = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    let userData

    const allUsers = response.data

    allUsers.forEach((loggedIndata) => {
      if (loggedIndata._id == user.id) {
        userData = loggedIndata
      }
    })

    allUsers.forEach((usr) => {
      if (usr._id.includes(userData.following)) {
        setPostList(usr.posts)
      }
    })
  }

  return (
    <div>
      <header>following posts</header>

      <aside>
        <Sidebar users={loggedInUser} />
      </aside>

      <div className="f-posts">
        {postList.map((p) => (
          <div key={p._id}>
            <p>{p.text}</p>

            <button
              id="btn"
              type="button"
              onClick={(event) => {
                handleLikes(event, p._id)
              }}
            >
              LIKE
            </button>
            <p>likes: {p.like.length} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FollowingPosts
