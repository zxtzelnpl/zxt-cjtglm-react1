import { createStore } from 'redux'
import rootReducer from '../reducers'

let devToolsExtension = undefined

if(typeof window==='object'){
    if(typeof window.devToolsExtension === 'function'){
        devToolsExtension = window.devToolsExtension()
    }
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        devToolsExtension
    )
    return store
}