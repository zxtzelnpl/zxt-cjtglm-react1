import { createStore } from 'redux'
import rootReducer from '../reducers'

// 触发 redux-devtools
let devToolsExtension = undefined
if(typeof window==='object'){
    if(typeof window.devToolsExtension === 'function'){
        devToolsExtension = window.devToolsExtension()
    }
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        devToolsExtension
    )
    return store
}