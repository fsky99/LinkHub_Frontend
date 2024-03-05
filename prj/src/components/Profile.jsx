import { useEffect, useState } from "react"
import "../App.css"
import {  useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Link } from 'react-router-dom'
import {Router, Route, Routes } from 'react-router'
import EditProfile from "./EditProfile"

const Profile = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()
  // console.log( "USER:",user);
  // const [LoggedUser, setLoggedUser] = useState(null)
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState()
  const [userName, setUserName] = useState(null)
  // const [posts, setpost] = useState([])
 
  const [profile, setProfile] = useState([])


  const findLoggedUser = async () => {
    // if(!user){
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    // }

    setProfile(res.data)
   
 
    console.log("profile", profile)   
 
    setFollowers(res.data.followers.length)
    setFollowing(res.data.following.length)
    setUserName(res.data.userName)
    // setpost(res.data.posts)
    // console.log(res.data);
  }     

  useEffect(() => {
    findLoggedUser()
    // console.log(profile);
  }, [user?.id])
 
  // console.log("user1:", user)
  // const [profile, setProfile] = useState({})

  useEffect(() => {
    findLoggedInUser()
  }, [])

  const findLoggedInUser = async () => {
    console.log('userrrr: ', user)
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    console.log('response: ', res.data)
    setProfile(res.data)
  }

  const handleCreatePost = async () => {
    navigate('/craetePpost')
  }

  return user ? (
    <div className="profile">
      <nav id="sidebar">
        <div className="sidebar-header">
          {/* <a href="/edit/:id">Edit Profile</a> */}
          <Link to="/edit">Edit Profile</Link>
          <a href="#">Edit Picture</a>
          <a href="#">Request Verification</a>
          <a href="#">Create Hashtags</a>
        </div>
      </nav>
      <div className="main-profile">
        <div className="main-profile-data">
          <p>userName: {profile.userName}</p>
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
                  <button>Edit post</button>
                  <button>Delete Post</button>
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
      <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  )
}

export default Profile
