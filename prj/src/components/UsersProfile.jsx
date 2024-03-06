import "../App.css"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

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
    const res = await axios.get(`${BASE_URL}/user/${id}`)
    setUserProfile(res.data)
  }
  const findFollowing = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    setLoggedInData(res.data)

    if (res.data.following) {
      res.data.following.forEach((fData) => {
        if (fData._id == id) {
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
      following: followingList.following,
    })

    const followUpdated = await axios.get(`${BASE_URL}/user/${id}`)
    const followData = { ...followUpdated.data }
    followData.followers.push(user.id)
    const followRes = await axios.put(`${BASE_URL}/user/${id}`, {
      followers: followData.followers,
    })
    setFollow(!follow)
  }

  return (
    <div>
      <div className="classUserProfile">
        {userProfile ? (
          <div className="usernameProfile">{userProfile.userName}</div>
        ) : (
          <p>Hi</p>
        )}

        {!follow && (
          <button className="followbutton" onClick={followUser}>
            Follow
          </button>
        )}

        <div className="following-followers">
          <div className="following">
            {userProfile ? (
              <p>following {userProfile.following.length}</p>
            ) : (
              <p>following 0</p>
            )}
          </div>
          <div className="followers">
            {userProfile ? (
              <p>followers {userProfile.followers.length}</p>
            ) : (
              <p>followers 0</p>
            )}
          </div>
        </div>
      </div>

      <div className="usersPostsProfile">
        {userProfile
          ? userProfile.posts.map((usrp) => (
              <div key={usrp._id} className="blog-card">
                <div className="meta">
                  <img className="photo" src={usrp.image} alt="" />
                </div>
                <div className="descriptionProfile">
                  <div className="textProfile">{usrp.text}</div>

                  {usrp.like && (
                    <div className="likesProfile">
                      likes: {usrp.like.length}{" "}
                    </div>
                  )}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default UsersProfile
