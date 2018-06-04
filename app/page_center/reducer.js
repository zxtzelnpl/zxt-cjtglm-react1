import * as actionTypes from './actionTypes';

export const initialState = {
  isFetching: false,
  receivedAt: 0,
  error: null
};

export default function userinfo(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case actionTypes.USERINFO_REQUEST:
      nextState = {
        ...state,
        error: null,
        isFetching: true
      };
      return nextState;
    case actionTypes.USERINFO_RECEIVED:
      nextState = {
        ...state,
        isFetching: false,
        receivedAt: action.receivedAt,
        ...action.data
      };
      return nextState;
    case actionTypes.USERINFO_ERROR:
      nextState = {
        ...state,
        isFetching: false,
        error: action.error
      };
      return nextState;
    case actionTypes.USERINFO_CHANGE:
      nextState = {
        ...state,
        isFetching: false,
        receivedAt: action.receivedAt,
        ...action.data
      };
      return nextState;
    default:
      return state;
  }
}
