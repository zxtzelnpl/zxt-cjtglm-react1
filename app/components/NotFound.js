import './NotFound.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import React from 'react'
import Footer from '../components/Footer'

class NotFound extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        let reason = this.props.match.params.reason;
        return(
            <div className="not-found">
                <div>{reason}</div>
                <Footer />
            </div>
        )
    }
}

export default NotFound