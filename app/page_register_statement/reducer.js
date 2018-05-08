import * as actionTypes from './actionTypes'

const initialState = {
    show:false
}

export default function registerstatement (state = initialState, action) {
    switch (action.type) {
        case actionTypes.REGISTERSTATEMENT_CHANGE:
            return action.data
        default:
            return state
    }
}