import { GET_ERRORS, SET_CURRENT_STUDENT } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register a user
export const signupStudent = (studentData, history) => dispatch => {
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

// Get student token
export const signinStudent = studentData => dispatch => {
  axios
    .post('/api/v1/auth/sign-in', studentData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get student data
      const decoded = jwt_decode(token);
      // Set current user
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
