import {actions as productListActionsFromOtherFile} from '../../page_product';
import {actions as userInfoActionsFromOtherFile} from '../../page_center';
import TeachaerBrief from './TeacherBrief';
import ScrollStock from './ScrollStock';
import DownImage from './DownImage';
import Subscribe from '../../component_subscribe';
import Footer from '../../component_footer';
import Charts from './Charts';
import detail from '../../static/img/teacher/detail.jpg';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TeacherPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.productlist.data;
    const id = this.props.match.params.id;
    const teacher_data = data[id];
    if (teacher_data) {
      return (
        <div className="teacher-page">
          <TeachaerBrief teacher={teacher_data}/>
          <ScrollStock stocks={teacher_data.stocks}/>
          <Charts records={teacher_data.records}/>
          <DownImage pic={detail}/>
          <Subscribe
            product={teacher_data}
            userinfo={this.props.userinfo}
            wxinfo={this.props.wxinfo}
            history={this.props.history}
          />
          <Footer footerIndex={1}/>
        </div>
      );
    }

    return <div className="none"/>;
  }

  componentDidMount() {
    const data = this.props.productlist.data;
    const id = this.props.match.params.id;
    if (typeof data[id] === 'undefined') {
      this.props.productListActions.fetchListIfNeeded();
    }

    const {name, phone} = this.props.userinfo;
    if (typeof name === 'undefined' || typeof phone === 'undefined') {
      const openid = this.props.wxinfo.openid;
      this.props.userInfoActions.fetchUserIfNeeded(openid);
    }
  }
}

TeacherPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  productlist: PropTypes.object,
  wxinfo: PropTypes.object,
  userinfo: PropTypes.object,
  productListActions: PropTypes.object,
  userInfoActions: PropTypes.object
};

/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    productlist: state.productlist,
    wxinfo: state.wxinfo,
    userinfo: state.userinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch),
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherPage);


