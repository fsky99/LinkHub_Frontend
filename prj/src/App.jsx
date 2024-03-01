import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import Post from './components/Post'
import "./App.css"
import Nav from "./components/Nav"
import  Profile from './components/Profile'

function App() {
  const [user, setUser] = useState("null")




  return (
    <div>
      <Nav user={user} />

      <main>
        <Routes>
          <Route path="/profile" element= {<Profile/>}/>
          
          
          </Routes>
          <Post />
      </main>
    </div>
  )
}

export default App
