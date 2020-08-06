const ideas = (state = [], action) => {
  switch (action.type) {
    case 'SET_IDEAS':
      return action.payload;
    default:
      return state;
  }
};
// unlikne action.payload.data which would be the array: []
// return action.payload; {}
// this is just going one step before, 
// if we wanted to get the actual.data

// user will be on the redux state at:
// state.user
export default ideas;
