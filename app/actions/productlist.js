import * as actionTypes from '../constants/productlist'

export function load(data) {
    return {
        type: actionTypes.PRODUCTLIST_LOAD,
        data
    }
}

export function add(data) {
    return {
        type: actionTypes.PRODUCTLIST_ADD,
        data
    }
}