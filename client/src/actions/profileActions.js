import axios from 'axios';

import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getCurrentProfile = () => dispatch => {
  // this loads first before getting current profile
  dispatch(setProfileLoading());
  axios
    .get('/api/v1/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        // this sends the actual profile
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        // {} here signifies that a student can register without having a profile. Then, the student is redirected to a page where he can register his profile
        payload: {}
      })
    );
};

// clear profile
export const clearCurentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/v1/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Add university education
export const getUniversityEducation = (universityData, history) => dispatch => {
  axios
    .post('/api/v1/profile/education', universityData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
