const initialState = {
  isAuthenticated: false,
  // student is an obj. Read on obj
  student: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
