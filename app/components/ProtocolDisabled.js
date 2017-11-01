import './Protocol.less'

import xy2 from '../static/img/protocol/xy02.png'
import xy3 from '../static/img/protocol/xy03.png'
import xy4 from '../static/img/protocol/xy04.png'
import xy7 from '../static/img/protocol/xy07.png'

import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class ProtocolDisabled extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
    }

    handleClick(tab){
        if(tab==='a'){
            this.wrap.scrollTop = 0
        }
        if(tab==='b'){
            this.wrap.scrollTop = this.a.getBoundingClientRect().height
        }
        if(tab==='c'){
            this.wrap.scrollTop = this.a.getBoundingClientRect().height + this.b.getBoundingClientRect().height
        }
    }

    render(){
        let questions_html
        let questions = this.props.questions
        let score = this.props.score.split('a')
        let sum = 0
        let type
        score.forEach((_score)=>{
            sum+=parseInt(_score)
        })
        if(sum<=12){
            type = '保守型'
        }
        else if(sum<=17){
            type = '谨慎型'
        }
        else if(sum<=23){
            type = '稳健型'
        }
        else if(sum<=28){
            type = '积极型'
        }
        else{
            type = '激进型'
        }

        questions_html = questions.map((question,question_index)=>{
            let choice_html = question.choices.map((choice,choice_index)=>{
                let user_choice = parseInt(score[question_index])
                let value = choice_index+1
                if(user_choice===value){
                    return (
                        <label key={choice_index}><input type="radio" name={question.key} value={value} checked="checked" disabled="disabled" />{choice}</label>
                    )
                }
                else{
                    return (
                        <label key={choice_index}><input type="radio" name={question.key} value={value} disabled="disabled" />{choice}</label>
                    )
                }
            })
            return (
                <div className="question" key={question.key}>
                    <p>{question.ask}</p>
                    {choice_html}
                </div>
            )
        })

        return (
            <div className="protocol-page">
                <section className="header">
                    <p className="title">君银牛人堂</p>
                    <p className="attation"><span className="red">*</span>微信公众号一经绑定成功，以下电子协议即为生效，其协议内容与纸质协议具有同等法律效应</p>
                    <p className="links">
                        <a onClick={this.handleClick.bind(this,'a')}><span className="num">1</span><span className="text">投顾用户电子服务协议</span></a>
                        <a onClick={this.handleClick.bind(this,'b')}><span className="num">2</span><span className="text">投资顾问业务风险揭示书</span></a>
                        <a onClick={this.handleClick.bind(this,'c')}><span className="num">3</span><span className="text">适当性调查表</span></a>
                    </p>
                </section>
                <section className="content">
                    <div className="content-wrap" ref={(div)=>{this.wrap=div}}>
                        <div className="xy" ref={(div)=>{this.a=div}}><img src={xy2} alt=""/></div>
                        <div className="xy" ref={(div)=>{this.b=div}}><img src={xy3} alt=""/></div>
                        <div className="xy" ref={(div)=>{this.c=div}}><img src={xy4} alt=""/></div>
                        <div className="question-box">
                            <div className="question-title">
                                <p>风险测评</p>
                            </div>
                            {questions_html}

                        </div>
                        <div className="xy"><img src={xy7} alt=""/></div>
                    </div>
                </section>
                <section className="footer">
                    <p>您的投资类型为{type}</p>
                </section>
            </div>
        )
    }
}

export default ProtocolDisabled