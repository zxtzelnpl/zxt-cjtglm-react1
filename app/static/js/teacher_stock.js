import wuweiwei1 from '../img/stocks/wuweiwei1.jpg'
import wuweiwei2 from '../img/stocks/wuweiwei2.jpg'
import wuweiwei3 from '../img/stocks/wuweiwei3.jpg'
import maxin1 from '../img/stocks/maxin1.jpg'
import maxin2 from '../img/stocks/maxin2.jpg'
import maxin3 from '../img/stocks/maxin3.jpg'
import zhouyue1 from '../img/stocks/zhouyue1.jpg'
import zhouyue2 from '../img/stocks/zhouyue2.jpg'
import zhouyue3 from '../img/stocks/zhouyue3.jpg'

//吴伟伟
let wuweiwei = [
  {
    name: '润都股份',
    code: '002923',
    result: '14.04%',
    daySend: '2018.03.05',
    day: '3',
    dayCount: '三日最高涨幅',
    img: wuweiwei2
  },
  {
    name: '国信证券',
    code: '002736',
    result: '涨停',
    daySend: '2018.1.17',
    day: '当日',
    dayCount: '当日',
    img: wuweiwei3
  },
  {
    name: '财通证券',
    code: '601108',
    result: '涨停',
    daySend: '2018.1.15',
    day: '次日',
    dayCount: '次日',
    img: wuweiwei1
  }
]
//马鑫
let maxin = [
  {
    name: '联诚精密',
    code: '002921',
    result: '三连板',
    daySend: '2018.3.12',
    day: '6',
    dayCount: '六日涨幅情况',
    img: maxin3
  }
  ,
  {
    name: '山西焦化',
    code: '600740',
    result: '17.04%',
    daySend: '2017.12.29',
    day: '5',
    dayCount: '五日最高涨幅',
    img: maxin2
  },
  {
    name: '新疆火炬',
    code: '603080',
    result: '14.55%',
    daySend: '2018.03.07',
    day: '次日',
    dayCount: '次日最高涨幅',
    img: maxin1
  }
]
//周煜
let zhouyue = [
  {
    name:'华菱精工',
    code:'603356',
    result:'12.62%',
    daySend:'2018.3.9',
    day:'次日',
    dayCount:'次日最高涨幅',
    img:zhouyue3
  },
  {
    name: '中船科技 ',
    code: '600072',
    result: '21.08%',
    daySend: '2018.2.23',
    day: '5',
    dayCount: '五日最高涨幅',
    img: zhouyue2
  },
  {
    name: '光线传媒 ',
    code: '300251',
    result: '32.16%',
    daySend: '2018.1.18',
    day: '5',
    dayCount: '五日最高涨幅',
    img: zhouyue1
  }
]

// hotTeachers的的股票
export function stocks(name) {
  switch (name) {
    case '吴伟伟':
      return wuweiwei
    case '马鑫':
      return maxin
    case '周煜':
      return zhouyue
    default:
      return []
  }
}

// hotTeachers的排名
export function ranks(name) {
  switch (name) {
    case '吴伟伟':
      return 1
    case '马鑫':
      return 2
    case '周煜':
      return 3
    default:
      return 4
  }
}

// 控制teacher具体显示的record
export function recordNum(name) {
  switch (name) {
    case '吴伟伟':
      return 1
    case '马鑫':
      return 0
    case '周煜':
      return 0
    default:
      return 0
  }
}