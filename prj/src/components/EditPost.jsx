import "../App.css"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Client from "../services/api"

const EditPost = ({ user }) => {
  let { id } = useParams()

  useEffect(() => {
    findPost()
  }, [])

  const [postData, setPostData] = useState({
    text: "",
    hashtag: [],
  })
  const [input, setInput] = useState()

  const findPost = async () => {
    const res = await Client.get(`/post/${id}`)
    setPostData(res.data)
  }

  const handleChange = async (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await Client.put(`/post/${id}`, {
      text: postData.text,
      hashtag: postData.hashtag,
    })
  }

  const handleHashtagInputChange = (e) => {
    setInput(e.target.value)
    //setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const addHashtags = () => {
    const newHash = { ...postData, hashtag: [...postData.hashtag, input] }
    setPostData(newHash)
    setInput(" ")
  }

  const removeHashtag = (index) => {
    let list = [...postData.hashtag]
    list.splice(index, 1)

    const afterRemoveHash = { ...postData, hashtag: list }
    setPostData(afterRemoveHash)
  }

  return (
    <div className="CraetePostDiv">
      <h1 className="AddNewPost">Edit Post</h1>

      <input
        placeholder="Add Text"
        className="inputClass"
        name="text"
        type="text"
        onChange={handleChange}
        value={postData.text}
        id="text"
      />
      <br />
      <br />
      <input
        placeholder="Add #"
        className="inputClass2"
        name="hashtag"
        id="hashtag"
        value={input}
        onChange={handleHashtagInputChange}
      />

      <button className="buttonsCreatePost" onClick={addHashtags}>
        <span className="box 2">+</span>
      </button>
      <br />
      <br />

      <h3 className="hashtagsAdded">
        Hashtags:
        {postData
          ? postData.hashtag.map((hash, index) => (
              <div key={index}>
                {" "}
                <h4>
                  #{hash}{" "}
                  <button
                    className="buttonsCreatePost"
                    onClick={() => removeHashtag(index)}
                  >
                    <span className="box 3">X</span>
                  </button>{" "}
                </h4>
              </div>
            ))
          : null}
      </h3>

      <button
        className="buttonsCreatePost"
        type="submit"
        onClick={handleSubmit}
      >
        <span className="box">Submit</span>
      </button>
    </div>
  )
}

export default EditPost
