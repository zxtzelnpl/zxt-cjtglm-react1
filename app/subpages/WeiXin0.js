import './WeiXin0.less'
import React from 'react'
import Footer from '../components/Footer'

class WeiXin0 extends React.Component {
  constructor(props, content) {
    super(props, content)
    this.state = {
      initDom: false,
      time: null,
      stocks: null
    }
  }

  render() {
    let stocks = this.state.stocks;
    let htmlStocks;
    if (stocks != null) {
      htmlStocks = stocks.map((stock, index) => {
        return (
            <div className="box" key={index}>
              <div className="up">
                <span>{stock[0]}</span><span>{stock[1]}</span>
              </div>
              <div className="down">
                <span className="label">看好理由：</span>
                <span className="text">{stock[2]}</span>
              </div>
            </div>
        )
      })
    }
    else {
      htmlStocks = (
          <div className="box">
            <div className="up">
              <span>******</span><span>******</span>
            </div>
            <div className="down">
              <span className="label">加载中：</span>
              <span className="text">******</span>
            </div>
          </div>
      )
    }
    return (
        <div className="wei-xin-0">
          <div className="wrap">
            <div className="title">
              <div className="wrap">
                <div className="left">
                  选股策略
                </div>
                <div className="right">
                  {this.state.initDom ? this.state.time : '**** ** ** ** ** **'}
                </div>
              </div>
              <div className="leftD"/>
              <div className="rightD"/>
            </div>
            <div className="board">
              {htmlStocks}
            </div>
          </div>
          <Footer footerIndex={0}/>
        </div>
    )
  }

  componentDidMount() {
    let userInfoPromise = this.getUserInfo()

    let checkBuyPromise = userInfoPromise
        .then(userInfo => {
          return this.checkBuy(userInfo)
        })

    let articlePromise = this.getArticle()

    Promise
        .all([checkBuyPromise, articlePromise])
        .then(([checkBuy, article]) => {
          let stocks = null
          let _stocks = article[0].strategy.split('---')
          let time = article[0].create_time.replace(/\//ig, '\-')
          if (_stocks.length > 0) {
            stocks = _stocks.map((stock) => {
              let arr = stock.split(/[*]|[+]|zjw/gi)
              return arr
            })
          }
          this.setState({
            initDom: true,
            time: time,
            stocks: stocks
          })
        })
        .catch(err=>{
          if(err.msg){
            alert(err.msg)
          }
          else{
            alert('数据连接错误')
          }
        })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState)
    return nextState.initDom
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (typeof this.props.userinfo.id !== 'undefined') {
        resolve(this.props.userinfo)
      }
      else if (localStorage.getItem('userinfo')) {
        resolve(JSON.parse(localStorage.getItem('userinfo')))
      }
      else {
        let openid = this.props.wxinfo.openid;
        let url = `/ashx/users_id.ashx?openid=${openid}`
        fetch(url)
            .then((res) => {
              return res.json()
            })
            .then((json) => {
              if (json.length > 0 && json[0].id) {
                this.props.userInfoActions.load(json[0])
                resolve(json[0])
              }
              else {
                reject({
                  msg: '亲，还未注册哦，注册后需购买后方可查看'
                })
              }
            })
            .catch(() => {
              reject({
                msg: '数据出现故障,请稍后再试'
              })
            })
      }
    })
  }

  checkBuy(userInfo) {
    return new Promise((resolve, reject) => {
      let user_id = userInfo.id;
      let article_id = this.props.match.params.id
      let url = `/ashx/Article_user_Juris.ashx?user_id=${user_id}&article_id=${article_id}`
      fetch(url)
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            if (json.error === '1') {
              reject({
                reason: 'notBuy',
                msg: '你未购买次产品，需购买后方可查看'
              })
            }
            else if (json.error === '0') {
              resolve(json)
            }
            else {
              reject({
                msg: '数据连接错误请稍后重试'
              })
            }
          })
    })
  }

  getArticle() {
    let article_id = this.props.match.params.id
    let url = `/ashx/Article_Selce.ashx?article_id=${article_id}`
    return fetch(url)
        .then((res) => {
          return res.json()
        })
  }
}

export default WeiXin0
