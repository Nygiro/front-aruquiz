import React from 'react';
import { Redirect } from "react-router-dom"
import { useApolloClient } from '@apollo/react-hooks';
import { ARUQUIZ_USER_IS_LOGGED_IN, ARUQUIZ_USER_USERNAME, ARUQUIZ_USER_TOKEN } from '../utils/Constants';

const RedirectLogout = () => {
  const client = useApolloClient();
  localStorage.clear();
  client.writeData({
    data: {
      isLoggedIn: localStorage.getItem(ARUQUIZ_USER_IS_LOGGED_IN),
      userName: localStorage.getItem(ARUQUIZ_USER_USERNAME),
      userToken: localStorage.getItem(ARUQUIZ_USER_TOKEN),
    }
  });
  return <Redirect to="/" />;
}

export default RedirectLogout;