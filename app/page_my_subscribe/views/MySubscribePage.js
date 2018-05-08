import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as subscribeListActionsFromOtherFile from '../actions';
import {actions as productListActionsFromOtherFile} from '../../page_product';
import SubscribeList from './SubscribeList';
import Footer from '../../component_footer';



/**
 * ********** React Component **********
 */
class MySubscribePage extends React.Component {
  constructor(props, content) {
    super(props, content)
  }

  render() {
    let {data,updateAt} = this.props.subscriblelist;
    let returnHtml
    if(!updateAt){
      returnHtml = (
        <div className="loading">数据加载中，请稍等</div>
      )
    }
    else{
      if(Array.isArray(data)){
        returnHtml = (
          <SubscribeList
            user_id={this.props.match.params.id}
            subscribelist={data}
          />
        )
      }
      else{
        returnHtml = <div className="error">数据出现错误</div>
      }
    }
    return (
      <div className="subscribe-list-page">
        <div className="content">
          {returnHtml}
        </div>
        <Footer footerIndex={2}/>
      </div>
    )
  }

  componentDidMount() {
    let user_id = this.props.match.params.id
    let url = `/ashx/user_subscribe.ashx?user_id=${user_id}`
    if(typeof this.props.subscriblelist.updateAt === 'undefined'){
      fetch(url, {
        method: 'get'
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.props.subscribeListActions.get(json)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
}



/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
    return {
        subscriblelist: state.subscriblelist,
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        subscribeListActions: bindActionCreators(subscribeListActionsFromOtherFile, dispatch),
        productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscribePage)