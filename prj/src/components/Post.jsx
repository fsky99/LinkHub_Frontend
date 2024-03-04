import "../App.css"
import { useRef, useState } from "react"
import axios from "axios"
import Client from "../services/api"

const Post = ({user}) => {
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const hashtagRef = useRef(null)
  const [hashtagsArr, setHashtagsArr] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  const addHashtags = () => {
    const newHash = hashtagRef.current.value.trim()
    if (newHash !== "") {
      setHashtagsArr((prevHashtags) => [...prevHashtags, newHash])
      hashtagRef.current.value = ""
    }
  }

  const handleHashtagInputChange = (e) => {
    if (e.key === " ") {
      e.preventDefault()
    }
  }

  const removeHashtag = (indexToRemv) => {
    setHashtagsArr((prevHashtags) =>
      prevHashtags.filter((_, index) => index !== indexToRemv)
    )
  }

  const handelImageChange = () => {
    if (imageRef.current.files && imageRef.current.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(imageRef.current.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (imageRef.current.files.length > 0) {
      formData.append("image", imageRef.current.files[0])
    } else {
      formData.append("image", "")
    }
    formData.append("text", textRef.current.value)
    hashtagsArr.forEach((hashtag) => {
      formData.append("hashtag", hashtag)
    })

    try {
      Client.post("/post" ,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      imageRef.current.value = ""
      textRef.current.value = ""
      setHashtagsArr([])
      setImagePreview(null)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <div>
      <h1>Add New Post</h1>
      <input
        placeholder="Add Image"
        type="file"
        ref={imageRef}
        id="imageID"
        onChange={handelImageChange}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      <br />
      <br />
      <input placeholder="Add Text" type="text" ref={textRef} id="textID" />
      <br />
      <br />
      <input
        placeholder="Add Hashtag #"
        type="text"
        ref={hashtagRef}
        id="hashtagID"
        onKeyDown={handleHashtagInputChange}
      />
      <button onClick={addHashtags}>+</button>
      <br />
      <br />
      <h3 id="hashtagsAdded">
        Hashtags:
        {hashtagsArr.map((hash, index) => (
          <span key={index}>
            {" "}
            #{hash} <button onClick={() => removeHashtag(index)}>X</button>{" "}
          </span>
        ))}
      </h3>
      <br />
      <br />
      <button onClick={handleSubmit}>Post</button>
    </div>
  )
}

export default Post
