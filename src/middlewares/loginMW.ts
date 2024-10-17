import { Middleware } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  email?: string;
  id?: string;
}

export const loginMW: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  const tokenState = storeApi.getState().login.token;

  if (tokenState) {
    try {
      // Store token in both localStorage and sessionStorage
      localStorage.setItem('token', tokenState);
      sessionStorage.setItem('token', tokenState);

      // Decode the token and save needed data
      const decodedToken: DecodedToken = jwtDecode(tokenState);
      if (decodedToken.email) {
        localStorage.setItem('email', decodedToken.email);
        sessionStorage.setItem('email', decodedToken.email);
      }
      if (decodedToken.id) {
        localStorage.setItem('userId', decodedToken.id);
        sessionStorage.setItem('userId', decodedToken.id);
      }
    } catch (error) {
      console.error('Error processing token:', error);
    }
  } else {
    // Clear storage if there's no token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('email');
    sessionStorage.removeItem('email');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  }

  return result;
};
