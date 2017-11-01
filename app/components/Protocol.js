import './Protocol.less'

import xy2 from '../static/img/protocol/xy02.png'
import xy3 from '../static/img/protocol/xy03.png'
import xy4 from '../static/img/protocol/xy04.png'
import xy7 from '../static/img/protocol/xy07.png'

import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Protocol extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.score=[1,1,1,1,1,1,1,1,1,1]
    }

    handleChange(key,value){
        this.score[key]=value
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

    subScore(){
        let openid = this.props.openid;
        let score = this.score.join('a')
        let url = `/ashx/Add_users.ashx?type=2&openid=${openid}&score=${score}`
        fetch(url)
            .then((res)=>{
                return res.json()
            })
            .then((json)=>{
                if(json[0].erro === '1'){
                    this.props.userInfomentActions.change_score(score)
                }
                else{
                    alert('数据连接错误，请稍后重试')
                }
            })

    }

    render(){
        let questions_html
        let questions = this.props.questions
        questions_html = questions.map((question,question_index)=>{
            let choice_html = question.choices.map((choice,choice_index)=>{
                let value = choice_index+1
                if(value===1){
                    return (
                        <label key={choice_index}>
                            <input
                                type="radio"
                                name={question.key}
                                value={value}
                                onChange={this.handleChange.bind(this,question_index,value)}
                                checked="checked"
                            />
                            {choice}
                        </label>
                    )
                }
                else{
                    return (
                        <label key={choice_index}>
                            <input
                                type="radio"
                                name={question.key}
                                value={value}
                                onChange={this.handleChange.bind(this,question_index,value)}
                            />
                            {choice}
                        </label>
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
                    <p onClick={this.subScore.bind(this)}>提交</p>
                </section>
            </div>
        )
    }
}

export default Protocol