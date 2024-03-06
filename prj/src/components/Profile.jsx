import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import EditNoteIcon from '@mui/icons-material/EditNote'
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

  return user ? (
    <div className="profile">
      {/* <nav id="sidebar">
        <div className="sidebar-header">
          <Link to="/edit">Edit Profile</Link>
        </div>
      </nav> */}

      <div>
        <div className="classUserProfile profileHeader">
          <div className="usertopPart">
            {profile ? (
              <div className="usernameProfile userClass">
                {profile.userName}
              </div>
            ) : null}
            <Link className="editLink" to="/edit">
              <EditNoteIcon />
            </Link>
          </div>

          {/* <p>userName: {profile.userName}</p> */}
          {/* <p>Country: {profile.country}</p> */}
          <div className="following-followers">
            <div className="following">
              {profile.following ? (
                <p>following: {profile.following.length}</p>
              ) : (
                <p>following: 0</p>
              )}
            </div>

            <div className="followers">
              {profile.followers ? (
                <p>followers: {profile.followers.length}</p>
              ) : (
                <p>followers: 0</p>
              )}
            </div>
          </div>
        </div>

        <div className="usersPostsProfile">
          <h1>My Post</h1>
          {profile.posts
            ? profile.posts.map((userpost) => (
                <div key={userpost._id} className="blog-card">
                  <div className="meta">
                    <img className="photo" src={userpost.image} alt="" />
                  </div>
                  <div className="descriptionProfile">
                    <Link
                      className="editChangeColor"
                      to={`/EditPost/${userpost._id}`}
                    >
                      <EditNoteIcon />
                    </Link>

                    <div className="textProfile">{userpost.text}</div>

                    <div className="card-footerProfile">
                      {userpost.like && (
                        <div className="likesProfile">
                          likes: {userpost.like.length}{' '}
                        </div>
                      )}
                      <button
                        className="card-button primary"
                        onClick={() => deletePost(userpost._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
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
