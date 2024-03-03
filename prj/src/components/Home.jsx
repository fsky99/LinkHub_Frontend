import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'

const Home = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    setListUsers(response.data)
  }

  return user ? (
    <div>
      <Sidebar users={listUsers} />
    </div>
  ) : (
    <div>///</div>
  )
}

export default Home
