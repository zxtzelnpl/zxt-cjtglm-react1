import './ArticleDetailPage.less'

import React from 'react'
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as articleListmentActionsFromOtherFile} from '../../page_article'
import Footer from '../../component_footer'


/**
 * ********** React Component **********
 */
class ArticleDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {}
  }

  componentDidMount() {
    let id = this.props.match.params.id
    let openid = this.props.wxinfo.openid
    let article = this.props.articlelist.get(id)
    this.record(openid,id)

    if (!article && !this.state.fail) {
      let url = '/ashx/Article_id.ashx?id=' + this.props.match.params.id
      fetch(url, {
        method: 'get'
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (json.fail) {
            return Promise.reject(json)
          }
          else {
            this.props.articleListmentActions.add(json[0])
          }
        })
        .catch((err) => {
          console.log('****err****')
          console.log(err)
          let createTime = new Date().toLocaleString()
          let article_data = {
            fail: err.fail,
            description: err.reason,
            createTime: createTime
          }
          this.setState({article_data: article_data})
          console.log('****err****')
        })
    }
  }

  record(openid,id){
    fetch(`/ashx/Visit_Record.ashx?openid=${openid}&Article_id=${id}`)
      .then(res=>res.text())
      .then(text=>{
        console.log(text)
      })
      .catch(err=>{
        console.log('网络连接错误')
      })
  }

  render() {
    let article_data
    if (this.props.articlelist.get(this.props.match.params.id)) {
      article_data = this.props.articlelist.get(this.props.match.params.id)
    }
    else if (this.state.article_data) {
      article_data = this.state.article_data
    }

    if (article_data) {
      return (
        <div className="article-detial-page">
          <h4 className="title">{article_data.description}</h4>
          <span className="sub">{article_data.create_time}</span>
          <div dangerouslySetInnerHTML={{__html: article_data.content}} className="content"/>
          <Footer footerIndex={0}/>
        </div>
      )
    }
    else {
      return (
        <div className="none"/>
      )
    }
  }
}


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    wxinfo: state.wxinfo,
    articlelist: state.articlelist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    articleListmentActions: bindActionCreators(articleListmentActionsFromOtherFile, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetail)