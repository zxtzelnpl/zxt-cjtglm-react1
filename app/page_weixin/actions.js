import * as actionTypes from './actionTypes';
import * as URLS from './urls';
import myStorage from '../static/js/myStorage';

import moment from 'moment';

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

const shouldFetch = state => !state.wxinfo.isFetching;

const fetchWxinfo = code => dispatch => {
  dispatch(request());
  const url = `${URLS.GET_OPEN_ID}?code=${code}`;

  return fetch(url)
    .then(res => res.json)
    .then(json => {
      dispatch(received(json));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchWxinfoIfNeeded = code => (dispatch, getState) => {
  let wxinfo = myStorage.getItem('wxinfo'); // 从localStorage取出wxinfo;

  if (wxinfo) {
    wxinfo = JSON.parse(wxinfo);
    return dispatch(received(wxinfo));
  }

  if (shouldFetch(getState())) {
    return dispatch(fetchWxinfo(code));
  }
};
