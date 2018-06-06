import './SubscribeArticleBox.less';

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class SubscribeArticleBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {title, analysts_article_id, id, create_time} = this.props.article;

    return (
      <Link className="box" to={`/weixin0/${analysts_article_id}`} key={id}>
        <h4>{title}</h4><span>{create_time}</span>
      </Link>
    );
  }
}

SubscribeArticleBox.propTypes = {
  article: PropTypes.object
};

export default SubscribeArticleBox;
