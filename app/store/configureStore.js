import {createStore} from 'redux'
import {combineReducers} from 'redux'
import {reducer as userinfo} from '../page_center'
import {reducer as registerstatement} from '../page_register_statement'
import {reducer as productlist} from '../page_product'
import {reducer as articlelist} from '../page_article_list'
import {reducer as subscriblelist} from '../page_my_subscribe'
import {reducer as newslist} from '../page_my_subscribe_article'
import {reducer as wxinfo} from '../page_weixin'

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