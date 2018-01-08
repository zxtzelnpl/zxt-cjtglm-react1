import wuweiwei2 from '../img/stocks/wuweiwei2.jpg'
import maxin2 from '../img/stocks/maxin2.jpg'
import jiaoxiaoyi1 from '../img/stocks/jiaoxiaoyi1.jpg'

//吴伟伟
let wuweiwei = [
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
//焦晓颖
let jiaoxiaoyi = [
  {
    name: '万科A ',
    code: '000002',
    result: '24.07%',
    daySend: '2017.12.22',
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img: jiaoxiaoyi1
  }
]

export function stocks (name) {
  switch (name) {
    case '吴伟伟':
      return wuweiwei
    case '马鑫':
      return maxin
    case '焦晓颖':
      return jiaoxiaoyi
    default:
      return []
  }
}

export function ranks (name) {
  switch (name) {
    case '吴伟伟':
      return 1
    case '马鑫':
      return 2
    case '焦晓颖':
      return 3
    default:
      return 4
  }
}

export function recordNum (name) {
  switch (name) {
    case '吴伟伟':
      return 1
    case '马鑫':
      return 0
    case '焦晓颖':
      return 0
    default:
      return 0
  }
}