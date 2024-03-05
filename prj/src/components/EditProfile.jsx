// EditProfile.js

import React, { useEffect, useState } from "react"
import axios from "axios"

const EditProfile = ({ user }) => {
  // State variables to store user input
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [email, setEmail] = useState("")
// console.log("userr:",user);
  var BASE_URL = import.meta.env.VITE_BASE_URL
  
  const [profile, setProfile] = useState([])
 
    const findLoggedUser = async () => {
      const res = await axios.get(`${BASE_URL}/user/${user.id}`)
      // setProfile(res.data)
    // console.log(res.data);
    setProfile(res.data) 
    setName(res.data.userName)
    setEmail(res.data.email)
    setCountry(res.data.country)
    console.log("profile:", profile);
    } 

    useEffect(() => {
      findLoggedUser()
      // console.log(profile);
    }, [user?.id]) 
  
  console.log("user33", user)
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let updatedUser = {
        userName: name,
        country: country,
        email: email,
      } 
 
      const response = await axios.put(
        `${BASE_URL}/user/${user.id}`,
        updatedUser  
      )


 
      if (response.status === 200) {
        alert("Your profile has been successfully edited!")
        // window.location.reload()
      } else {
        throw new Error("Something went wrong! Please try again later.")
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
          />
        </label>

        {/* Country Input */}
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={country}
          />
        </label>

        {/* Email Input */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={email}
            disabled
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditProfile
