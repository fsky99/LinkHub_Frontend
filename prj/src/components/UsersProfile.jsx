import '../App.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UsersProfile = (props) => {
  let { id } = useParams()
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    finduser()
  }, [])

  const finduser = async () => {
    console.log('props:', props)
    const res = await axios.get(`${BASE_URL}/user/${id}`)
    setUserProfile(res.data)
    console.log('userDatafrom:', res)
  }
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
    </div>
  )
}

export default UsersProfile
