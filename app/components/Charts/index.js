import React from 'react'
import AverageRise from './AverageRise'
import MaxRise from './MaxRise'
import RiseNum from './RiseNum'
import RiseProbability from './RiseProbability'

class Charts extends React.Component{
    constructor(props,context){
        super(props,context)
    }

    render(){
        let records = this.props.records
        let record_html = records.map((record)=>{
            let text = record.title.slice(2)
            switch(text){
                case '平均涨幅':
                    return <AverageRise key={AverageRise} record = {record}/>
                case '最大涨幅':
                    return <MaxRise key={MaxRise} record = {record}/>
                case '上涨个数':
                    return <RiseNum key={RiseNum} record = {record}/>
                case '上涨概率':
                    return <RiseProbability key={RiseProbability} record = {record}/>
                default:
                    return <div/>
            }
        })

        return (
            <div>
                {record_html}
            </div>
        )
    }
}

export default Charts