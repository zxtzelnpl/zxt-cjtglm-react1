import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productListActionsFromOtherFile from '../actions/productlist'

import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import ProductListHot from '../components/ProductListHot'
import Footer from '../components/Footer'


class ProductPage extends  React.Component{
    constructor(props,content){
        super(props,content)
        this.url = '/ashx/productlist.ashx'
    }

    componentDidMount(){

        if(this.props.productlist.size===0){
            fetch(this.url,{
                method:'get'
            })
                .then((response)=>{
                    return response.json()
                })
                .then((json)=>{
                    this.props.productListActions.load(json)
                })
                // .catch((err)=>{
                //     console.log('****err****')
                //     console.log(err)
                //     console.log('****err****')
                // })
        }
    }

    render(){
        console.log(this.props.productlist)
        if(this.props.productlist.size>0){
            let normal = [];
            let hot = [];
            [...this.props.productlist.values()].forEach((item)=>{
                if(item.stocks.length>0){
                    hot.push(item)
                }
                else{
                    normal.push(item)
                }
            })
            return (
                <div className="product-page">
                    <Banner/>
                    <ProductListHot list={hot}/>
                    <ProductList list={normal}/>
                    <Footer footerIndex={1}/>
                </div>
            )
        }
        else{
            return(
                <div className="none"/>
            )
        }

    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        productlist:state.productlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productListActions:bindActionCreators(productListActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage)