import './ArticleDetailPage.less';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as articleListmentActionsFromOtherFile} from '../../page_article';
import Footer from '../../component_footer';
import PropTypes from 'prop-types';


class ArticleDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.recordTag = false;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const data = this.props.articlelist.data;

    if (typeof data[id] === 'undefined') {
      this.props.articleListmentActions.fetchIDIfNeeded(id);
    }
    else {
      this.record();
    }
  }

  componentDidUpdate() {
    if (!this.recordTag) {
      this.record();
    }
  }

  record() {
    const openid = this.props.openid,
      id = this.props.match.params.id;
    // fetch(`/ashx/Visit_Record.ashx?openid=${openid}&Article_id=${id}`)
    //   .then(res => res.text())
    //   .then(text => {
    //     console.log(text);
    //   })
    //   .catch(err => {
    //     console.log('网络连接错误');
    //   });
  }

  render() {
    const id = this.props.match.params.id;
    const data = this.props.articlelist.data;
    const article = data[id];
    let renderDom;

    if (typeof article !== 'undefined') {
      renderDom = (
        <div className="article-detial-page">
          <h4 className="title">{article.description}</h4>
          <span className="sub">{article.create_time}</span>
          <div dangerouslySetInnerHTML={{__html: article.content}} className="content"/>
          <Footer footerIndex={0}/>
        </div>
      );
    }

    return renderDom;
  }
}

ArticleDetailPage.propTypes = {
  openid: PropTypes.string,
  match: PropTypes.object,
  articlelist: PropTypes.object,
  articleListmentActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    openid: state.wxinfo.openid,
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
)(ArticleDetailPage);
