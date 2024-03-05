import '../App.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditPost = ({ user }) => {
  let { id } = useParams()
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {}, [])

  return (
    <div className="CraetePostDiv">
      <h1 className="AddNewPost">Edit Post</h1>
    </div>
  )
}

export default EditPost
