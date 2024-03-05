import '../App.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UsersProfile = ({ user }) => {
  let { id } = useParams()
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [userProfile, setUserProfile] = useState(null)
  const [loggedInData, setLoggedInData] = useState(null)
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    finduser()
    findFollowing()
  }, [])

  const finduser = async () => {
    console.log('props:', user)
    const res = await axios.get(`${BASE_URL}/user/${id}`)
    setUserProfile(res.data)
    console.log('userDatafrom:', res)
  }
  const findFollowing = async () => {}
  return (
    <div>
      {userProfile ? <p>{userProfile.userName}</p> : <p>Hi</p>}

      {userProfile ? (
        <p>following: {userProfile.following.length}</p>
      ) : (
        <p>following: 0</p>
      )}

      {userProfile ? (
        <p>followers: {userProfile.followers.length}</p>
      ) : (
        <p>followers: 0</p>
      )}

      <div>
        {userProfile
          ? userProfile.posts.map((usrp) => (
              <div key={usrp._id}>
                <p>{usrp.text}</p>
                <img src={usrp.image} alt="" />
                {usrp.like && <p>likes: {usrp.like.length} </p>}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default UsersProfile
