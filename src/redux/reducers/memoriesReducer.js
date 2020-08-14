const memories = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEMORIES':
      return action.payload;
    default:
      return state;
  }
};

export default memories;
