import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {ChartMaxRise} from '../../static/js/tools'

import './Charts.less'

class MaxRise extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount(){
        this.showChart(this.main,this.props.record)
    }

    showChart(main,record){
        ChartMaxRise()(main,record)
    }

    render() {
        let record = this.props.record;
        let data = record.data1.concat(record.data2)
        let data3 = []
        record.data1.forEach((item,index)=>{
            let num = (parseInt(item)+parseInt(record.data2[index]))/2
            data3.push(num)
        })
        let date_len = record.date.length
        let data_len = data.length
        let data_max = Math.max.apply(undefined,data)
        let data_l_5=0,data_l_10=0,data_o_10=0;
        data.forEach((num)=>{
            let _num = parseInt(num)
            if(_num<5){
                data_l_5++
            }
            else if(_num<=10){
                data_l_10++
            }
            else if(_num>10){
                data_o_10++
            }
        })
        return (
            <div className="max-rise charts">
                <div className="main" ref={(main)=>{this.main=main}} />
                <div className="text">
                    <p>数据统计：</p>
                    <p>1、统计阶段: 最近<span>{date_len}</span>个交易日，共计<span>{data_len}</span>只标的；</p>
                    <p>2、统计结果：</p>
                    <p>（1）推出标的<span>{date_len}</span>个交易日最大涨幅低于5%的有 <span className="red" >{data_l_5}</span>只；</p>
                    <p>（2）推出标的<span>{date_len}</span>个交易日最大涨幅在5%-10%之间的有 <span className="red" >{data_l_10}</span>只;</p>
                    <p>（3）推出标的<span>{date_len}</span>个交易日最大涨幅超过10%的有 <span className="red" >{data_o_10}</span>只;</p>
                    <p>（4）单只标的<span>{date_len}</span>个交易日最高涨幅为 <span className="red" >{data_max}%</span>；</p>
                </div>
            </div>
        )
    }
}

export default MaxRise