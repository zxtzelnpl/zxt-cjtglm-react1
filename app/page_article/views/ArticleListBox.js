import './ArticleListBox.less';

import React from 'react';
import {Link} from 'react-router-dom';

import moment from 'moment';
import PropTypes from 'prop-types';

class ArticleListBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {ids, list} = this.props;
    const list_html = ids.map(id => {
      const article = list[id];
      return (
        <Link className="box" key={id} to={`/article/${article.id}`}>
          <p className="description">{article.description}</p>
          <span className="createTime">{moment(new Date(article.create_time)).format('YYYY-MM-DD HH:mm')}</span>
        </Link>
      );
    });
    return (
      <div className="article-list-box">
        {list_html}
      </div>
    );
  }
}

ArticleListBox.propTypes = {
  ids: PropTypes.array.isRequired,
  list: PropTypes.object.isRequired
};

export default ArticleListBox;
