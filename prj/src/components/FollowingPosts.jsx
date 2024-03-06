import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Client from '../services/api'

const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState(null)
  const [likes, setLikes] = useState('')
  const [comments, setComments] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [replay, setReplay] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)

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
        postId: postId
      }
      await Client.post(`/comment`, newComment)
      commentText = ''
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
  const addReplay = async (postId, CommentId, ReplayText) => {
    try {
      const newReplay = {
        reply: ReplayText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: postId,
        commentId: CommentId
      }
      await Client.post(`/reply`, newReplay)
    } catch (error) {
      console.error('Error adding replay:', error)
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
          if (userDataData[i]._id === CommentsToShows.userId._id) {
            if (CommentsToShows.reply[j]._id === ReplayToShow[k]._id) {
              let ReplayShowing = {
                ReplayId: ReplayToShow[k]._id,
                ReplayDate: ReplayToShow[k].date,
                Replay: ReplayToShow[k].reply,
                userName: userDataData[i].userName
              }
              ReplayToShowOnPage.push(ReplayShowing)
            }
          }
        }
      }
    }
    setReplay(ReplayToShowOnPage)
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
                userName: userDataData[k].userName
              }
              CommentsToShowOnPage.push(commentData)
            }
        }
      }
    }

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
      console.log('already liked the post')
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

  //show the replay and make the user able to add a replay to a comment
  return (
    <div>
      <header>following posts</header>

      <aside>
        <Sidebar users={loggedInUser} />
      </aside>

      <div className="f-posts">
        {postList
          ? postList.map((postss) =>
              postss.map((p) => (
                <div key={p._id}>
                  <img src={p.image} />
                  <p>{p.text}</p>
                  <button
                    id="btn"
                    type="button"
                    onClick={(event) => {
                      handleLikes(event, p._id)
                    }}
                  >
                    LIKE
                  </button>
                  {p.like && <p>likes: {p.like.length} </p>}
                  <h4>comments:</h4>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      const commentText =
                        event.target.elements.commentText.value
                      if (commentText.trim() !== '') {
                        addComment(p._id, commentText)
                        event.target.elements.commentText.value = ''
                      }
                    }}
                  >
                    <input
                      type="text"
                      name="commentText"
                      placeholder="Add Comment"
                    />
                    <button id="btn" type="submit">
                      Add
                    </button>
                  </form>
                  {/* {p.comment} */}
                  <br />
                  <button onClick={() => showComments(p._id)}>
                    Show Comments
                  </button>
                  {/* {showComments(p._id)} */}
                </div>
              ))
            )
          : console.log('error')}
        {comments
          ? comments.map((com) => (
              <p key={com.commentID}>
                {com.userName} :{com.Comment}
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    const replayText = event.target.elements.replayText.value
                    if (replayText.trim() !== '') {
                      addReplay(com.postingId, com.commentID, replayText)
                      event.target.elements.replayText.value = ''
                    }
                  }}
                >
                  <input
                    type="text"
                    name="replayText"
                    placeholder="Add Replay"
                  />
                  <button id="btn" type="submit">
                    Add
                  </button>
                </form>
                <button onClick={() => showReplay(com.commentID)}>
                  Show Replies
                </button>
              </p>
            ))
          : null}

        {replay
          ? replay.map((r) => (
              <div>
                <p key={r._id}>
                  {r.userName} : {r.Replay}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default FollowingPosts
