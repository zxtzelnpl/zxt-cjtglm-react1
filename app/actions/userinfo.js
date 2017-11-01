import * as actionTypes from '../constants/userinfo'

export function change_score(score) {
    return {
        type: actionTypes.USERINFO_SCORE,
        score
    }
}

export function load(data) {
    return {
        type: actionTypes.USERINFO_LOAD,
        data
    }
}

export function change_name(name) {
    return {
        type: actionTypes.USERINFO_NAME,
        name
    }
}

export function change_account(account) {
    return {
        type: actionTypes.USERINFO_ACCOUNT,
        account
    }
}

export function change_id(ID_number) {
    return {
        type: actionTypes.USERINFO_ID,
        ID_number
    }
}