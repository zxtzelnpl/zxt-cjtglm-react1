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

const shouldFetch = state => !state.subscribleTeacher.isFetching;

const fetchTeacherList = user_id => dispatch => {
  dispatch(request());
  const url = `${URLS.SUBSCRIBE_TEACHER_LIST}?user_id=${user_id}`;

  return fetch(url)
    .then(res => res.json())
    .then(json => {
      dispatch(received(json));
    })
    .catch(error => {
      dispatch(errorHandle(error));
    });
};

export const fetchTeacherListIfNeeded = user_id => (dispatch, getState) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchTeacherList(user_id));
  }
};
