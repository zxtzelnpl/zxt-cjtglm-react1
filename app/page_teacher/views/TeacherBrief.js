import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './TeacherBrief.less'


class TeacherBrief extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            brief:'text close',
            arrow:'fa fa-chevron-up'
        }
    }

    handleClick(){
        if(this.state.brief === 'text close'){
            this.setState({
                brief:'text',
                arrow:'fa fa-chevron-down'
            })
        }
        else{
            this.setState({
                brief:'text close',
                arrow:'fa fa-chevron-up'
            })
        }

    }
    render(){
        let {pic,name,title,brief,special,lables} = this.props.teacher
        return (
            <div className="teacher-brief">
                <div className="people">
                    <div className="photo">
                        <img src={pic}/>
                    </div>
                    <div className="nicks">
                        <div className="up">
                            <span>{name}</span>
                            <span id="title">{lables[0]}</span>
                        </div>
                        <div className="down">
                            <span className="honor">{lables[2]}</span>
                            <span className="honorSub">{special}</span>
                        </div>
                    </div>
                </div>
                <div className="intro" onClick={this.handleClick.bind(this)}>
                    <div className="word">
                        简介：
                    </div>
                    <div
                        className={this.state.brief}
                        ref={(brief)=>{this.brief=brief}}
                    >{brief}</div>
                    <div className={this.state.arrow}/>
                </div>
            </div>
        )
    }
}

export default TeacherBrief