import React, { FC, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

/**
 * Functional Component for handling callback from authorisation server to 
 * obtain access_token for authenticated user.
 * @param param0 location - URL callback originated from.
 */
const LoginCallback: FC<RouteComponentProps> = ({ location }) => {
  const history = useHistory();

  /**
   * Function that executes immediately when component mounts. Obtains 
   * access_token using returned auth_code from authenticated user, 
   * saves users credentials to storage and navigates window to Dashbaord 
   * component.
   */
  useEffect(() => {
    const authCode = (location.search.match(/code=([^&]+)/) || [])[1];
    const postParameters = `grant_type=authorization_code&scope=read`+
                                                            `&code=${authCode}`;

    fetch(`http://localhost:9090/oauth/token?${postParameters}`, {
    method: 'POST',
    headers: {'Authorization': 'Basic Y2xpZW50MjpzZWNyZXQy'}})
    .then(res => res.json())
    .then(response => {
      var decode = jwt_decode(response.access_token); // user credentials

      // save response values to storage
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("user", JSON.stringify(decode));
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('token_type', response.token_type);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('expires_in', response.expires_in);
      localStorage.setItem('scope', response.scope);

      history.push('/dashboard');
    })
    .catch(console.error);
  }, []);
  return null;
};

export default LoginCallback;