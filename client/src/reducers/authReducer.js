import { SET_CURRENT_STUDENT } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  // student is an obj. Read on obj
  student: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        // Checks if the payload with the decoded student is not empty
        isAuthenticated: !isEmpty(action.payload),
        student: action.payload
      };
    default:
      return state;
  }
}
