import { Link } from "react-router-dom"
import "../App.css"

const Nav = ({ user, handleLogOut }) => {
  const userOptions = (
    <nav>
      <Link className="linkstochange" to="/">
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
    </nav>
  )

  const publicOptions = (
    <nav>
      <Link to="/">LinkHub</Link>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Login</Link>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Nav
