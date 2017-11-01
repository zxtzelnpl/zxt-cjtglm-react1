const Koa = require('koa');
const Router  = require('koa-router');

const app = new Koa();
const router = new Router()

const pic='1'
const pic_s='1'
const img='1'
const img1='1'
const img2='1'
const img3='1'
const img_result='1'


let initialState = {
    articlelist:[
        {
          id:'img',
          url:'/txsecurities_pics/pics/addImg/201709061414341.jpg'
        },
        {
            id:'0',
            description: '大幅下挫时仍是短期加仓良机',
            createTime: '2017-09-13 09:57',
            content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
        },
        {
            id:'1',
            description: '新能源板块为什么难能成为领涨旗帜?',
            createTime: '2017-09-13 09:57',
            content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
        },
        {
            id:'2',
            description: '逻辑分享——“取缔燃油车”谁最受益',
            createTime: '2017-09-13 09:57',
            content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
        },
        {
            id:'3',
            description: '当下市场机会大于风险，投资者应保持积极参与',
            createTime: '2017-09-13 09:57',
            content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
        },
        {
            id:'4',
            description: '操作上控制仓位，不宜追高',
            createTime: '2017-09-13 09:57',
            content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
        }
    ],
    productlist:[
        {
            id: '10000027',
            rank: '1',
            name: '吴伟伟',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '五日平均涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data: ['7.71', '15.64', '12.66', '9.12', '14.05', '19.67', '7.73', '5.41', '10.61', '14.16']
                },
                {
                    title: '五日最大涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
                    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        },
        {
            id: '10000032',
            rank: '2',
            name: '周煜',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '五日上涨个数',
                    data: [39, 5]
                },
                {
                    title: '次日上涨概率',
                    date: ['2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31'],
                    data: [2, 1, 1, 2, 1]
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        },
        {
            id: '10000036',
            rank: '3',
            name: '马鑫',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '次日上涨概率',
                    date: ['2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31'],
                    data: [2, 1, 1, 2, 1]
                },
                {
                    title: '五日最大涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
                    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        },
        {
            id: '10000029',
            rank: '4',
            name: '吕向召',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '五日最大涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
                    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
                },
                {
                    title: '五日平均涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data: ['7.71', '15.64', '12.66', '9.12', '14.05', '19.67', '7.73', '5.41', '10.61', '14.16']
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        },
        {
            id: '10000046',
            rank: '5',
            name: '邵军杰',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '五日平均涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data: ['7.71', '15.64', '12.66', '9.12', '14.05', '19.67', '7.73', '5.41', '10.61', '14.16']
                },
                {
                    title: '五日最大涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
                    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
                },
                {
                    title: '五日上涨个数',
                    data: [39, 5]
                },
                {
                    title: '次日上涨概率',
                    date: ['2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31', '2017-8-31'],
                    data: [2, 1, 1, 2, 1]
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        }
    ],
    userinfo:{
        inline:true,
        userid:'**********',
        openid:'******************',
        img:img,
        nickname:'Aaron',
        name:'赵学通',
        phone:'15921433951',
        account:'********',
        ID:'******************',
        orders:[],
        subscribe:[],
        customer:'021-51572550'
    }
}
let articleMore =[
    {
        id:'5',
        description: '大幅下挫时仍是短期加仓良机',
        createTime: '2017-09-13 09:57',
        content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
    },
    {
        id:'6',
        description: '新能源板块为什么难能成为领涨旗帜?',
        createTime: '2017-09-13 09:57',
        content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
    },
    {
        id:'7',
        description: '逻辑分享——“取缔燃油车”谁最受益',
        createTime: '2017-09-13 09:57',
        content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
    },
    {
        id:'8',
        description: '当下市场机会大于风险，投资者应保持积极参与',
        createTime: '2017-09-13 09:57',
        content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
    },
    {
        id:'9',
        description: '操作上控制仓位，不宜追高',
        createTime: '2017-09-13 09:57',
        content:'<div style="text-align: center;"><b style="line-height: 1.5;"><font size="5">学会这招让你快速准确读懂个股分时图！</font></b></div><div><br></div><div><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4">　　度过开盘半小时无序的多空近身搏杀阶段后，股市慢慢进入由主力主导的受控阶段，个股在盘中的走势，无论是探底拉升、窄幅震荡，或冲高回落全部体现了控盘主力的操作意图。大致上，盘中分时运行状态一般有以下几种常见情况：</font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><b><font color="#f83a22">　1. 低开高走。</font></b><font color="#3e3e3e">盘中个股若探底后拉升超过跌幅的1/2时，此后股价回调但跌不下去，表示主力做多信心十足，可在昨日收盘价附近挂单跟进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22"><b>　2. 平开高走。</b></font><font color="#3e3e3e">大市处于上升途中，个股若平开高走后回调不破开盘，股价重新向上，表示主力做多坚决，待第二波高点突破第一波高点时，投资者可考虑买进。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><b><font color="#f83a22" size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></b></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><b><font color="#f83a22">　　3. 个股开市后，若高开低走，第二波反弹无法创出新高，此刻若放出大量，在第二波反弹高位反转时宜卖出。</font></b><font color="#3e3e3e">这种主力利用高开吸引投资者追涨跟风借机放量，是派发的惯用伎俩手法。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　　</font><font color="#f83a22"><b>4. 个股趋弱时，</b></font><font color="#3e3e3e">盘中高开低走，股价翻绿后，反弹也无法翻红，投资者宜在无法翻红时，获利了结，以免在弱势中高位被套。</font></font></span></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><font size="4"><br style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"></font></p><p style="padding: 0px; max-width: 100%; clear: both; min-height: 1em; font-family: 微软雅黑; line-height: 24px; word-wrap: break-word !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; word-wrap: break-word !important;"><font size="4"><font color="#3e3e3e">　</font><font color="#f83a22">　<b>5. 大盘下跌时，</b></font><font color="#3e3e3e">若个股低开低走，跌破前一波分时低点，多是主力看淡行情；遇有实质性利空出台，低开低走，反弹无法超过开盘，多是主力离场观望，都应选择回避。</font></font></span></p></div>'
    }
]

