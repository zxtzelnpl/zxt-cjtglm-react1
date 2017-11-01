import './ArticleList.less'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'
import moment from 'moment'

class ArticleList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let list_html=this.props.articlelist.map((article)=>{
            return (
                <Link className="box" key={article.id} to={"/article/"+article.id}>
                    <p className="description">{article.description}</p>
                    <span className="createTime">{moment(article.create_time).format('YYYY-MM-DD hh:mm')}</span>
                </Link>
            )
        })
        return (
            <div className="article-list">
                {list_html}
            </div>
        )

    }
}

export default ArticleList