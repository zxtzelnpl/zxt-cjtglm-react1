import './User.less'

import React from 'react'
import {Link} from 'react-router-dom'
import InfoBox from '../components/InfoBox'
import Footer from '../components/Footer'

class UserCenterPage extends React.Component{
    constructor(props,content){
        super(props,content)
    }

    render(){
        let {headimgurl,nick_name,openid} = this.props.wxinfo
        let {name,phone,account,ID_number,id} = this.props.userinfo
        let {change_name,change_id,change_account} = this.props.userInfoActions
        let customer = '021-51572550'
        return(
            <div className="usercenter-page">
                <section className="head">
                    <img src={headimgurl} alt=""/>
                    <p>{nick_name}</p>
                </section>
                <section>
                    <InfoBox data={{
                        inputName:'user_name',
                        word:'姓名',
                        content:name,
                        placeholder:'请输入您新的姓名',
                        canChange:true,
                        userInfoChange:change_name,
                        openid : openid
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
                        inputName:'number',
                        word:'身份证号',
                        content:ID_number,
                        placeholder:'请输入您新的身份证',
                        canChange:true,
                        userInfoChange:change_id,
                        openid :openid
                    }}/>
                </section>
                <section>
                    <div className="link-box">
                        我的订阅
                        <Link to={"/mysubscirbe/"+id}>
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

    componentDidMount(){
        let openid = this.props.wxinfo.openid
        this.getUserInfo(openid)
    }

    showRegisterStatement(){
        this.props.registerStatementActions.change({show:true})
    }

    getUserInfo(openid){
        if(this.props.userinfo.phone){

        }
        else{
            let url = `/ashx/users_id.ashx?openid=${openid}`
            fetch(url)
                .then((res)=>{return res.json()})
                .then((json)=>{
                    if(json.length>0){
                        this.props.userInfoActions.load(json[0])
                    }
                    else{

                    }
                })
        }
    }
}

export default UserCenterPage