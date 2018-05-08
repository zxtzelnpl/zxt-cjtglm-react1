import * as actionTypes from './actionTypes'

export function change(data) {
    return {
        type: actionTypes.REGISTERSTATEMENT_CHANGE,
        data
    }
}