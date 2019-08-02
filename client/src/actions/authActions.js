import { GET_ERRORS } from './types';
import axios from 'axios';

// Register a user
export const signinUser = userData => dispatch => {
  axios
    .post('/api/v1/auth/sign-up', userData)
    .then(res => console.log(res.data))
    .catch(err =>
      // Redux thunk allows us to use dispatch
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
