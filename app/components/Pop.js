import React from 'react'
import './Pop.less'

class Pop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true
        }
        this.asyn = null
        this.popClose = this.popClose.bind(this)
    }

    componentDidMount() {

    }

    popClose() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            this.state.show ?
                (<div className="pop-box">
                    <div className="pop-bg">
                        <div className="pop">
                            <div className="pop-close fa fa-close" onClick={this.popClose}/>
                            <a href="">

                            </a>
                        </div>
                    </div>
                </div>) :
                (<div className="none"/>)
        )
    }
}

export default Pop