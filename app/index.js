import './static/css/font-awesome.less'
import './static/css/public.less'
import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'

import Perf from 'react-addons-perf'

import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

import {
    HashRouter,
    Route,
    Redirect
} from 'react-router-dom'
import ProductPage from './containers/ProductPage' //投顾列表页面
import TeacherPage from './containers/TeacherPage' //投顾详情页面
import CenterPage from './containers/CenterPage' //用户中心页面
import ProtocolPage from './containers/ProtocolPage' //用户协议页面
import ArticleListPage from './containers/ArticleListPage' //文章列表页面
import ArticleDetailPage from './containers/ArticleDetailPage' //文章列表页面
import MySubscribePage from './containers/MySubscribePage' //个人订阅列表页面
import MySubscribeArticlePage from './containers/MySubscribeArticlePage' //个人订阅单个产品页面
import RegisterStatement from './containers/RegisterStatement' //注册声明弹出框
import WeiXin0 from './containers/WeiXin0' //微信模版推送
import NotFound from './components/NotFound' //Not Found

/**上线后一定要删除啊,别忘了啊**/
// localStorage.removeItem('wxinfo')
// localStorage.removeItem('userinfo')
/**上线后一定要删除啊,别忘了啊**/

if (__DEV__) {
    console.info('__DEV__是' + __DEV__ + '这里是测试环境')
    localStorage.setItem('wxinfo', '{"openid":"oy4PmwjoPAe6-eEUSIUcPm-4jYdQ","nick_name":"Aaron Z","province":"内蒙古","country":"中国","city":"兴安","sex":"1","headimgurl":"http://wx.qlogo.cn/mmopen/E0cm3AJSvSCZodaMYE3TQImBpsGb6HmhXicwVWJ6NFf66RN10CA4D3IOpDHgITfpHjqJv4libmofd1Wp4zfIlt9RueSw9XoNQF/0","channel":"其他","user_count":"1","erro":"OK"}')
    window.Perf = Perf
}




let App = () => (
    <HashRouter>
        <div className="container">
            <Route exact path="/" render={() =>(<Redirect to="/center"/>)}/>
            <Route path="/articlelist" component={ArticleListPage}/>
            <Route path="/article/:id" component={ArticleDetailPage}/>
            <Route path="/product" component={ProductPage}/>
            <Route path="/teacher/:id" component={TeacherPage}/>
            <Route path="/usercenter" component={CenterPage}/>
            <Route path="/center" component={CenterPage}/>
            <Route path="/protocol" component={ProtocolPage}/>

            <Route path="/mysubscirbe/:id" component={MySubscribePage}/>
            <Route path="/mysubscribearticle/:id" component={MySubscribeArticlePage}/>
            <Route path="/weixin0/:id" component={WeiXin0}/>

            <Route path="/notfound/:reason" component={NotFound}/>
            <RegisterStatement/>
        </div>
    </HashRouter>
)

let store = configureStore()
render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
)