router.get('/ashx/Articlelist.ashx',function(ctx,next){
    if(ctx.query.page==='0'){
        ctx.body = initialState.articlelist
    }
    else{
        ctx.body = articleMore
    }

})
router.get('/api/productlist',function(ctx,next){
    ctx.body = initialState.productlist
})
router.get('/api/userinfo',function(ctx,next){
    ctx.body = initialState.userinfo
})
router.get('/api/article/:id',function(ctx,next){
    let article = {};
    if(parseInt(ctx.params.id)<100){

        article = {
            id:ctx.params.id,
            description: '如果找不到文章就是这个',
            createTime: '2017-09-13 09:57'
        }
    }
    else{
        article = {
            fail:true,
            reason:'can not found the page'
        }
    }

    ctx.body = article
})
router.get('/api/product/:id',function(ctx,next){
    let teacher
    if(parseInt(ctx.params.id)<10000050){
        teacher ={
            id: ctx.params.id,
            rank: '111',
            name: '赵学通',
            title: '次日涨股牛人',
            special: '事件博弈',
            position: '高级投资经理',
            pic: pic,
            pic_s: pic_s,
            brief: '资深投资顾问，多年证券从业经历，具有丰富的市场投资经验，对市场、行业和公司均有深入的分析研究，同时对市场信息和股价反应之间的联系具有深刻的理解，总结了一套行之有效的操作策略；曾在湖北卫视“天生我财”节目中担任嘉宾，专门对于市场的最新信息进行解读和投资机会的发掘。',
            img1: img1,
            img2: img2,
            img3: img3,
            img_result: img_result,
            records: [
                {
                    title: '五日平均涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data: ['7.71', '15.64', '12.66', '9.12', '14.05', '19.67', '7.73', '5.41', '10.61', '14.16']
                },
                {
                    title: '五日最大涨幅',
                    date: ['12月1日', '12月1日', '12月1日', '12月1日', '12月1日'],
                    data1: ['6.61', '10.43', '7.41', '13.13', '4.61'],
                    data2: ['5.64', '11.11', '8.46', '20.06', '7.43']
                }
            ],
            stock: {
                name: '汉王科技',
                time: '2017.08.16',
                word: '阶段涨幅',
                rise: '71.40%'
            },
            pirce: '39'
        }
    }
    else{
        teacher = {
            fail:true,
            reason:'找不到这个老师啊'
        }
    }

    ctx.body = teacher

})
// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods())
app
    .listen(3000)