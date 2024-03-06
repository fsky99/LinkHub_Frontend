import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Client from "../services/api"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#d4d4d4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}
const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState(null)
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [replay, setReplay] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [openReplies, setOpendReplies] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleCloseReplies = () => setOpendReplies(false)

  useEffect(() => {
    getFollowingPosts()
    findLoggedInUser()
  }, [isLike])

  const addComment = async (postId, commentText) => {
    try {
      const postResponse = await Client.get(`/post/${postId}`)
      const postToUpdate = postResponse.data

      if (!postToUpdate.comments) {
        postToUpdate.comments = []
      }

      const newComment = {
        comment: commentText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: postId,
      }
      await Client.post(`/comment`, newComment)
      commentText = ""
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }
  const addReplay = async (postId, CommentId, ReplayText) => {
    try {
      const newReplay = {
        reply: ReplayText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: postId,
        commentId: CommentId,
      }
      await Client.post(`/reply`, newReplay)
    } catch (error) {
      console.error("Error adding replay:", error)
    }
  }
  let CommentsToShowOnPage = []
  //show the replay

  const ReplayToShowOnPage = []

  const showReplay = async (id) => {
    const userData = await Client.get(`/user`)
    let userDataData = userData.data

    const CommentsToShow = await Client.get(`/comment/${id}`)
    let CommentsToShows = CommentsToShow.data //what is this?

    const AllReplays = await Client.get(`/reply`)
    let ReplayToShow = AllReplays.data
    for (let i = 0; i < userDataData.length; i++) {
      for (let j = 0; j < CommentsToShows.reply.length; j++) {
        for (let k = 0; k < ReplayToShow.length; k++) {
          if (userDataData[i]._id === ReplayToShow[k].userId) {
            if (CommentsToShows.reply[j]._id === ReplayToShow[k]._id) {
              let ReplayShowing = {
                ReplayId: ReplayToShow[k]._id,
                ReplayDate: ReplayToShow[k].date,
                Replay: ReplayToShow[k].reply,
                userName: userDataData[i].userName,
              }
              ReplayToShowOnPage.push(ReplayShowing)
            }
          }
        }
      }
    }
    setReplay(ReplayToShowOnPage)
    setOpendReplies(true)
  }
  const postID = (p) => {
    return (postId = p)
  }

  let postIddd
  const showComments = async (id) => {
    const userData = await Client.get(`/user`)
    let userDataData = userData.data
    const postToShow = await Client.get(`/post/${id}`)
    let postComments = postToShow.data.comment
    const CommentsToShow = await Client.get(`/comment`)
    let commetsToshowVar = CommentsToShow.data

    for (let i = 0; i < postComments.length; i++) {
      for (let j = 0; j < commetsToshowVar.length; j++) {
        for (let k = 0; k < userDataData.length; k++) {
          if (postComments[i]._id === commetsToshowVar[j]._id)
            if (commetsToshowVar[j].userId === userDataData[k]._id) {
              let commentData = {
                commentID: commetsToshowVar[j]._id,
                postIDD: postComments[i].postId,
                postingId: postToShow.data._id,
                commentDate: commetsToshowVar[j].date,
                Comment: commetsToshowVar[j].comment,
                userName: userDataData[k].userName,
              }
              CommentsToShowOnPage.push(commentData)
            }
        }
      }
    }
    setOpen(true)
    setComments(CommentsToShowOnPage)
    postID(id)
    postIddd = id
  }

  const handleLikes = async (event, id) => {
    const postToUpdate = await Client.get(`/post/${id}`)

    if (postToUpdate.data && !postToUpdate.data.like.includes(user.id)) {
      const likePost = { ...postToUpdate.data }
      likePost.like.push(user.id)

      await Client.put(`/post/${id}`, { like: likePost.like })
      setIsLike(!isLike)
    } else {
      console.log("already liked the post")
    }
  }

  const findLoggedInUser = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    setLoggedInUser(res.data.following)
  }
  let usersFollowingPosts = []

  const getFollowingPosts = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    let userData
    const allUsers = response.data

    allUsers.forEach((loggedIndata) => {
      if (loggedIndata._id == user.id) {
        userData = loggedIndata
      }
    })

    allUsers.forEach((usr) => {
      if (userData.following.includes(usr._id)) {
        usersFollowingPosts.push(usr.posts)
      }
    })

    setPostList(usersFollowingPosts)
  }

  return (
    <div className="postDIV">
      <div className="sideBarClass">
        <aside>
          <Sidebar users={loggedInUser} />
        </aside>
      </div>
      <div className="contentClass">
        <div className="f-posts">
          {postList
            ? postList.map((postss) =>
                postss.map((p) => (
                  <div key={p._id} className="post-block">
                    <img src={p.image} className="post-image" />
                    <div className="post-content">
                      <p>{p.text}</p>
                      {p.hashtag
                        ? p.hashtag.map((hash) => (
                            <div className="HashtagColors">#{hash}</div>
                          ))
                        : null}

                      <label className="likescontainer">
                        <input
                          type="checkbox"
                          id="btn"
                          onClick={(event) => {
                            handleLikes(event, p._id)
                          }}
                        />
                        <svg
                          id="Layer_1"
                          version="1.0"
                          viewBox="0 0 24 24"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                        </svg>
                      </label>

                      {p.like && <p>likes: {p.like.length} </p>}
                      <form
                        onSubmit={(event) => {
                          event.preventDefault()
                          const commentText =
                            event.target.elements.commentText.value
                          if (commentText.trim() !== "") {
                            addComment(p._id, commentText)
                            event.target.elements.commentText.value = ""
                          }
                        }}
                      >
                        <div class="inputBox">
                          <input type="text" name="commentText" required="" />
                          <span>Add Comment</span> {""}
                          {""}
                          <button id="bottone5" type="submit">
                            +
                          </button>
                        </div>
                      </form>
                      {/* {p.comment} */}
                      <br />
                      <button id="bottone6" onClick={() => showComments(p._id)}>
                        Show Comments
                      </button>

                      {/* {showComments(p._id)} */}
                    </div>
                  </div>
                ))
              )
            : console.log("error")}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, overflowY: "scroll", maxHeight: "70vh" }}>
              {" "}
              {/* Add maxHeight */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Comments
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {comments
                  ? comments.map((com) => (
                      <p key={com.commentID}>
                        {com.userName} :{com.Comment}
                        <form
                          onSubmit={(event) => {
                            event.preventDefault()
                            const replayText =
                              event.target.elements.replayText.value
                            if (replayText.trim() !== "") {
                              addReplay(
                                com.postingId,
                                com.commentID,
                                replayText
                              )
                              event.target.elements.replayText.value = ""
                            }
                          }}
                        >
                          <br />
                          <div class="inputBox">
                            <input required="" type="text" name="replayText" />
                            <span>Add Replay</span> {""}
                            {""}
                            <button id="bottone5" type="submit">
                              +
                            </button>
                          </div>
                        </form>
                        <button
                          className="divButtonss"
                          id="bottone6"
                          onClick={() => showReplay(com.commentID)}
                        >
                          Show Replies
                        </button>
                      </p>
                    ))
                  : null}
              </Typography>
            </Box>
          </Modal>

          <Modal
            open={openReplies}
            onClose={handleCloseReplies}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                replies
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {replay
                  ? replay.map((r) => (
                      <div>
                        <p key={r._id}>
                          {r.userName} : {r.Replay}
                        </p>
                      </div>
                    ))
                  : null}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default FollowingPosts
