import { useEffect, useState } from "react"
import "../App.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"

const Profile = ({ user }) => {
  let navigate = useNavigate()

  // const [LoggedUser, setLoggedUser] = useState(null)
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState()
  const [userName, setUserName] = useState(null)
  const [posts,setpost]  = useState([])

  var BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const findLoggedUser = async () => {
      const res = await axios.get(`${BASE_URL}/user/${user.id}`)
      setFollowers(res.data.followers.length)
      setFollowing(res.data.following.length)
      setUserName(res.data.userName)
      setpost(res.data.posts)
      console.log(res.data);
      // console.log(posts);
    }
    findLoggedUser()

  })

  // console.log("user1:", user)
  return user ? (
    <div className="profile">
      <nav id="sidebar">
        <div className="sidebar-header">
          <a href="#">Edit Profile</a>
          <a href="#">Edit Picture</a>
          <a href="#">Request Verification</a>
          <a href="#">Create Hashtags</a>
        </div>
      </nav>

      <div className="main-Profile">
        <div className="profile-flex">
          <img src="" alt="" className="userImg" />

          <h3>{userName}</h3>

          <div id="following">
            <h5>{following} Following</h5>
          </div>

          <div id="followers">
            <h5>{followers} Followers</h5>
          </div>
          <div>
          {posts.forEach((e)=>{
            
          })}
          </div>
        </div>
      </div>

      <div id="post">{/* <h5>POST</h5> */}</div>
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  )
}

export default Profile
