import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Client from '../services/api'
import Hashtag from './Hashtag'
import Post from './Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Client.get('/post')

        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/user`)
    setListUsers(response.data)
  }

  const getRandomPosts = (count) => {
    const shuffled = posts.sort(() => 0.8 - Math.random())
    return shuffled.slice(1, count)
  }

  const handleClick = (post) => {
    console.log('Clicked post:', post)
  }

  const handleClickToNavigate = () => {
    navigate('/signin')
  }

  return user ? (
    <div className="HomePageContainer">
      <div className="sideBarClass">
        <Sidebar users={listUsers} />
      </div>
      <div className="contentClass homeClass">
        <div className="innerContentRow">
          <div className="hashtagsClass">
            <Hashtag user={user} />
          </div>
          <div className="imagesClass">
            <h1 className="HeaderH1">Posts</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {getRandomPosts(8).map((p, index) => (
                <div
                  key={index}
                  style={{ flex: '0 0 25%', margin: '0 0.5rem 1rem 0' }}
                  onClick={() => handleClick(p)}
                >
                  <img src={p.image} className="IMGPOSTHOMEPAGE" />
                  <h2 className="TEXTPOSTHOMEPAGE">{p.text}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="homePageNLUContainer">
      <div className="homePageNotLoggedIn">
        <div className="textForHomePage">
          <h2 class="HomePageNotLoggedinUserhTwo">Welcome to LinkHub</h2>
          <p class="HomePageNotLoggedinUserPar">
            Your go-to destination for social connection and discovery! LinkHub
            is more than just a social media app -<br /> it's your gateway to a
            vibrant community where connections flourish, ideas spark, and
            conversations thrive.
          </p>
          <button className="gettingStarted" onClick={handleClickToNavigate}>
            <span>Continue</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                stroke-width="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>{' '}
          </button>
        </div>
        <img
          className="imgHomePage"
          src="https://i.ibb.co/17XSKBY/Connected-world-amico.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Home
