import { useState, useEffect } from 'react'
import axios from 'axios'
import UsersProfile from './UsersProfile'

const Sidebar = ({ users }) => {
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
                placeholder="Search"
              />
            </div>
          </div>
          <menu>
            <div>
              {users
                ? users.map(
                    (usr) =>
                      usr.userName
                        .toLowerCase()
                        .includes(searchUsers.toLowerCase()) && (
                        <div key={usr._id}>
                          <a href="#" className="hideHyperlink">
                            {usr.userName}
                          </a>
                          <button
                            onClick={(e) => {
                              handleClick(e, usr._id)
                            }}
                          >
                            Visit
                          </button>
                          {/* <a href={`/usersProfile/${usr._id}`}className="hideHyperlink">    
                            Visit
                          </a> */}
                        </div>
                      )
                  )
                : null}
            </div>
          </menu>
          {selectedUser && <UsersProfile userId={selectedUser} />}

          <div className="bottom-padding"></div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
