import * as actionTypes from './actionTypes';

export const initialState = {};

export default function userinfo(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case actionTypes.USERINFO_SCORE:
      nextState = {...state};
      nextState.score = action.score;
      localStorage.setItem('userinfo', JSON.stringify(nextState));
      return nextState;
    case actionTypes.USERINFO_NAME:
      nextState = {...state};
      nextState.name = action.name;
      localStorage.setItem('userinfo', JSON.stringify(nextState));
      return nextState;
    case actionTypes.USERINFO_ACCOUNT:
      nextState = {...state};
      nextState.account = action.account;
      localStorage.setItem('userinfo', JSON.stringify(nextState));
      return nextState;
    case actionTypes.USERINFO_ID:
      nextState = {...state};
      nextState.ID_number = action.ID_number;
      localStorage.setItem('userinfo', JSON.stringify(nextState));
      return nextState;
    case actionTypes.USERINFO_LOAD:
      localStorage.setItem('userinfo', JSON.stringify(action.data));
      return action.data;
    default:
      return state;
  }
}
