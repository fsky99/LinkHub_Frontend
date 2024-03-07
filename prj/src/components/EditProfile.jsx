// EditProfile.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EditProfile = ({ user }) => {
  // State variables to store user input
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  
  var BASE_URL = import.meta.env.VITE_BASE_URL

  const [profile, setProfile] = useState([])

  const findLoggedUser = async () => {
    const res = await axios.get(`${BASE_URL}/user/${user.id}`)
    
    setProfile(res.data)
    setName(res.data.userName)
    setEmail(res.data.email)
    setCountry(res.data.country)
  }

  useEffect(() => {
    findLoggedUser()
  }, [user?.id])

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let updatedUser = {
        userName: name,
        country: country,
        email: email
      }

      const response = await axios.put(
        `${BASE_URL}/user/${user.id}`,
        updatedUser
      )

      if (response.status === 200) {
        alert('Your profile has been successfully edited!')
        // window.location.reload()
      } else {
        throw new Error('Something went wrong! Please try again later.')
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="ContainerEditPRofile">
      <h1 className="AddNewPost">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label className="lablesForEditPost">
          Email{' '}
          <input
            type="email"
            className="inputClass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={email}
            disabled
          />
        </label>
        <br />
        <br />
        <br />
        {/* Name Input */}
        <label className="lablesForEditPost">
          Name{'   '}
          <input
            className="inputClass"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
          />
        </label>
        <br />
        <br />
        <br />
        {/* Country Input */}
        <label className="lablesForEditPost">
          Country{'  '}
          <input
            type="text"
            className="inputClass"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={country}
          />
        </label>

        <br />
        <br />
        <br />
        <button className="buttonsCreatePost" type="submit">
          <span className="box">Update</span>
        </button>

        {/* Submit Button */}
      </form>
    </div>
  )
}

export default EditProfile
