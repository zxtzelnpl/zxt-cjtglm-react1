import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './ScrollText.less'

class ScrollText extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        let datas = this.props.list
        let linkData = datas[0]
        let textsHtml = datas.map((data)=>{
            let {stockName,time,word,rise} = data.stock
            return (
                <span key={data.name}>{time.slice(5)}《选股牛人-<b>{data.name}</b>》推出<b>{stockName}</b>{word}<b>{rise}</b></span>
            )
        })
        let textLinkHtml = (<span key="last">{linkData.stock.time.slice(5)}《选股牛人-<b>{linkData.name}</b>》推出<b>{linkData.stock.name}</b>{linkData.stock.word}<b>{linkData.stock.rise}</b></span>)

        return (
            <div className="scroll-text">
                <div className="wrap">
                    {textsHtml}
                    {textLinkHtml}
                </div>
            </div>
        )
    }
}

export default ScrollText