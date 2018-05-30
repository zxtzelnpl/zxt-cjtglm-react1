import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import {list as ArticleListPage} from './page_article'; // 文章列表页面
import {detail as ArticleDetailPage} from './page_article'; // 文章详情页面

import {view as ProductPage} from './page_product'; // 投顾列表页面
import {view as TeacherPage} from './page_teacher'; // 投顾详情页面
import {view as CenterPage} from './page_center'; // 用户中心页面
import {view as ProtocolPage} from './page_protocol'; // 用户协议页面

import {view as MySubscribePage} from './page_my_subscribe'; // 个人订阅列表页面
import {view as MySubscribeArticlePage} from './page_my_subscribe_article'; // 个人订阅单个产品页面
import {view as WeiXin0Page} from './page_weixin'; // 微信模版推送
import {view as TuiGuang} from './page_tui_guang'; // 推广模版推送
import {view as NotFound} from './page_not_found'; // Not Found
import {view as RegisterStatement} from './page_register_statement'; // 注册声明弹出框
import {view as ErrPage} from './page_err'; // 错误页面


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

    <Route path="/test/errpage/:message" component={ErrPage}/>
    <RegisterStatement/>
  </div>
);

export default App;
