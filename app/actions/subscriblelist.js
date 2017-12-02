import * as actionTypes from '../constants/subscriblelist'

export function get(data) {
    return {
        type: actionTypes.SUBSCRIBLELIST_GET,
        data
    }
}