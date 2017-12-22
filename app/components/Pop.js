import React from 'react'
import './Pop.less'
import {public_resource} from "../constants/urls";


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
        let pop_img = `${public_resource}/christmas/pop.png`
        return (
            this.state.show ?
                (<div className="pop-box">
                    <div className="pop-bg" onClick={this.popClose}>
                        <div className="pop">
{/*                            <div className="pop-close" onClick={this.popClose}>

                            </div>*/}
                            <img className="pop-img" src={pop_img} alt=""/>
                            {/*<a className="pop-link" href="http://www.jyzqsh.com/xgnr/20171111/" />*/}
                        </div>
                    </div>
                </div>) :
                (<div className="none"/>)
        )
    }
}

export default Pop