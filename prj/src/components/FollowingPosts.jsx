import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./Sidebar"
import Client from "../services/api"

const FollowingPosts = ({ user, users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [postList, setPostList] = useState([])
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState("")
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
        postId : id
      }
      await Client.post(`/comment`, newComment)



      // postToUpdate.comments.push(newComment)

      // const updateResponse = await Client.put(`/post/${id}`, postToUpdate)

      // if (updateResponse.status === 200) {
      //   setPostList((prevPostList) => {
      //     return prevPostList.map((post) => {
      //       if (post._id === id) {
      //         return {
      //           ...post,
      //           comments: postToUpdate.comments,
      //         }
      //       }
      //       return post
      //     })
      //   })
      // }
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleLikes = async (event, id) => {
    const postToUpdate = await Client.get(`/post/${id}`)

    if (postToUpdate.data && !postToUpdate.data.like.includes(user.id)) {
      const likePost = { ...postToUpdate.data }
      //setLikes(likePost.like.length)
      console.log(likePost)
      likePost.like.push(user.id)

      //setLikes(likePost.like.length)
      await Client.put(`/post/${id}`, { like: likePost.like })
      setIsLike(!isLike)
      //setLikes(likes + 1)
      //setPostList(postList)
    } else {
      console.log("already liked the post")
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
      if (usr._id.includes(userData.following)) {
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
                    if (commentText.trim() !== "") {
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
                {p.comment}
              </div>
            ))
          : console.log("error")}
      </div>
    </div>
  )
}

export default FollowingPosts
