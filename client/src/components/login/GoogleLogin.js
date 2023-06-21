import React from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
function GoogleLogin() {
  const handleCallbackResponse = (response) => {
    console.log("Encode Jwt : ", response.credential);
    let userObject = jwt_decode(response.credential);
    console.log("Decode Jwt : ", userObject);
    const user = {
      name: userObject.name,
      email: userObject.email,
    };
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "495337380519-ji1hsn7bsmjgjd4lln75lhu5lluq2nv4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", width: "20%", height: 50 }
    );
  }, []);
  return <div id="google-login-button"></div>;
}

export default GoogleLogin;
