const reminders = (state = [], action) => {
  switch (action.type) {
    case 'SET_REMINDERS':
      return action.payload;
    default:
      return state;
  }
};

export default reminders;
