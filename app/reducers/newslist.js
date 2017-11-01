import * as actionTypes from '../constants/newslist'

export default function articlelist(state = [], action) {
    let _state;
    switch (action.type) {
        case actionTypes.NEWSLIST_INIT:
            _state = action.data
            return _state
        case actionTypes.NEWSLIST_ADD:
            _state = state.concat(action.data)
            return _state
        default:
            return state
    }
}