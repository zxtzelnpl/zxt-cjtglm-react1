import React from 'react'

class InfoBox extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state={
            value:'',
        }
    }

    moveRight(){
        this.box.className = 'box moved'
    }

    moveLeft(){
        this.box.className = 'box'
    }

    handleClick(){
        let openid = this.props.data.openid;
        let name = this.props.data.inputName;
        let value = this.state.value
        let url = `/ashx/Add_users.ashx?type=2&openid=${openid}&${name}=${value}`;
        fetch(url)
            .then((res)=>{
                return res.json()
            })
            .then((json)=>{
                if(json[0].erro === '1'){
                    this.props.data.userInfoChange(this.state.value)
                    this.moveLeft()
                }
                else{
                    alert('数据连接错误，请稍后重试')
                }
            })

    }

    handleChange(){
        let value = this.input.value
        this.setState({value:value})
    }

    render(){
        let {content,placeholder,word,canChange,inputName} = this.props.data
        let word_arr = word.split('')
        let word_html;
        let button_right,button_left;
        if(word_arr.length===1){
            word_html=<span>{word.slice(0,1)}<span className="hidden">空空空</span></span>
        }
        else if(word_arr.length===2){
            word_html=<span>{word.slice(0,1)}<span className="hidden">空空</span>{word.slice(1)}</span>
        }
        else if(word_arr.length===3){
            word_html=<span>{word.slice(0,1)}<span className="hidden">空</span>{word.slice(1)}</span>
        }
        else if(word_arr.length===4){
            word_html=<span>{word.slice(0,1)}<span className="hidden"/>{word.slice(1)}</span>
        }
        if(canChange){
            button_right=<span className="btn fa fa-angle-right" onClick={this.moveRight.bind(this)}/>
            if(this.state.value!==''){
                button_left=<span className="btn" onClick={this.handleClick.bind(this)}>确定</span>
            }
            else{
                button_left=<span className="btn fa fa-angle-left" onClick={this.moveLeft.bind(this)}/>
            }

        }
        else{
            button_right=<span className="none"/>
            button_left=<span className="none"/>
        }
        return (
            <div className="info-box">
                <div className="box"  ref={(box)=>{this.box = box}}>
                    <p className="show">{word_html}<span className="single-word">:</span>{content}{button_right}</p>
                    <p className="input">
                        <input
                            type="text"
                            placeholder={placeholder}
                            ref={(input)=>{this.input = input}}
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />{button_left}
                    </p>
                </div>
            </div>
            )

    }
}

export default InfoBox