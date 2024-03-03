import { Link } from "react-router-dom"
import "../App.css"

const Nav = ({ user }) => {
  console.log("user:",user)

  const userOptions = (
    <nav id="navbar">
      {/* <img src="https://picsum.photos/seed/picsum/200/300" alt="" /> */}
      <Link to="/">LinkHub</Link>
      <Link to="/">Home</Link>
      <Link to="/following">Following posts</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/signout">Sign out</Link>
      {/* Create Post */}
    </nav>
  )

  const publicOptions = (
    <nav>
      {/* <img src="https://picsum.photos/seed/picsum/200/300" alt="" /> */}
      <Link to="/">LinkHub</Link>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign up</Link>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Nav
