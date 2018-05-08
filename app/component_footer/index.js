import './Footer.less'
import article_list from '../static/img/footer/article-list.png'
import article_list_active from '../static/img/footer/article-list-active.png'
import product_list from '../static/img/footer/product-list.png'
import product_list_active from '../static/img/footer/product-list-active.png'
import user_center from '../static/img/footer/user-center.png'
import user_center_active from '../static/img/footer/user-center-active.png'

import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'

class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let num = this.props.footerIndex
        return (
            <footer>
                <Link className="box" to="/articlelist">
                    <div>
                        <img src={num===0?article_list_active:article_list} alt="超级内参"/>
                        <p className={num===0?"active":""}>超级内参</p>
                    </div>
                </Link>
                <Link className="box" to="/product">
                    <div>
                        <img src={num===1?product_list_active:product_list} alt="选股牛人"/>
                        <p className={num===1?"active":""}>选股牛人</p>
                    </div>
                </Link>
                <Link className="box" to="/center">
                    <div>
                        <img src={num===2?user_center_active:user_center} alt="个人中心"/>
                        <p className={num===2?"active":""}>个人中心</p>
                    </div>
                </Link>
            </footer>
        );
    }
}

export default Footer