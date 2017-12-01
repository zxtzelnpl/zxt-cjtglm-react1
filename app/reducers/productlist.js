import * as actionTypes from '../constants/productlist'
import teacher_data_format from '../static/js/teacher_data_format'

const _initialState = [];
_initialState.sort(function (a, b) {
    return parseInt(a.rank) - parseInt(b.rank)
})

const initialState = new Map()
_initialState.forEach((item) => {
    initialState.set(item.id, item)
})


export default function productlist(state = initialState, action) {
    let _state = new Map()
    switch (action.type) {
        case actionTypes.PRODUCTLIST_LOAD:
            teacher_data_format(action.data)
            action.data.sort(function (a, b) {
                return parseInt(a.rank) - parseInt(b.rank)
            })
            action.data.forEach((item) => {
                _state.set(item.id, item)
            })
            return _state
        case actionTypes.PRODUCTLIST_ADD:
            state.forEach((item) => {
                _state.set(item.id, item)
            })
            _state.set(action.data.id, action.data)
            return _state
        default:
            return state
    }
}