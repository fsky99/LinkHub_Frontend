import '../App.css'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
  let navigate = useNavigate()

  return user ? (
    <div className="profile">
      <nav id="sidebar">
        <div className="sidebar-header">
          <a href="#">Edit Profile</a>
        </div>
      </nav>
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Profile
