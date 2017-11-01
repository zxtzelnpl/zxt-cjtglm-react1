import './ArticleDetailPage.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import React from 'react'
import { bindActionCreators } from 'redux'
import * as articleListmentActionsFromOtherFile from '../actions/articlelist'
import { connect } from 'react-redux'

import Footer from '../components/Footer'

class ArticleDetailPage extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state={}
    }

    componentDidMount(){
        if(!this.props.articlelist.get(this.props.match.params.id)&&!this.state.fail){
            let url = '/ashx/Article_id.ashx?id='+this.props.match.params.id
            fetch(url,{
                method:'get'
            })
                .then((response)=>{
                    return response.json()
                })
                .then((json)=>{
                    if(json.fail){
                        return Promise.reject(json)
                    }
                    else{
                        this.props.articleListmentActions.add(json[0])
                    }
                })
                .catch((err)=>{
                    console.log('****err****')
                    console.log(err)
                    let createTime = new Date().toLocaleString()
                    let article_data = {
                        fail:err.fail,
                        description:err.reason,
                        createTime :createTime
                    }
                    this.setState({article_data:article_data})
                    console.log('****err****')
                })
        }
    }

    render(){
        let article_data
        if(this.props.articlelist.get(this.props.match.params.id)){
            article_data = this.props.articlelist.get(this.props.match.params.id)
        }
        else if(this.state.article_data){
            article_data = this.state.article_data
        }

        if(article_data){
            return (
                <div className="article-detial-page">
                    <h4 className="title">{article_data.description}</h4>
                    <span className="sub">{article_data.create_time}</span>
                    <div dangerouslySetInnerHTML={{__html:article_data.content}} className="content" />
                    <Footer footerIndex={0}/>
                </div>
            )
        }
        else{
            return(
                <div className="none" />
            )
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        articlelist:state.articlelist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleListmentActions:bindActionCreators(articleListmentActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetailPage)