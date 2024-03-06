import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
// import { Link } from 'react-router-dom'

const Profile = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    findLoggedInUser()
    setDeleted(false)
  }, [deleted])

  const findLoggedInUser = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    setProfile(res.data)
  }

  const deletePost = async (postId) => {
    const res = await Client.delete(`${BASE_URL}/post/${postId}`)
    setDeleted(true)
  }

  const handleCreatePost = async () => {
    navigate('/craetePpost')
  }

  return user ? (
    <div className="profile">
      <nav id="sidebar">
        <div className="sidebar-header">
          {/* <a href="#">Edit Profile</a> */}
          <Link to="/edit">Edit Profile</Link>
        </div>
      </nav>
      <div className="main-profile">
        <div className="main-profile-data">
          <p>userName: {profile.userName}</p>
          <p>Country: {profile.country}</p>
          {profile.following ? (
            <p>following: {profile.following.length}</p>
          ) : (
            <p>following: 0</p>
          )}

          {profile.followers ? (
            <p>followers: {profile.followers.length}</p>
          ) : (
            <p>followers: 0</p>
          )}
        </div>

        <div className="user-post">
          <div className="user-post-header">
            <button onClick={handleCreatePost}>Create post</button>
          </div>
          <p>User posts:</p>
          {profile.posts
            ? profile.posts.map((userpost) => (
                <div key={userpost._id}>
                  <p>{userpost.text}</p>
                  <img src={userpost.image} alt="" />

                  <Link to={`/EditPost/${userpost._id}`}>Edit post</Link>
                  <button onClick={() => deletePost(userpost._id)}>
                    Delete Post
                  </button>

                  {userpost.like && <p>likes: {userpost.like.length} </p>}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Profile
