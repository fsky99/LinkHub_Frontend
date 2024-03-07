import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import EditNoteIcon from '@mui/icons-material/EditNote'
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#d4d4d4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Profile = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const [deleted, setDeleted] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenShow = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

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

  const showFollow = () => {
    alert('show')
  }

  return user ? (
    <div className="profile">
      <div>
        <div className="classUserProfile profileHeader">
          <div className="usertopPart">
            {profile ? (
              <div className="usernameProfile userClass">
                <b> {profile.userName}</b>
              </div>
            ) : null}
            <Link className="editLink" to="/edit">
              <EditNoteIcon />
            </Link>
          </div>

          <div className="following-followers">
            <div className="following">
              {profile.following ? (
                <p onClick={handleOpen}>
                  <b>Following</b> {profile.following.length}
                </p>
              ) : (
                <p>Following 0</p>
              )}
            </div>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <b>Following</b>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {profile.following
                    ? profile.following.map((followU) => (
                        <div key={followU._id}>
                          {followU.userName}
                          <hr />
                        </div>
                      ))
                    : null}
                </Typography>
              </Box>
            </Modal>

            <div className="followers">
              {profile.followers ? (
                <p onClick={handleOpenShow}>
                  <b>Followers</b> {profile.followers.length}
                </p>
              ) : (
                <p>Followers 0</p>
              )}
            </div>

            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <b>Followers</b>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {profile.followers
                    ? profile.followers.map((followU) => (
                        <div key={followU._id}>
                          {followU.userName}
                          <hr />
                        </div>
                      ))
                    : null}
                </Typography>
              </Box>
            </Modal>
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
