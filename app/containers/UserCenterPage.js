import './UserCenterPage.less'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as registerStatementActionsFromOtherFile from '../actions/registerstatement'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import {Link} from 'react-router-dom'
import InfoBox from '../components/InfoBox'
import Footer from '../components/Footer'

class UserCenterPage extends React.Component{
    constructor(props,content){
        super(props,content)
        this.url='/ashx/users_id.ashx'+'?openid=oijVfszBRm_nxYzNH6RAchSKXFxE'
        this.customer='021-51572500'
    }

    showRegisterStatement(){
        this.props.registerStatementActions.change({show:true})
    }

    render(){
        let {head_log,nike_name,name,phone,account,ID} = this.props.userinfo
        let customer = this.customer
        return(
            <div className="usercenter-page">
                <section className="head">
                    <img src={head_log} alt=""/>
                    <p>{nike_name}</p>
                </section>
                <section>
                    <InfoBox data={{
                        inputName:'name',
                        word:'姓名',
                        content:name,
                        placeholder:'请输入您新的姓名',
                        canChange:true
                    }}/>
                    <InfoBox data={{
                        inputName:'phone',
                        word:'手机',
                        content:phone,
                        placeholder:'请输入您新的手机',
                        canChange:false
                    }}/>
                </section>
                <section>
                    <InfoBox data={{
                        inputName:'name',
                        word:'身份证号',
                        content:ID,
                        placeholder:'请输入您新的身份证',
                        canChange:true
                    }}/>
                    <InfoBox data={{
                        inputName:'name',
                        word:'用户账户',
                        content:account,
                        placeholder:'请输入您新的账户',
                        canChange:true
                    }}/>
                </section>
                <section>
                    <div className="link-box">
                        我的订阅
                        <Link to="/mysubscirbe/1">
                            <span className="btn fa fa-angle-right" />
                        </Link>
                    </div>
                    <div className="link-box">
                        注册申明
                        <span
                            className="btn fa fa-angle-right"
                            onClick={this.showRegisterStatement.bind(this)}
                        />
                    </div>
                    <div className="link-box">
                        协<span className="hidden">空空</span>议
                        <Link to="/protocol">
                            <span className="btn fa fa-angle-right" />
                        </Link>
                    </div>
                    <div className="link-box">
                        联系我们<span className="single-word">：</span>
                        {customer}
                        <a href={"tel:"+customer}>
                            <span className="btn fa fa-angle-right" />
                        </a>
                    </div>
                </section>
                <Footer footerIndex={2}/>
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerStatementActions:bindActionCreators(registerStatementActionsFromOtherFile, dispatch),
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCenterPage)