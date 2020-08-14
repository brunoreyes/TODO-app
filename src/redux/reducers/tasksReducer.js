const ideas = (state = [], action) => {
  switch (action.type) {
    case 'SET_IDEAS':
      return action.payload;
    default:
      return state;
  }
};

export default ideas;
