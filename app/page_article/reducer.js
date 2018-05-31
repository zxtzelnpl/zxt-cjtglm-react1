import * as actionTypes from './actionTypes';

const initialState = {
  ids: [],
  data: {},
  isFetching: false,
  receivedAt: 0,
  error: null
};

export default function articlelist(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case actionTypes.ARTICLELIST_REQUEST:
      nextState = {
        ...state,
        isFetching: true,
        error: null
      };
      return nextState;

    case actionTypes.ARTICLELIST_RECEIVED:
      nextState = {
        ...state,
        receivedAt: action.receivedAt,
        isFetching: false
      };
      action.data.forEach(article => {
        const id = article.id;
        if (typeof nextState.data[id] === 'undefined') {
          nextState.ids.push(id);
        }
        nextState.data[id] = article;
      });
      return nextState;

    case actionTypes.ARTICLELIST_ERROR:
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
