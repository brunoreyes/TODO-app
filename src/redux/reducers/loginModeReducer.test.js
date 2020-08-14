import loginModeReducer from './loginModeReducer';

// We can run a series of test using describe
describe('Testing the loginModeReducer...', () => {
  test('test initial state is login', () => {
    // Testing initialization, don't want the action to match a case
    const action = { type: 'junk' };
    // Testing initialization, so state  should be undefined
    const previousState = undefined;
    // Output should be our defauult state value.
    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual('login');
  });

  test('test switching to register mode', () => {
    const action = { type: 'SET_TO_REGISTER_MODE' };
    const previousState = 'login';
    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual('register');
  });
});
