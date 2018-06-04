import moment from 'moment/moment';
import * as actionTypes from './actionTypes';
import * as URLS from './urls';
import {actions as WxAction} from '../page_weixin';

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

const change = data => ({
  type: actionTypes.USERINFO_CHANGE,
  receivedAt: moment().format('X'),
  data: data
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
        WxAction.received(_wxinfo);
      } else {
        throw new Error(json[0].msg);
      }
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const addUserIfNeeded = user => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(addUser(user));
  }
};

const fetchUser = openid => dispatch => {
  dispatch(request());
  const url = `${URLS.GET_USERINFO}?openid=${openid}`;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      dispatch(received(json[0]));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchUserIfNeeded = openid => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchUser(openid));
  }
};

const changeUser = (openid, key, value) => dispatch => {
  dispatch(request());
  const url = `${URLS.CHANGE_USER}?type=2&openid=${openid}&${key}=${value}`;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json[0].erro === '1') {
        const data = {};
        if (key === 'user_name') {
          data.name = value;
        } else if (key === 'number') {
          data.ID_number = value;
        } else {
          data[key] = value;
        }
        dispatch(change(data));
      } else {
        throw new Error('数据连接错误，请稍后重试');
      }
    })
    .catch(error => {
      dispatch(errorHandle(error));
    })
  ;
};

export const changeUserIfNeeded = (openid, key, value) => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(changeUser(openid, key, value));
  }
};
