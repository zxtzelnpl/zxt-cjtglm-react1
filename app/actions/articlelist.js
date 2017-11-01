import * as actionTypes from '../constants/articlelist'

export function first(data) {
    return {
        type: actionTypes.ARTICLELIST_INIT,
        data
    }
}

export function load(data) {
    return {
        type: actionTypes.ARTICLELIST_LOAD,
        data
    }
}

export function add(data) {
    return {
        type: actionTypes.ARTICLELIST_ADD,
        data
    }
}