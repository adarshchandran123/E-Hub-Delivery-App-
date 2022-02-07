
import React from 'react';
import GoogleLogin from 'react-google-login';



const GoogleSignIn = () => {

    const responseGoogle = (response) => {
        console.log(response.profileObj.email);
      }

    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            <GoogleLogin
              clientId="495838305284-uv3jclutqh13clv2ovlou9evhfc9lidi.apps.googleusercontent.com"
              buttonText="Google Sign in"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleSignIn
