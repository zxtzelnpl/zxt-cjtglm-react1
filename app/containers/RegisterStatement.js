import './RegisterStatement.less'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as registerStatementActionsFromOtherFile from '../actions/registerstatement'


class RegisterStatement extends React.Component {
    constructor(props,context){
        super(props,context)
    }

    handleClick(){
        this.props.registerStatementActions.change({show:false})
    }

    render(){
        let show = this.props.registerstatement.show
        let html_state;
        if(show){
            html_state=
            <div
                className="register-state"
                ref={(div)=>{this.div=div}}
                onClick={this.handleClick.bind(this)}
            >
                <div className="content">
                    <div>
                        <p className="title">微信注册声明</p>
                        <p className="text">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为答谢广大投资者对君银投顾的长期支持，以及达到投资者教育的目的，特开通注册通道方便投资者享用相应的投资咨询服务，秉着公平、公正、公开、真实的原则，君银投顾此注册用户不发生任何收益，所提供的证券投资咨询服务完全免费，如发生下情形，我司声明以下免责条款：
                        </p>
                        <p className="title_sub">免责事项</p>
                        <p className="text">
                            1、注册期间发生任何不可抗力事件使注册后应享有证券投资咨询服务不能实现，因此免责。不可抗力是指不能控制、不可预见或不能避免，即使预见亦无法避免的事件，该事件使任何一方根据本协议履行其全部或部分义务已不可能。包括社会异常事件、自然灾害或政府管制行为而造成的网络关闭等非基于君银投顾过错的行为。
                        </p>
                        <p className="text">
                            2、鉴于互联网之特殊性质，注册期间若发生黑客攻击、电信部门技术调整导致重大影响、病毒侵袭、网络故障、带宽、域名解析故障或其他网络设备或技术提供商的服务延迟、服务障碍或任何其他类似事件，致使证券投资咨询服务信息出现错误、延迟或中断等情况无法正常进行，君银投顾因此免责。
                        </p>
                        <p className="text">
                            3、用户自身主观过错或恶意，如不按正常流程操作、填写信息不真实、不完整等类似情形致使注册无效、无法核验用户真实信息而不能得到相关证券投资咨询服务的，君银投顾因此免责。
                        </p>
                        <p className="text">
                            4、任何由于网络问题、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常运行的不可抗力而造成的非正常证券投资咨询服务无效，君银投顾免责。
                        </p>
                        <p className="text">
                            5、任何人或任何网站打着君银投顾名义从事此类似活动或恶意通知用户领奖或提供证券投资咨询服务，造成用户损失的，由用户自己承担，与君银投顾无关。
                        </p>
                        <p className="text">
                            6、由于第三方网站通过技术手段恶意攻击或篡改致使发生错误，君银投顾不负任何法律或经济责任，信息数据以君银投顾为准。
                        </p>
                        <p className="text">
                            7、君银投顾对注册用户所提供的相关证券投资咨询服务内容的准确性、完整性、及时性或用途的适用性不作担保。提供的所有资讯、数据，不构成任何投资建议，用户查看或依据这些内容进行的任何行为造成的任何风险和损失需用户自行承担责任。
                        </p>
                        <p className="text">
                            8、君银投顾注册用户及其各自享有的权益决定具有最终约束力。
                        </p>
                        <p className="text">
                            9、注册用户接受注册即表示同意相关权益，君银投顾只负责根据客户自行的选择提供相应的证券投资咨询服务。君银投顾对所提供的证券投资咨询服务的内容不做任何明示或暗示的担保，因此也就不承担任何责任。
                        </p>
                        <p className="text">
                            10、君银投顾只根据注册用户账户名称、手机号、密码为唯一认证依据，如出现冒用等情况，君银投顾不承担任何责任。
                        </p>

                        <p className="title_sub">关于用户隐私和利益保护</p>
                        <p className="text">
                            1、君银投顾因活动要求提供的个人资料，如：您的姓名、性别、年龄、出生日期、身份证号等，在未经您同意的情况下，君银投顾不会将您的任何资料以任何方式泄露给任何一方。
                        </p>
                        <p className="text">
                            2、当政府司法机关依照法定程序要求君银投顾披露个人资料时，我们将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下之任何披露，君银投顾均得免责。
                        </p>
                        <p className="text">
                            3、由于用户将个人资料、密码告知他人或与他人共享注册账户，由此导致的任何个人资料泄露，君银投顾不负任何责任。
                        </p>
                        <p className="text">
                            4、任何由于网络问题、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常运行的不可抗力而造成的个人资料泄露、丢失、被盗用或被篡改等，君银投顾均得免责。
                        </p>
                        <p className="text">
                            5、由于与君银投顾链接的其它网站采用非正常的技术手段所造成之个人资料泄露及由此而导致的任何法律争议和后果，君银投顾均得免责。
                        </p>

                        <p className="title_sub">相关法律责任</p>
                        <p className="text">
                            1、君银投顾作为建立在中华人民共和国境内的合法证券公司，拥护和遵守中华人民共和国一切法规和制度。
                        </p>
                        <p className="text">
                            2、君银投顾注册用户因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，君银投顾不承担任何责任。
                        </p>
                        <p className="text">
                            3、凡以任何方式直接、间接参与注册的用户，视为自愿接受本免责声明的约束。
                        </p>
                        <p className="text">
                            4、本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。
                        </p>
                        <p className="text">
                            5、君银投顾完全遵守国家法律法规，此注册目的是为了更好的合理维护广大投资者权益，答谢对君银投顾的厚爱与支持，不存在任何销售或营利行为，由于他人原因违反国家法律法规，与君银投顾无关。
                        </p>

                        <p className="title_sub">关于解释权</p>
                        <p className="text">
                            本免责声明以及其修改权、更新权及最终解释权均属君银投顾。
                        </p>

                        <a href="javascript:void(0)" className="btn-close">关 闭</a>
                    </div>
                </div>

            </div>
        }
        else{
            html_state = <div className="none"/>
        }
        return (html_state)
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        registerstatement:state.registerstatement
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerStatementActions:bindActionCreators(registerStatementActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterStatement)