import './SubscribeArticleListBox.less';

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';

class SubscribeList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const list = this.props.list;
    let htmlArr;
    if (list.length > 0) {
      list.sort((a, b) => parseInt(b.analysts_article_id) - parseInt(a.analysts_article_id));
      htmlArr = list.map(subscribe => (
        <Link className="box" to={`/weixin0/${subscribe.analysts_article_id}`} key={subscribe.id}>
          <h4>{subscribe.title}</h4><span>{moment(subscribe.create_time).format('YYYY-MM-DD HH:mm')}</span>
        </Link>
      ));
    } else {
      htmlArr = (
        <div className="no-datas">该老师还未发布策略更新，请耐心等待</div>
      );
    }

    return (
      <div className="subscribe-article-list">
        {htmlArr}
      </div>
    );
  }
}

SubscribeList.propTypes = {
  list: PropTypes.array
};

export default SubscribeList;
