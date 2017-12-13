import wuweiwei1 from '../img/stocks/wuweiwei1.jpg'
import wuweiwei3 from '../img/stocks/wuweiwei3.jpg'
import maxin1 from '../img/stocks/maxin1.jpg'
import maxin3 from '../img/stocks/maxin3.jpg'
import zhouyue1 from '../img/stocks/zhouyue1.jpg'
import zhouyue2 from '../img/stocks/zhouyue2.jpg'



//吴伟伟
let wuweiwei = [
  {
    name: '中环股份',
    code: '002129',
    result: '20.56%',
    daySend: '2017.12.06',
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img: wuweiwei1
  },
  {
    name: '世运电路',
    code: '603920',
    result: '14.77%',
    daySend: '2017.11.10',
    day: '2',
    dayCount: '两日最高涨幅',
    img: wuweiwei3
  }
]
//马鑫
let maxin = [
  {
    name: '有研新材',
    code: '600206',
    result: '23.27%',
    daySend: '2017.11.28',
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img: maxin1
  },
  {
    name: '世荣兆业',
    code: '002016',
    result: '21.68%',
    daySend: '2017.11.20',
    day: '9',
    dayCount: '九日最高涨幅',
    img: maxin3
  }
]

//周煜
let zhouyu = [
  {
    name: '中国中车',
    code: '601766',
    result: '15.45%',
    daySend: '2017.10.24',
    day: '5',
    dayCount: '五日最高涨幅',
    img: zhouyue2
  },
  {
    name: '士兰微',
    code: '600460',
    result: '24.84%',
    daySend: '2017.09.28',
    day: '3',
    dayCount: '三日最高涨幅',
    img: zhouyue1
  }
]

export function stocks(name) {
  switch (name) {
    case '吴伟伟':
      return wuweiwei
    case '马鑫':
      return maxin
    case '周煜':
      return zhouyu
    default:
      return []
  }
}

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