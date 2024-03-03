import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'

const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState([])

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    getFollowingPosts()
    findLoggedInUser()
  }, [])

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

      <div>
        {postList.map((p) => (
          <div key={p._id}>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FollowingPosts
