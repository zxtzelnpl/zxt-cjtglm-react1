import React from 'react'
import './Pop.less'
import pop from '../static/img/pop/pop.png'
import pop_close from '../static/img/pop/pop-close.png'

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
                            <div className="pop-close" onClick={this.popClose}>
                                <img src={pop_close}/>
                            </div>
                            <img className="pop-img" src={pop} alt=""/>
                            <a className="pop-link" href="http://www.jyzqsh.com/xgnr/20171111/" />
                        </div>
                    </div>
                </div>) :
                (<div className="none"/>)
        )
    }
}

export default Pop