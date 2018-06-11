import {combineReducers} from 'redux';
import userinfo from './userinfo';
import registerstatement from './registerstatement';
import productlist from './productlist';
import articlelist from './articlelist';
import subscriblelist from './subscriblelist';
import newslist from './newslist';
import wxinfo from './wxinfo';
import {reducer as world_cup} from '../page_world_cup';

export default combineReducers({
  userinfo,
  productlist,
  registerstatement,
  articlelist,
  subscriblelist,
  newslist,
  wxinfo,
  world_cup
});
