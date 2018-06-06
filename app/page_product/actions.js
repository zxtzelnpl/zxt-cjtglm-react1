import * as actionTypes from './actionTypes';
import * as URLS from './urls';

import moment from 'moment';

const request = () => ({
  type: actionTypes.PRODUCT_REQUEST
});

const received = data => ({
  type: actionTypes.PRODUCT_RECEIVED,
  receivedAt: moment().format('X'),
  data
});

const errorHandle = error => ({
  type: actionTypes.PRODUCT_ERROR,
  error
});

const shouldFetch = state => !state.productList.isFetching;

const fetchList = () => dispatch => {
  dispatch(request());
  const url = URLS.PRODUCT_LIST_DATA;

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
  const url = `${URLS.PRODUCT_LIST_DATA}?id=${id}`;

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
