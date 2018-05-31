import './ArticleListPage.less';

import {bindActionCreators} from 'redux';
import * as articleListmentActionsFromOtherFile from '../actions';
import article_banner from '../../static/img/banner/article.jpg';
import ArticleListBox from './ArticleListBox';
import Footer from '../../component_footer';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ArticleListPage extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const page = 0;
    this.props.articleListmentActions.fetchListIfNeeded(page);
  }

  load() {
    const {ids} = this.props.articlelist;
    const page = ids.length;
    this.props.articleListmentActions.fetchListIfNeeded(page);
  }

  renderListDom() {
    const {ids, data} = this.props.articlelist;
    let renderListDom = null;

    if (ids.length !== 0) {
      renderListDom = (
        <div className="content">
          <ArticleListBox list={data} ids={ids}/>
          <span className="more" onClick={this.load.bind(this)}>点击加载更多</span>
        </div>
      );
    }

    return renderListDom;
  }

  render() {
    return (
      <div className="article-list-page">
        <div className="header">
          <img src={article_banner}/>
        </div>
        {this.renderListDom()}
        <Footer footerIndex={0}/>
      </div>
    );
  }
}

ArticleListPage.propTypes = {
  articlelist: PropTypes.object,
  articleListmentActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    articlelist: state.articlelist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    articleListmentActions: bindActionCreators(articleListmentActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListPage);
