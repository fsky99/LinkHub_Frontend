import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Client from "../services/api"

const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState(null)
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState(null)
  const [isLike, setIsLike] = useState(false)
  const [replay , setReplay] = useState(null)
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

      console.log(postToUpdate.id)
      const newComment = {
        comment: commentText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: postId,
      }
      await Client.post(`/comment`, newComment)
      commentText = ''
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }
  const addReplay = async (postId, CommentId , ReplayText) =>{
    try {
      const postResponse = await Client.get(`/post/${postId}`)
      const postreturned = postResponse.data

      const commentResponse = await Client.get(`/comment/${CommentId}`)
      const commentReturned = commentResponse.data


      const newReplay = {
        reply: ReplayText,
        date: new Date().toISOString(),
        userId: user.id,
        postId: postId,
        commentId : CommentId,
      }
      await Client.post(`/reply`, newReplay)
      //update the comment to add the replay to it

   
      
    } catch (error) {
      console.error("Error adding replay:", error)
    }
  }
  let CommentsToShowOnPage = []
//show the replay 


  const showComments = async (id) => {
    const userData = await Client.get(`/user`)
    let userDataData = userData.data
    const postToShow = await Client.get(`/post/${id}`)
    let postComments = postToShow.data.comment
    // console.log("Post comments", postComments)
    const CommentsToShow = await Client.get(`/comment`)
    let commetsToshowVar = CommentsToShow.data
    // console.log("Comments to show var : ", commetsToshowVar)

    for (let i = 0; i < postComments.length; i++) {
      for (let j = 0; j < commetsToshowVar.length; j++) {
        for (let k = 0; k < userDataData.length; k++) {
          if (postComments[i]._id === commetsToshowVar[j]._id)
            if (commetsToshowVar[j].userId === userDataData[k]._id) {
              let commentData = {
                commentID: commetsToshowVar[j]._id,
                commentDate: commetsToshowVar[j].date,
                Comment: commetsToshowVar[j].comment,
                userName: userDataData[k].userName,
              }
              CommentsToShowOnPage.push(commentData)
            }
        }
      }
    }

    setComments(CommentsToShowOnPage)
    // console.log("Final comments:", CommentsToShowOnPage)
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
    // console.log("user foloo", userData.following)
    allUsers.forEach((usr) => {
      // console.log("Ff", userData.following)
      if (userData.following.includes(usr._id)) {
        // console.log("posts here", usr)
        usersFollowingPosts.push(usr.posts)
      }
    })

    setPostList(usersFollowingPosts)
    // console.log("users following  posts:" , usersFollowingPosts)
  }


  //show the replay and make the user able to add a replay to a comment
  return (
    <div>
      <header>following posts</header>

      <aside>
        <Sidebar users={loggedInUser} />
      </aside>

      <div className="f-posts">
        {console.log("posts please", postList)}
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
                      if (commentText.trim() !== "") {
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
                  {console.log(comments)}
                </div>
              ))
            )
          : console.log("error")}
        {comments
          ? comments.map((com) => (
              <p key={com.commentID}>
                {com.userName} :{com.Comment}
              </p>
            ))
          : null}
      </div>
    </div>
  )
}

export default FollowingPosts
