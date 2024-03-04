import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UsersProfile = ({ userId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    finduser()
  }, [])

  const finduser = async () => {
    const res = await axios.get(`${BASE_URL}/user/${userId}`)
    console.log('userDatafrom:', res)
  }
  return (
    <div>
      <p>hiii</p>
    </div>
  )
}

export default UsersProfile
