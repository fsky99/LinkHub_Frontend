import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UsersProfile from './UsersProfile'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
const Sidebar = ({ users }) => {
  let navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState('')

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    setListUsers(response.data)
  }
  const handleChange = (e) => {
    if (e.target.name === 'search') {
      setSearchUsers(e.target.value)
    }
  }

  let button
  const handleClick = (e, id) => {
    setSelectedUser(id)
  }

  return (
    <div>
      <aside>
        <div>
          <div id="search-users">
            <div className="ss">
              <input
                type="text"
                name="search"
                className="inputSearch"
                id="search"
                onChange={handleChange}
                placeholder="Search "
              />
            </div>
          </div>
          <menu>
            <div className="userSidebar">
              {users
                ? users.map(
                    (usr) =>
                      usr.userName
                        .toLowerCase()
                        .includes(searchUsers.toLowerCase()) && (
                        <div key={usr._id} className="card-name">
                          <a href="#" className="hideHyperlink">
                            {usr.userName}
                          </a>
                          <Link to={`/UsersProfile/${usr._id}`}>
                            <ArrowForwardIcon />
                          </Link>
                        </div>
                      )
                  )
                : null}
            </div>
          </menu>
          {/* {selectedUser && <UsersProfile userId={selectedUser} />} */}

          <div className="bottom-padding"></div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
