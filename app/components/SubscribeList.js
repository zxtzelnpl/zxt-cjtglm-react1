import './SubscribeList.less'

import React from 'react'

import {Link} from 'react-router-dom'

const ignoreProducts=['10000000','10000003','10000006']
// "涨停早知道"  "选股牛人"  "君银内参周报"

class SubscribeList extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let list = this.props.subscribelist.filter(item=>{
            return (ignoreProducts.indexOf(item.produce_id)<0)
        });
        let htmlArr = list.map((subscribe) => {
            let {head_log,name,overplus_produces,produce_id,style} = subscribe
            return (
                <Link key={produce_id} className="box" to={"/mysubscribearticle/"+produce_id+'a'+this.props.user_id}>
                    <div className="wrap">
                        <div className="photo">
                            <img src={head_log}/>
                        </div>
                        <div className="details">
                            <p className="name">
                                  <span>
                                      {name}
                                      <span className="rest">
                                        ( 剩余{overplus_produces}期 )
                                      </span>
                                  </span>
                                <span className="check">查看详情</span>
                            </p>
                            <p className="style">
                                <span>操作风格</span>
                                <span>
                                      {style}
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
            )
        })
        return (
            <div className="subscribe-list">
                {htmlArr}
            </div>
        )
    }
}

export default SubscribeList