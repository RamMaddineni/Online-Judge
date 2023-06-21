import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/profile",
          {
            token: localStorage.token,
          }
        );

        const parseRes = await response.json();
        console.log(parseRes);
        setUser(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      <h1>hi ${user.name}</h1>
      <h2>userId : ${user.Id}</h2>
    </div>
  );
};

export default Profile;
