import './ArticleList.less'
import article_banner from '../static/img/banner/article.jpg'
import React from 'react'
import ArticleListBox from '../components/ArticleListBox'
import Footer from '../components/Footer'

class ArticleList extends  React.Component{
  constructor(props,content){
    super(props,content)
    this.url = '/ashx/Articlelist.ashx'
  }

  componentDidMount(){
    console.log(this.props)
    if(this.props.articlelist.size<5){
      let url = this.url+'?page=0'
      fetch(url,{
        method:'get'
      })
          .then((response)=>{
            return response.json()
          })
          .then((json)=>{
            this.props.articleListmentActions.first(json)
          })
          .catch((err)=>{
            console.log('****err****')
            console.log(err)
            console.log('****err****')
          })
    }
  }

  load(){
    let url = this.url+'?page='+(this.props.articlelist.size-1)
    fetch(url,{
      method:'get'
    })
        .then((response)=>{
          return response.json()
        })
        .then((json)=>{
          this.props.articleListmentActions.load(json)
        })
        .catch((err)=>{
          console.log('****err****')
          console.log(err)
          console.log('****err****')
        })
  }

  render(){
    if(this.props.articlelist.size<5){
      return (
          <div className="none" />
      )
    }
    else{
      let list = [];
      this.props.articlelist.forEach((article)=>{
        if(article.id!=='img'){
          list.push(article)
        }
      })
      return (
          <div className="article-list-page">
            <div className="header">
              <img src={article_banner}/>
            </div>
            <div className="content">
              <ArticleListBox articlelist={list}/>
              <span className="more" onClick={this.load.bind(this)}>点击加载更多</span>
            </div>
            <Footer footerIndex={0}/>
          </div>
      )

    }
  }
}

export default ArticleList