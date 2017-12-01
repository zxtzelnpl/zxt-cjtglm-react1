import './static/css/font-awesome.less'
import './static/css/public.less'
import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'

import Perf from 'react-addons-perf'

import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

import {HashRouter} from 'react-router-dom'
import App from './App'

/**上线后一定要删除啊,别忘了啊**/
localStorage.removeItem('wxinfo')
localStorage.removeItem('userinfo')
/**上线后一定要删除啊,别忘了啊**/

if (__DEV__) {
    console.info('__DEV__是' + __DEV__ + '这里是测试环境')
    if(typeof localStorage === 'object'){
        localStorage.setItem('wxinfo', '{"openid":"oy4PmwjoPAe6-eEUSIUcPm-4jYdQ","nick_name":"Aaron Z","province":"内蒙古","country":"中国","city":"兴安","sex":"1","headimgurl":"http://wx.qlogo.cn/mmopen/E0cm3AJSvSCZodaMYE3TQImBpsGb6HmhXicwVWJ6NFf66RN10CA4D3IOpDHgITfpHjqJv4libmofd1Wp4zfIlt9RueSw9XoNQF/0","channel":"其他","user_count":"1","erro":"OK"}')
    }
    if(typeof window === 'object'){
        window.Perf = Perf
    }

}


let store = configureStore()
render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
    ,
    document.getElementById('root')
)






