import * as actionTypes from './actionTypes';

const initialState = {
  isFetching: false,
  receivedAt: 0,
  error: null
};

export default function wxinfo(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case actionTypes.WXINFO_REQUEST:
      nextState = {
        ...state,
        isFetching: true,
        error: null
      };
      return nextState;
    case actionTypes.WXINFO_RECEIVED:
      nextState = {
        isFetching: false,
        receivedAt: action.receivedAt,
        ...action.data
      };
      return nextState;
    case actionTypes.WXINFO_ERROR:
      nextState = {
        ...state,
        isFetching: false,
        error: action.error
      };
      return nextState;
    default:
      return state;
  }
}
