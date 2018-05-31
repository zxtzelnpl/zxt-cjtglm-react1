import * as actionTypes from './actionTypes';
import * as URLS from './urls';
import moment from 'moment/moment';

const request = () => ({
  type: actionTypes.USERINFO_REQUEST
});

const received = data => ({
  type: actionTypes.USERINFO_RECEIVED,
  receivedAt: moment().format('X'),
  data
});

const errorHandle = error => ({
  type: actionTypes.USERINFO_ERROR,
  error
});

const shouldFetch = state => !state.userinfo.isFetching;

const addUser = user => dispatch => {
  dispatch(request());
  const {phone, openid, head_log, nick_name, city} = user;
  const url = `${URLS.ADD_USER}?type=1&phone=${phone}&openid=${openid}&head_log=${head_log}&nike_name=${nick_name}&city=${city}`;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json[0].erro === '1') {
        const _wxinfo = {...this.props.wxinfo};
        _wxinfo.user_count = '1';
        localStorage.setItem('wxinfo', JSON.stringify(_wxinfo));
        this.props.wxInfoActions.update(_wxinfo);
      }
      else {
        throw new Error(json[0].msg);
      }
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};


// export function change_score(score) {
//   return {
//     type: actionTypes.USERINFO_SCORE,
//     score
//   };
// }
//
// export function load(data) {
//   return {
//     type: actionTypes.USERINFO_LOAD,
//     data
//   };
// }
//
// export function change_name(name) {
//   return {
//     type: actionTypes.USERINFO_NAME,
//     name
//   };
// }
//
// export function change_account(account) {
//   return {
//     type: actionTypes.USERINFO_ACCOUNT,
//     account
//   };
// }
//
// export function change_id(ID_number) {
//   return {
//     type: actionTypes.USERINFO_ID,
//     ID_number
//   };
// }
