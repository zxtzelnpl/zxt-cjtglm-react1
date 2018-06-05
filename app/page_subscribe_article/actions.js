import * as actionTypes from './actionTypes';
import * as URLS from './urls';

import moment from 'moment';

const request = () => ({
  type: actionTypes.SUBSCRIBLELIST_REQUEST
});

const received = data => ({
  type: actionTypes.SUBSCRIBLELIST_RECEIVED,
  receivedAt: moment().format('X'),
  data
});

const errorHandle = error => ({
  type: actionTypes.SUBSCRIBLELIST_ERROR,
  error
});

const shouldFetch = state => !state.subscribleArticle.isFetching;

const fetchArticleList = (user_id, produce_id) => dispatch => {
  dispatch(request());
  const url = `${URLS.USER_ANALYSTS_LIST}?user_id=${user_id}&produce_id=${produce_id}`;

  return fetch(url)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.replace(/\t/ig, ''));
      dispatch(received(json));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchfetchArticleListIfNeeded = (user_id, produce_id) => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchArticleList(user_id, produce_id));
  }
};
