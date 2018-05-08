import './SubscribeArticleList.less'
import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

class SubscribeList extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let list = this.props.list,htmlArr;
        if(list.length>0){
          list.sort((a,b)=>{return parseInt(b.analysts_article_id) - parseInt(a.analysts_article_id)})
          htmlArr = list.map((subscribe) => {
            return (
                <Link  className="box" to={"/weixin0/"+subscribe.analysts_article_id} key={subscribe.id}>
                    <h4>{subscribe.title}</h4><span>{moment(subscribe.create_time).format('YYYY-MM-DD HH:mm')}</span>
                </Link>
            )
          })
        }
        else{
          htmlArr = (
              <div className="no-datas">该老师还未发布策略更新，请耐心等待</div>
          )
        }

        return (
            <div className="subscribe-article-list">
                {htmlArr}
            </div>
        )
    }
}

export default SubscribeList