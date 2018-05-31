import './Charts.less';

import {chartRiseNum} from '../../../static/js/tools';

import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class RiseNum extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    RiseNum.showChart(this.main, this.props.record);
  }

  static showChart(main, record) {
    chartRiseNum()(main, record);
  }

  render() {
    const record = this.props.record;
    const data_len = record.data[0] + record.data[1];
    const date_len = parseInt(data_len / 2);
    const word = record.title.slice(0, 1);
    return (
      <div className="rise-num charts">
        <div className="main" ref={main => {
          this.main = main;
        }}/>
        <div className="text">
          <p>数据统计：</p>
          <p>1、统计阶段：最近<span>{date_len}</span>个交易日，共计<span>{data_len}</span>只标的。</p>
          <p>2、统计结果：{word}日上涨个数有<span className="red">{record.data[0]}</span>个，下跌个数<span
            className="green">{record.data[1]}</span>个 ；</p>
        </div>
      </div>
    );
  }
}

RiseNum.propTypes = {
  record: PropTypes.array
};

export default RiseNum;
