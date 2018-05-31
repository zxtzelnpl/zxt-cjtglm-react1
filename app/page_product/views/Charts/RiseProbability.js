import './Charts.less';

import {chartRiseProbablity} from '../../../static/js/tools';

import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class RiseProbability extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    RiseProbability.showChart(this.main, this.props.record);
  }

  static showChart(main, record) {
    chartRiseProbablity()(main, record);
  }

  render() {
    const date_len = this.props.record.date.length;
    const word = this.props.record.title.slice(0, 1);
    const totalRise = this.props.record.data.reduce((previousValue, currentValue) => {
      currentValue = currentValue < 1 ? 0 : currentValue;
      return Number(previousValue) + Number(currentValue);
    }, 0);
    const risePercent = `${totalRise * 100 / (this.props.record.data.length * 2)}%`;
    return (
      <div className="rise-probability charts">
        <div className="main" ref={main => {
          this.main = main;
        }}/>
        <div className="text">
          <p>数据统计：</p>
          <p>1、统计阶段：最近<span>{date_len}</span>个交易日，共计<span>{this.props.record.data.length * 2}</span>只标的；</p>
          <p>2、统计数字：</p>
          <p>(1)数字“1”表示推出2只标的中{word}日有1只上涨;</p>
          <p>(2)数字“2”表示推出2只标的中{word}日有2只上涨;</p>
          <p>3、统计结果：统计期间上涨标的总数为 <span className="red">{totalRise}</span>只，上涨率为 <span
            className="red">{risePercent}</span>。</p>
        </div>
      </div>
    );
  }
}

RiseProbability.propTypes = {
  record: PropTypes.array
};

export default RiseProbability;
