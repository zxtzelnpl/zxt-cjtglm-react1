import * as actionTypes from '../constants/subscriblelist'

export default function subscriblelist(state = [], action) {
    let _state;
    switch (action.type) {
        case actionTypes.SUBSCRIBLELIST_INIT:
            _state = action.data
            return _state
        default:
            return state
    }
}