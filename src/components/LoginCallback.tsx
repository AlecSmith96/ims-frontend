import React, { FC, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LoginCallback: FC<RouteComponentProps> = ({ location }) => {
  const history = useHistory();

  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    const qParams = [
      `grant_type=authorization_code`,
      `scope=read`,
      `code=${code}`
    ].join("&");

    fetch(`http://localhost:9090/oauth/token?${qParams}`, {
    // credentials: "include",
    method: 'POST',
    headers: {
      'Authorization': 'Basic Y2xpZW50MjpzZWNyZXQy'
    }})
    .then(res => res.json())
    .then(response => {
      var decode = jwt_decode(response.access_token);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("user", JSON.stringify(decode));
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('token_type', response.token_type);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('expires_in', response.expires_in);
      localStorage.setItem('scope', response.scope);
      history.push({pathname: '/dashboard', state: {
        authenticated: true,
        user: decode,
        access_token: response.access_token,
        token_type: response.token_type,
        refresh_token: response.refresh_token,
        expires_in: response.expires_in,
        scope: response.scope
      }});
      console.log(response);
    })
    .catch(console.error);
  }, []);
  return null;
};

export default LoginCallback;