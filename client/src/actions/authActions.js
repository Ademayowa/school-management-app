import axios from 'axios';
// extracts student info from token
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_STUDENT, GET_ERRORS } from './types';

export const registerStudent = (studentData, history) => dispatch => {
  axios
    .post('/api/v1/auth/sign-up', studentData)
    .then(res => history.push('/sign-in'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Sign in student
export const signinStudent = studentData => dispatch => {
  axios
    .post('/api/v1/auth/sign-in', studentData)
    .then(res => {
      // save to localstorage
      const { token } = res.data;
      // set token to localstorage.
      localStorage.setItem('jwtToken', token);
      // set token to auth header.
      setAuthToken(token);
      // decoded extracts the student info from the token
      const decoded = jwt_decode(token);
      // set current student
      dispatch(setCurrentStudent(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in student
export const setCurrentStudent = decoded => {
  return {
    type: SET_CURRENT_STUDENT,
    payload: decoded
  };
};

// Sign out student
export const signout = () => dispatch => {
  // remove token from localstorage
  setAuthToken(false);
  // set current student to {} which sets isAuthenticated to false
  dispatch(setCurrentStudent({}));
};
