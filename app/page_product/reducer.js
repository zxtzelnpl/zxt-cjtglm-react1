import * as actionTypes from './actionTypes';
import teacher_data_format from '../static/js/teacher_data_format';

const initialState = {
  ids: [],
  data: {},
  isFetching: false,
  receivedAt: 0,
  error: null
};

export default function productlist(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case actionTypes.PRODUCT_REQUEST:
      nextState = {
        ...state,
        isFetching: true,
        error: null
      };
      return nextState;
    case actionTypes.PRODUCT_RECEIVED:
      teacher_data_format(action.data);
      nextState = {
        ...state,
        isFetching: false,
        error: null
      };
      action.data.forEach(product => {
        const id = product.id;
        if (typeof nextState.data[id] === 'undefined') {
          nextState.ids.push(id);
        }
        nextState.data[id] = product;
      });
      nextState.ids.sort((a, b) => (nextState.data[a].rank - nextState.data[b].rank));
      return nextState;
    case actionTypes.PRODUCT_ERROR:
      nextState = {
        ...state,
        isFetching: false,
        error: action.error
      };
      return nextState;

    // case actionTypes.PRODUCTLIST_LOAD:
    //   teacher_data_format(action.data);
    //
    //   action.data.sort(function (a, b) {
    //     return parseInt(a.rank) - parseInt(b.rank);
    //   });
    //   action.data.forEach((item) => {
    //     _state.set(item.id, item);
    //   });
    //   return _state;
    // case actionTypes.PRODUCTLIST_ADD:
    //   state.forEach((item) => {
    //     _state.set(item.id, item);
    //   });
    //   _state.set(action.data.id, action.data);
    //   return _state;
    default:
      return state;
  }
}
