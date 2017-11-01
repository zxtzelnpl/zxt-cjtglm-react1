import './SubscribeArticleList.less'

import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Link} from 'react-router-dom'

class SubscribeList extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let list = this.props.list;
        list.sort((a,b)=>{return parseInt(b.analysts_article_id) - parseInt(a.analysts_article_id)})
        let htmlArr = list.map((subscribe) => {
            return (
                <Link  className="box" to={"/weixin0/"+subscribe.analysts_article_id} key={subscribe.id}>
                    <h4>选股牛人-{this.props.product_name}</h4><span>{subscribe.create_time.replace(/\//ig,'\-')}</span>
                </Link>
            )
        })
        return (
            <div className="subscribe-article-list">
                {htmlArr}
            </div>
        )
    }
}

export default SubscribeList