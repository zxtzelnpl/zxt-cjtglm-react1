import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {reducer as userinfo} from '../page_center';
import {reducer as registerstatement} from '../page_register_statement';
import {reducer as productList} from '../page_product';
import {reducer as articlelist} from '../page_article';
import {reducer as subscribleTeacher} from '../page_subscribe_teacher';
import {reducer as newslist} from '../page_my_subscribe_article';
import {reducer as wxinfo} from '../page_weixin';


const rootReducer = combineReducers({
  userinfo,
  productList,
  registerstatement,
  articlelist,
  subscribleTeacher,
  newslist,
  wxinfo
});
const middleware = [thunk];
let composeEnhancers = compose;

// 触发 redux-devtools
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  if (typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
