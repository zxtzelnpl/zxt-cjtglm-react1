import * as actionTypes from '../constants/newslist'

export function init(data) {
    return {
        type: actionTypes.NEWSLIST_INIT,
        data
    }
}

export function add(data) {
    return {
        type: actionTypes.NEWSLIST_ADD,
        data
    }
}