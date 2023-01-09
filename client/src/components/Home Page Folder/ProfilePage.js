import React from "react";
import {useParams, Link} from "react-router-dom";

// function ProfilePage({ match }) {
    // const ProfilePage = ({match}) => {
    const ProfilePage = () => {


        const params = useParams()
        const userId = params.userId

  
    return (

      <div>
        <h1>Child Component</h1>


        <p>The id param is: {userId}</p>


    <Link to="/home">Home</Link>
      </div>



    );
  }


  export default ProfilePage