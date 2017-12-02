import * as actionTypes from '../constants/subscriblelist'

export default function subscribelist(state = [], action) {
    let _state;
    switch (action.type) {
        case actionTypes.SUBSCRIBLELIST_GET:
            _state = action.data
            return _state
        default:
            return state
    }
}