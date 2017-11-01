import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'

import './ProductList.less'

class Product extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
    }

    render() {
        let {id, name, special, records, pic, lables} = this.props.data
        return (
            <li>
                <Link to={"/teacher/" + id} className="box">
                    <div className="up">
                        <div className="user">
                            <div className="photo">
                                <img src={pic} alt={name} />
                            </div>
                            <div className="info">
                                <p className="name">{name}</p>
                                <p className="label"><span>{lables[2]}</span><span>{lables[1]}</span></p>
                            </div>
                        </div>
                        <div className="link">
                            立即订阅
                        </div>
                    </div>
                    <div className="down">
                        <div className="record">
                            <p>{records[0].title}</p>
                            <p>{records[0].result}</p>
                        </div>
                        <div className="line">

                        </div>
                        <div className="record">
                            <p>{records[1].title}</p>
                            <p>{records[1].result}</p>
                        </div>
                    </div>
                </Link>
            </li>

        )
    }

}


class ProductList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        if (this.props.list.length > 0) {
            let productHtml = this.props.list.map(data => (
                <Product key={data.id} data={data}/>
            ))
            return (

                <div className="product-normal">
                    <div className="title">
                    <span className="word">
                        选股牛人
                    </span>
                        <span className="fa fa-chevron-right"/>
                    </div>
                    <div className="list">
                        <ul>
                            {productHtml}
                        </ul>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="none"/>
            )
        }


    }
}

export default ProductList