import * as actionTypes from './actionTypes';
import * as URLS from './urls';

import myStorage from '../static/js/myStorage';
import moment from 'moment';
import wxConfig from '../config/weixin';

const request = () => ({type: actionTypes.WXINFO_REQUEST});

export const received = data => {
  myStorage.setItem('wxinfo', data); // wxinfo需要存入localStorage;
  return {
    type: actionTypes.WXINFO_RECEIVED,
    receivedAt: moment().format('X'),
    data
  };
};

const errorHandle = error => ({
  type: actionTypes.WXINFO_ERROR,
  error
});

const getQuery = search => {
  const query = {};
  const _query = search.slice(1).split('&');
  _query.forEach(str => {
    const arr = str.split('=');
    query[arr[0]] = arr[1];
  });
  return query;
};

const getCode = () => {
  const url = encodeURIComponent(window.location.href);
  const urlCode = `${URLS.GET_CODE}?appid=${wxConfig.AppID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=lk#wechat_redirect`;
  window.location.href = urlCode;
};

const shouldFetch = state => !state.wxinfo.isFetching;

const fetchWxinfo = code => dispatch => {
  dispatch(request());
  const url = `${URLS.GET_OPEN_ID}?code=${code}`;

  return fetch(url)
    .then(res => res.json)
    .then(json => {
      if (json.erro !== 'OK') {
        throw new Error('您还没有关注公众号《超级投顾联盟》，请先关注后查看页面');
      } else {
        dispatch(received(json));
      }
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchWxinfoIfNeeded = search => (dispatch, getState) => {
  let wxinfo = myStorage.getItem('wxinfo'); // 从localStorage取出wxinfo;
  if (wxinfo) {
    wxinfo = JSON.parse(wxinfo);
    return dispatch(received(wxinfo));
  }

  const query = getQuery(search);
  const code = query.code;
  if (!code) {
    return getCode();
  }
  if (shouldFetch(getState())) {
    return dispatch(fetchWxinfo(code));
  }
};
