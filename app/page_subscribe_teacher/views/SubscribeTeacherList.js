import './SubscribeTeacherList.less';

import Box from './SubscribeTeacherListBox';

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions';
import {actions as productListActionsFromOtherFile} from '../../page_product';
import Footer from '../../component_footer';

// "涨停早知道"  "选股牛人"  "君银内参周报"
const ignoreProducts = ['10000000', '10000003', '10000006'];

class SubscribeTeacherList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  renderTeacherListDom() {
    let dom;
    const {data, receivedAt} = this.props.subscribleTeacher;
    const user_id = this.props.match.params.id;

    if (typeof receivedAt === 'undefined') {
      dom = <div>数据正在加载中</div>;
    } else if (data.length === 0) {
      dom = <div>您暂时还没有订阅任何老师</div>;
    } else {
      const list = data.filter(item => (ignoreProducts.indexOf(item.produce_id) < 0));
      dom = list.map(subscribe => <Box key={subscribe.produce_id} subscribe={subscribe} user_id={user_id}/>);
    }

    return dom;
  }

  render() {
    const listDom = this.renderTeacherListDom();
    return (
      <div className="subscribe-list-page">
        <div className="content">
          <div className="subscribe-teacher-list">
            {listDom}
          </div>
        </div>
        <Footer footerIndex={2}/>
      </div>
    );
  }

  componentDidMount() {
    const user_id = this.props.match.params.id;
    this.props.subscribeListActions.fetchTeacherListIfNeeded(user_id);
  }
}

SubscribeTeacherList.propTypes = {
  subscribleTeacher: PropTypes.object,
  wxinfo: PropTypes.object,
  subscribeListActions: PropTypes.object,
  productListActions: PropTypes.object,
  match: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    subscribleTeacher: state.subscribleList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeListActions: bindActionCreators(actions, dispatch),
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeTeacherList);
