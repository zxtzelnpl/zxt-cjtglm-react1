import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'

import './Banner.less'

import banner1 from '../static/img/banner/banner1.jpg'
import banner2 from '../static/img/banner/banner2.jpg'
import banner3 from '../static/img/banner/banner3.jpg'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            index: 0
        }
    }

    render() {
        return (
            <ReactSwipe
                className="carousel"
                swipeOptions={
                    {
                        speed: 400,
                        auto: 1000,
                        continuous: true,
                    }
                }
            >
                <div>
                    <img src={banner1} alt=""/>
                </div>
                <div>
                    <img src={banner2} alt=""/>
                </div>
                <div>
                    <img src={banner3} alt=""/>
                </div>
            </ReactSwipe>
        );
    }
}

export default Banner
