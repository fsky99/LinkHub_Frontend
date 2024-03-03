import { useState, useEffect } from 'react'
import axios from 'axios'

const Sidebar = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState('')

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

  return (
    <div>
      <aside  >
        <div >
          <div id="search-users">
            <input
              onChange={handleChange}
              type="text"
              name="search"
              id="search"
            />
          </div>
          <menu >
            <div>
              {listUsers.map(
                (usr) =>
                  usr.userName
                    .toLowerCase()
                    .includes(searchUsers.toLowerCase()) && (
                    <p key={usr._id}>
                      <a href="#">{usr.userName}</a>
                      <a href="">Visit</a>
                    </p>
                  )
              )}
            </div>
          </menu>
          <div className="bottom-padding"></div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
