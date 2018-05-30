import list from './views/ArticleListPage';
import detail from './views/ArticleDetailPage';
import * as actions from './actions';
import reducer from './reducer'

/**
 * 如果页面有列表也和详情页，则用list和detail
 * 如果页面只有一个单独的页面则用view
 */
export {list,detail,actions,reducer}