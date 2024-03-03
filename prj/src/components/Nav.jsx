import { Link } from "react-router-dom"
import "../App.css"

const Nav = ({ user, handleLogOut }) => {
  console.log("user:", user)

  const userOptions = (
    <nav>
      {/* <img src="https://picsum.photos/seed/picsum/200/300" alt="" /> */}
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
