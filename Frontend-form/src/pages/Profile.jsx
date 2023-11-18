import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
  const [userId, setUserId] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getUserId = async (userById) => {
    const results = await axios.get(`http://localhost:3000/users/${userById}`);
    setUserId(results.data.data);
    console.log(results.data.data);
  };

  return (
    <div>
      {userId.map((user) => {
        return (
          <>
            <div>
              <p>{user.fullName}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Profile;
