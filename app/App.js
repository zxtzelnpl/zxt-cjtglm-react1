'use strict'
import React from 'react'
import {
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
import WeiXin0Page from './containers/WeiXin0Page' //微信模版推送
import TuiGuang from './containers/TuiGuang' //推广模版推送
import NotFound from './components/NotFound' //Not Found
import RegisterStatement from './containers/RegisterStatement' //注册声明弹出框


const App = () => (
    <div className="container">
      <Route exact path="/" render={() => (<Redirect to="/center"/>)}/>
      <Route path="/articlelist" component={ArticleListPage}/>
      <Route path="/article/:id" component={ArticleDetailPage}/>
      <Route path="/product" component={ProductPage}/>
      <Route path="/teacher/:id" component={TeacherPage}/>
      <Route path="/usercenter" component={CenterPage}/>
      <Route path="/center" component={CenterPage}/>
      <Route path="/protocol" component={ProtocolPage}/>

      <Route path="/mysubscirbe/:id" component={MySubscribePage}/>
      <Route path="/mysubscribearticle/:id" component={MySubscribeArticlePage}/>
      <Route path="/weixin0/:id" component={WeiXin0Page}/>

      <Route path="/tg/:date" component={TuiGuang}/>
      <Route path="/notfound/:reason" component={NotFound}/>
      <RegisterStatement/>
    </div>
)

export default App