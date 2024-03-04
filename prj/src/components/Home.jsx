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
    <div>WElcome to LinkHub Page</div>
  )
}

export default Home
