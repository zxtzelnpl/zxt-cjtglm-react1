import * as actionTypes from '../constants/subscriblelist'

export function init(data) {
    return {
        type: actionTypes.SUBSCRIBLELIST_INIT,
        data
    }
}