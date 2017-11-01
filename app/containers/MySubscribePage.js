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
        this.state = {
            initDom: false,
            subscribelist: []
        }
    }

    render() {
        return (
            <div className="subscribe-list-page">
                <div className="content">
                    {
                        this.state.initDom ?
                            (<SubscribeList
                                user_id={this.props.match.params.id}
                                subscribelist={this.state.subscribelist}
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
        fetch(url, {
            method: 'get'
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                this.setState ({
                    initDom: true,
                    subscribelist: json
                })
            })
            .catch((err)=>{
                alert('数据连接错误，请稍后重试')
            })
    }

    shouldComponentUpdate(nextProp,nextState){
        return nextState.initDom
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        subscribelist: state.subscribelist,
        userinfo: state.userinfo,
        productlist: state.productlist
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