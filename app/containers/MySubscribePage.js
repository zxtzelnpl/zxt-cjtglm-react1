import React from 'react'
import {bindActionCreators} from 'redux'
import * as subscribeListActionsFromOtherFile from '../actions/subscriblelist'
import * as productListActionsFromOtherFile from '../actions/productlist'
import {connect} from 'react-redux'

import SubscribeList from '../components/SubscribeList'
import Footer from '../components/Footer'

class MySubscribePage extends React.Component {
    constructor(props, content) {
        super(props, content)
    }

    render() {
        return (
            <div className="subscribe-list-page">
                <div className="content">
                    {
                        this.props.subscriblelist.length>0 ?
                            (<SubscribeList
                                user_id={this.props.match.params.id}
                                subscribelist={this.props.subscriblelist}
                            />  ) :
                            (<div className="none"/>)
                    }
                </div>
                <Footer footerIndex={2}/>
            </div>
        )
    }

    componentDidMount() {
        let user_id = this.props.match.params.id
        let url = `/ashx/user_subscribe.ashx?user_id=${user_id}`
        if(this.props.subscriblelist.length === 0){
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

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        subscriblelist: state.subscriblelist,
        userinfo: state.userinfo,
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