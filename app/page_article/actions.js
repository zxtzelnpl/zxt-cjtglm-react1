import * as actionTypes from './actionTypes';
import * as URLS from './urls';

import moment from 'moment';

const request = () => ({
  type: actionTypes.ARTICLELIST_REQUEST
});

const received = data => ({
  type: actionTypes.ARTICLELIST_RECEIVED,
  receivedAt: moment().format('X'),
  data
});

const errorHandle = error => ({
  type: actionTypes.ARTICLELIST_ERROR,
  error
});

const shouldFetch = state => !state.articlelist.isFetchingList;

const fetchList = page => dispatch => {
  dispatch(request());
  const url = `${URLS.ARTICLE_LIST_DATA}?page=${page}`;

  return fetch(url)
    .then(res => res.json())
    .then(json => {
      dispatch(received(json));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

const fetchID = id => dispatch => {
  dispatch(request());
  const url = `${URLS.ARTICLE_ID_DATA}?id=${id}`;

  return fetch(url)
    .then(res => res.json())
    .then(json => {
      dispatch(received(json));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchListIfNeeded = page => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchList(page));
  }
};

export const fetchIDIfNeeded = id => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchID(id));
  }
};
