import axios from 'axios';

const setAuthToken = token => {
  // check for the token if it exist
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
