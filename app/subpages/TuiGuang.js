import React from 'react'
import {Link} from 'react-router-dom'
import './TuiGuang.less'

function getTeacherProductId(name){
  switch (name){
    case '邵军杰':
    return 10000046
    case '马鑫':
      return 10000036
    case '周煜':
      return 10000032
    case '刘章右':
      return 10000045
    case '吴伟伟':
      return 10000027
    case '董齐安':
      return 10000042
    case '吕向召':
      return 10000029
    default:
      return null
  }
}


class TuiGuang extends React.Component{
  constructor(props){
    super(props)
    this.date  = this.props.match.params.date
    this.bg = `http://public.jyzqsh.com/tuiguang/${this.date}/bg.jpg`
    this.state={

    }
  }
  componentDidMount(){
    let init = {
      method:'GET',
      mode:'no-cors:'
    }
    fetch(`http://public.jyzqsh.com/tuiguang/${this.date}/data.json`,init)
        .then(res=>res.json())
        .then(json=>{
          let id = getTeacherProductId(json.teacher)
          let url = id?`/teacher/${id}`:'/product'
          this.setState({
            initDom:true,
            color:json.color,
            top:json.top,
            url:url,
          })
        })
  }
  render(){
    let {color, url, initDom, top} = this.state
    let bg = this.bg
    return initDom ?
        <div className="tuiguang" style={{background: color}}>
          <img src={bg} alt=""/>
          <Link to={url} style={{top: top}}/>
        </div> :
        <div/>
  }
}

export default TuiGuang