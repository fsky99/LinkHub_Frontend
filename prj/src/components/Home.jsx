import Sidebar from './Sidebar'
const Home = ({ user }) => {
  return user ? (
    <div>
      <Sidebar />
    </div>
  ) : (
    <div>///</div>
  )
}

export default Home
