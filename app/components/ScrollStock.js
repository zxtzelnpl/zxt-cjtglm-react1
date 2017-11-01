import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import './ScrollStock.less'


class ScrollStock extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.swipers = [];

        this.index=0;

    }

    render() {
        let me=this;
        let stocks = this.props.stocks;
        this.len = this.props.stocks.length;
        this.prev = this.index-1>0?this.index-1:this.index-1+this.len;
        this.next = this.index+1<this.len?this.index+1:this.index+1-this.len;
        let htmlList,htmlSwipe;
        if(stocks.length>0){
            htmlList= stocks.map((stock, index) => {
                let className="swiper-slide"
                if(index===this.index){
                    className="swiper-slide swiper-curr"
                }
                else if(index === this.prev){
                    className="swiper-slide swiper-prev"
                }
                else if(index === this.next){
                    className="swiper-slide swiper-next"
                }
                return (
                    <div className={className} key={stock.code}  ref={(swiper) => {
                        this.swipers[index] = swiper
                    }}>
                        <div className="box">
                            <img src={stock.img} alt=""/>
                            <div>
                                <p><span>推出标的：</span><span className="em name">{stock.name}</span></p>
                                <p><span>推出日期：</span><span className="daySend">{stock.daySend}</span></p>
                                <p><span>交易日个数：</span><span className="day">{stock.day}</span></p>
                                <p><span>涨幅情况：</span><span className="em result">{stock.result}</span></p>
                            </div>
                        </div>
                    </div>
                )
            });
            htmlSwipe = (
                <div className="scroll-stock">
                    <ReactSwipe
                        className=""
                        swipeOptions={
                            {
                                speed: 400,
                                auto: 1000,
                                continuous: true,
                                transitionEnd:function(index){
                                    let curr = index,
                                        prev = index-1>0?index-1:index-1+me.len,
                                        next = index+1<me.len?index+1:index+1-me.len
                                    me.swipers.forEach((swiper,index)=>{
                                        let className="swiper-slide"
                                        if(index===curr){
                                            className="swiper-slide swiper-curr"
                                        }
                                        else if(index === prev){
                                            className="swiper-slide swiper-prev"
                                        }
                                        else if(index === next){
                                            className="swiper-slide swiper-next"
                                        }
                                        swiper.className=className
                                    })
                                }
                            }
                        }
                        style={
                            {
                                container: {
                                    visibility: 'hidden',
                                    position: 'relative',
                                    width: '5.6rem',
                                    height: '100%',
                                    margin: '0 .4rem'
                                },
                                wrapper: {
                                    position: 'relative',
                                    display: 'flex',
                                    height: '100%'
                                },
                                child: {
                                    width:'5.6rem',
                                    position: 'relative',
                                    transitionProperty: 'transform',
                                }

                            }
                        }
                    >
                        {htmlList}
                    </ReactSwipe>
                </div>
            )
        }
        else{
            htmlSwipe=<div className="none"></div>
        }


        return htmlSwipe
    }


}

export default ScrollStock

