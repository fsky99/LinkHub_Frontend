import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"

import "./App.css"
import { checkSession } from "./services/Auth"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Home from "./components/Home"
import FollowingPosts from "./components/FollowingPosts"
import EditProfile from "./components/EditProfile"
import Post from "./components/Post"
import Hashtag from "./components/Hashtag"
import UsersProfile from "./components/UsersProfile"
import EditPost from "./components/EditPost"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  const checkToken = async () => {
    const user = await checkSession()
    await setUser(user)
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />

      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/craetePpost" element={<Post user={user} />} />
          <Route path="edit" element={<EditProfile user={user} />} />
          <Route
            path="/followingPosts"
            element={<FollowingPosts user={user} />}
          />
          <Route
            path="/UsersProfile/:id"
            element={<UsersProfile user={user} />}
          />
          <Route path="/EditPost/:id" element={<EditPost user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
