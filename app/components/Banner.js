import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import {public_resource} from "../constants/urls";
import './Banner.less'

import banner1 from '../static/img/banner/banner1.jpg'
import banner2 from '../static/img/banner/banner2.jpg'

let banner6 = `${public_resource}/51huodong/banner.jpg`

class Banner extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      index: 0
    }
  }

  render () {
    return (
        <ReactSwipe
            className="carousel"
            swipeOptions={
              {
                startSlide:2,
                speed: 400,
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
            <a href="http://new.cjtglm.com/51huodong/src/index.html">
              <img src={banner6} />
            </a>
          </div>
        </ReactSwipe>
    );
  }
}

export default Banner
