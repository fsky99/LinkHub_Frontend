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
  }, [follow])

  const finduser = async () => {
    console.log('props:', user)
    const res = await axios.get(`${BASE_URL}/user/${id}`)
    setUserProfile(res.data)
    console.log('userDatafrom:', res)
  }
  const findFollowing = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`) //get the data of the logged in user
    setLoggedInData(res.data)
    console.log('followings:: ', res.data.following) //get the following of logged in user

    if (res.data.following) {
      res.data.following.forEach((fData) => {
        if (fData._id == id) {
          console.log('no')
          setFollow(true)
        }
      })
    }
  }

  const followUser = async () => {
    const userUpdated = await axios.get(`${BASE_URL}/user/${user.id}`)
    const followingList = { ...userUpdated.data }
    followingList.following.push(id)

    const res = await axios.put(`${BASE_URL}/user/${user.id}`, {
      following: followingList.following
    })

    const followUpdated = await axios.get(`${BASE_URL}/user/${id}`)
    const followData = { ...followUpdated.data }
    followData.followers.push(user.id)
    const followRes = await axios.put(`${BASE_URL}/user/${id}`, {
      followers: followData.followers
    })
    setFollow(!follow)
  }

  return (
    <div>
      {!follow && <button onClick={followUser}>Follow</button>}

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
