import { Middleware } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  email?: string;
  id?: string;
}

export const loginMW: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  // getting only the token from the store, and saving as JSON to local storage
  const tokenState = storeApi.getState().login.token;
  // const tokenJSON = JSON.stringify(tokenState);
  localStorage.setItem('token', tokenState);

  //  decode the token and save needed data to local storage
  if (tokenState) {
    const decodedToken: DecodedToken = jwtDecode(tokenState);
    const email = decodedToken.email;
    if (email) {
      localStorage.setItem('email', email);
    }
  }
  return result;
};
