import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './TeacherDetail.less'

import img1 from '../static/img/teacher/img1.jpg'
import img2 from '../static/img/teacher/img2.jpg'
import img3 from '../static/img/teacher/img3.jpg'
import img_result from '../static/img/teacher/img-result.jpg'



class TeacherDetail extends React.Component{
    constructor(props,content){
        super(props,content)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount(){

    }

    render(){
        let img1_html = img1?<div className="down-img"><img src={img1} /></div>:'';
        let img2_html = img2?<div className="down-img"><img src={img2} /></div>:'';
        let img3_html = img3?<div className="down-img"><img src={img3} /></div>:'';
        let img_result_html = img_result?<div className="down-img"><img src={img_result} /></div>:'';

        return (
            <div className="teacher-detial">
                {img1_html}
                {img2_html}
                {img_result_html}
                {img3_html}
            </div>
        )
    }
}

export default TeacherDetail