import wuweiwei1 from '../img/stocks/wuweiwei1.jpg'
import wuweiwei2 from '../img/stocks/wuweiwei2.jpg'
import wuweiwei3 from '../img/stocks/wuweiwei3.jpg'
import maxin2 from '../img/stocks/maxin2.jpg'
import zhouyue1 from '../img/stocks/zhouyue1.jpg'

//吴伟伟
let wuweiwei = [
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
  },
  {
    name: '世纪天鸿',
    code: '300654',
    result: '14.97%',
    daySend: '2017.12.18',
    day: '3',
    dayCount: '三日最高涨幅',
    img: wuweiwei2
  }
]
//马鑫
let maxin = [
  {
    name: '山西焦化',
    code: '600740',
    result: '17.04%',
    daySend: '2017.12.29',
    day: '5',
    dayCount: '五日最高涨幅',
    img: maxin2
  }
]
//周煜
let zhouyue = [
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
export function stocks (name) {
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
export function ranks (name) {
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
export function recordNum (name) {
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