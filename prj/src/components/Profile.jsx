import { useEffect, useState } from "react"
import "../App.css"
import {  useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Link } from 'react-router-dom'
import {Router, Route, Routes } from 'react-router'
import EditProfile from "./EditProfile"

const Profile = ({ user }) => {
  let navigate = useNavigate()
  // console.log( "USER:",user);
  // const [LoggedUser, setLoggedUser] = useState(null)
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState()
  const [userName, setUserName] = useState(null)
  // const [posts, setpost] = useState([])
 
  const [profile, setProfile] = useState([])

  var BASE_URL = import.meta.env.VITE_BASE_URL

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

      {/* <div className="main-Profile">
        <div className="profile-flex">
          <img src="" alt="" className="userImg" />

          <h3>{userName}</h3>

          <div id="following">
            <h5>{following} Following</h5>
          </div>

          <div id="followers">
            <h5>{followers} Followers</h5>
          </div>
        </div>
      </div> */}





      <h4>userName: {userName} </h4>
        
        <h4>followers: {followers} </h4>
          
       <h4> following: {following}</h4> 
  
      {/* {profile.map((e) => (
        <div id="post" key={e._id}>
          <h5>username: {e.userName}</h5>
          <h5>email: {e.email}</h5>
        </div>
      ))}  */}
      {/* {profile.posts.map((e)=>(
        <div key={e._id}>
          <h1>{e.text}</h1>

          </div>
      ))}             */}
    </div> 
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  )
}

export default Profile
