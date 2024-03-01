import "../App.css";
import { useRef, useState } from "react";
import axios from "axios";

const Post = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const hashtagRef = useRef(null);
  const [hashtagsArr, setHashtagsArr] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handelFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addHashtags = () => {
    const newHash = [...hashtagsArr, hashtagRef.current.value.trim()];
    setHashtagsArr(newHash);
    hashtagRef.current.value = "";
  };

  const handleHashtagInputChange = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const removeHashtag = (indexToRemv) => {
    setHashtagsArr((prevHashtags) =>
      prevHashtags.filter((_, index) => index !== indexToRemv)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("text", textRef.current.value);
    formData.append("hashtag", JSON.stringify(hashtagsArr));

    try {
      await axios.post("http://localhost:3000/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form fields after successful upload
      imageRef.current.value = "";
      textRef.current.value = "";
      setHashtagsArr([]);
      setImagePreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <input
        placeholder="Add Image"
        type="file"
        accept="images/*"
        ref={imageRef}
        id="imageID"
        onChange={handelFileChange}
      />
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
        />
      )}
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
            #{hash}{" "}
            <button onClick={() => removeHashtag(index)}>X</button>{" "}
          </span>
        ))}
      </h3>
      <br />
      <br />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default Post;
