import { useState, useEffect } from "react"
import axios from "axios"

const Sidebar = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState("")

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    setListUsers(response.data)
  }

  const handleChange = (e) => {
    if (e.target.name === "search") {
      setSearchUsers(e.target.value)
    }
  }

  return (
    <div>
      <aside>
        <div>
          <div id="search-users">
            <div class="ss">
              <input
                type="text"
                name="search"
                class="inputSearch"
                id="search"
                onChange={handleChange}
                placeholder="Search"
              />
            </div>
          </div>
          <menu>
            <div>
              {listUsers.map(
                (usr) =>
                  usr.userName
                    .toLowerCase()
                    .includes(searchUsers.toLowerCase()) && (
                    <p key={usr._id}>
                      <a href="#" className="hideHyperlink">{usr.userName}</a> 
                      {/* <a href="" className="hideHyperlink">Visit</a> */}
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
