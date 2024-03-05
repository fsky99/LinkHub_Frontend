import { Link } from "react-router-dom"
import "../App.css"

const Nav = ({ user, handleLogOut }) => {


  const userOptions = (
    <nav id="navbar">
      {/* <img  src="../img/icon.png" alt="image" /> */}

<img src="../img/icon.png" alt="image" />

      <Link className="linkstochange link-hub-logo" to="/" >
        LinkHub
      </Link>

      <Link className="linkstochange" to="/">
        Home
      </Link>

      <Link className="linkstochange" to="/followingPosts">
        Following posts 
      </Link>

      <Link className="linkstochange" to="/profile">
        Profile
      </Link>
      <Link className="linkstochange" to="/craetePpost">
        Create Post
      </Link>

      <Link className="linkstochange" to="/signin" onClick={handleLogOut}>
        Sign out
      </Link> 
      {/* Create Post */}
    </nav>
  )

  const publicOptions = (
    <nav>
      {/* <img src="https://picsum.photos/seed/picsum/200/300" alt="" /> */}
      
      <Link to="/">LinkHub</Link>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Login</Link>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Nav
