import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import Hashtag from "./components/Hashtag"
import "./App.css"
import { checkSession } from "./services/Auth"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Home from "./components/Home"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("Token", token)
    if (token) {
      checkToken()
    }
  }, [])

  const checkToken = async () => {
    const user = await checkSession()
    console.log("user", user)
    setUser(user)
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
        </Routes>
      </main>
    </div>
  )
}

export default App
