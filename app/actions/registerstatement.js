import * as actionTypes from '../constants/registerstatement'

export function change(data) {
    return {
        type: actionTypes.REGISTERSTATEMENT_CHANGE,
        data
    }
}