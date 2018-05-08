import {createStore} from 'redux'
import {combineReducers} from 'redux'
import {reducer as userinfo} from '../page_center'
import {reducer as registerstatement} from './registerstatement'
import {reducer as productlist} from './productlist'
import {reducer as articlelist} from './articlelist'
import {reducer as subscriblelist} from './subscriblelist'
import {reducer as newslist} from './newslist'
import {reducer as wxinfo} from './wxinfo'

const rootReducer = combineReducers({
  userinfo,
  productlist,
  registerstatement,
  articlelist,
  subscriblelist,
  newslist,
  wxinfo
})

// 触发 redux-devtools
let devToolsExtension = undefined
if (typeof window === 'object') {
  if (typeof window.devToolsExtension === 'function') {
    devToolsExtension = window.devToolsExtension()
  }
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    devToolsExtension
  )
  return store
}