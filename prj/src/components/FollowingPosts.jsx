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

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    getFollowingPosts()
    findLoggedInUser()
  }, [isLike])

  const addComment = async (id, commentText) => {
    try {
      const postResponse = await Client.get(`/post/${id}`)
      const postToUpdate = postResponse.data

      if (!postToUpdate.comments) {
        postToUpdate.comments = []
      }

      console.log(postToUpdate.id)
      const newComment = {
        comment: commentText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: id
      }
      await Client.post(`/comment`, newComment)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
  let CommentsToShowOnPage = []

  const showComments = async (id) => {
    const userData = await Client.get(`/user`)
    let userDataData = userData.data
    const postToShow = await Client.get(`/post/${id}`)
    let postComments = postToShow.data.comment
    console.log('Post comments', postComments)
    const CommentsToShow = await Client.get(`/comment`)
    let commetsToshowVar = CommentsToShow.data
    console.log('Comments to show var : ', commetsToshowVar)

    for (let i = 0; i < postComments.length; i++) {
      for (let j = 0; j < commetsToshowVar.length; j++) {
        for (let k = 0; k < userDataData.length; k++) {
          if (postComments[i]._id === commetsToshowVar[j]._id)
            if (commetsToshowVar[j].userId === userDataData[k]._id) {
              let commentData = {
                commentID: commetsToshowVar[j]._id,
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
    console.log('Final comments:', CommentsToShowOnPage)
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
        setPostList(usr.posts)
      }
    })
  }

  return (
    <div>
      <header>following posts</header>

      <aside>
        <Sidebar users={loggedInUser} />
      </aside>

      <div className="f-posts">
        {console.log('posts please', postList)}
        {postList
          ? postList.map((p) => (
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
                    const commentText = event.target.elements.commentText.value
                    if (commentText.trim() !== '') {
                      addComment(p._id, commentText)
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
                {console.log(comments)}
                {comments
                  ? comments.map((com) => (
                      <p key={com.commentID}>
                        {com.userName} :{com.Comment}
                      </p>
                    ))
                  : null}
              </div>
            ))
          : console.log('error')}
      </div>
    </div>
  )
}

export default FollowingPosts
