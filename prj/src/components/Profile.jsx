import "../App.css"

const Profile = () => {
  return (
    <div className="profile">
      <nav id="sidebar">
        <div className="sidebar-header">
          <a href="#">Edit Profile</a>
          <a href="#">Edit Picture</a>
          <a href="#">Request Verification</a>
          <a href="#">Create Hashtags</a>
        </div>
      </nav>

      <div className="main-Profile">

<div  class="profile-flex">

        <img src="" alt="" className="userImg" />
        
        <div id="following">
          <h5>50 Following</h5>
        </div>

        <div id="followers">
           <h5>50 Followers</h5> 
        </div>

</div>
      </div>

        <div id="post">
            {/* <h5>POST</h5> */}
        </div>


    </div>
  )
}

export default Profile
