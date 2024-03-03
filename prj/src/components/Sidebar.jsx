import { useState, useEffect } from 'react'
import axios from 'axios'

const Sidebar = ({ users }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [searchUsers, setSearchUsers] = useState('')

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {}, [])

  const handleChange = (e) => {
    if (e.target.name === 'search') {
      setSearchUsers(e.target.value)
    }
  }

  return (
    <div>
      <aside id="sidebarComp" className="nano">
        <div className="nano-content">
          <div id="search-users">
            <input
              onChange={handleChange}
              type="text"
              name="search"
              id="search"
            />
          </div>

          <menu className="menu">
            <div>
              {users
                ? users.map(
                    (usr) =>
                      usr.userName
                        .toLowerCase()
                        .includes(searchUsers.toLowerCase()) && (
                        <p key={usr._id}>
                          <a href="#">{usr.userName}</a>
                          <a href="">Visit</a>
                        </p>
                      )
                  )
                : null}
            </div>
          </menu>

          <div className="bottom-padding"></div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
