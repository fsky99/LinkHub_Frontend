import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Client from '../services/api'
import Hashtag from './Hashtag'
import Post from './Post'

const Home = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Client.get('/post')
        console.log('posts returned' + response.data)
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  const getRandomPosts = (count) => {
    const shuffled = posts.sort(() => 0.8 - Math.random())
    return shuffled.slice(1, count)
  }

  const handleClick = (post) => {
    console.log('Clicked post:', post)
  }

  return user ? (
    <div className="HomePageContainer">
      <div className="sideBarClass">
        <Sidebar />
      </div>
      <div className="contentClass">
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
      <h2 class="HomePageNotLoggedinUserhTwo">Welcome to LinkHub</h2>
      <p class="HomePageNotLoggedinUserPar">
        Your go-to destination for social connection and discovery! LinkHub is
        more than just a social media app -<br /> it's your gateway to a vibrant
        community where connections flourish, ideas spark, and conversations
        thrive.
      </p>

      <h3 class="HomePageNotLoggedinUserhThree">At LinkHub, you can:</h3>
      <ul class="HomePageNotLoggedinUserul">
        <li class="HomePageNotLoggedinUserli">
          <strong class="HomePageNotLoggedinUserStrong">Discover:</strong>{" "}
          Explore a diverse range of user profiles and interests, and uncover
          new connections that resonate with you.
        </li>
        <li class="HomePageNotLoggedinUserli">
          <strong class="HomePageNotLoggedinUserStrong">Connect:</strong> Add
          friends, follow intriguing profiles, and build lasting relationships
          with individuals who share your passions.
        </li>
        <li class="HomePageNotLoggedinUserli">
          <strong class="HomePageNotLoggedinUserStrong">Engage:</strong> Share
          your thoughts, experiences, and creativity through posts, comments,
          likes, and replies. Dive into meaningful discussions and connect with
          others who inspire you.
        </li>
      </ul>

      <p class="HomePageNotLoggedinUserPar">
        Whether you're looking to stay connected with friends, share your latest
        adventures, or dive into new interests, LinkHub provides a seamless and
        immersive platform to make your social experience truly unforgettable.
      </p>

      <p class="HomePageNotLoggedinUserPar">
        Join the LinkHub community today and embark on a journey of connection,
        discovery, and endless possibilities. Sign up now to start exploring the
        power of social connection with LinkHub!
      </p>
    </div>
  )
}

export default Home
