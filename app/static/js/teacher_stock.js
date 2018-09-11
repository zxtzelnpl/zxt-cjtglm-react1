// import wuweiwei2 from '../img/stocks/wuweiwei2.jpg'
// import maxin1 from '../img/stocks/maxin1.jpg'
// import maxin3 from '../img/stocks/maxin3.jpg'
// import zhouyue3 from '../img/stocks/zhouyue3.jpg'
//
// import wuweiwei20180510 from '../img/stocks/wuweiwei20180510.jpg'
// import zhouyue20180510 from '../img/stocks/zhouyue20180510.jpg'
//
// import maxin20180518 from '../img/stocks/maxin20180518.jpg'
// import wuweiwei20180518 from '../img/stocks/wuweiwei20180518.jpg'
// import zhouyue20180518 from '../img/stocks/zhouyue20180518.jpg'

import wuweiwei20180911 from '../img/stocks/绿色动力.jpg';
import maxin20180911 from '../img/stocks/联诚精密.jpg';
import zhouyue20180911 from '../img/stocks/药明康德.jpg';

//吴伟伟
let wuweiwei = [
  {
    name: '绿色动力',
    code: '601330',
    result: '50.67%',
    daySend: '2018.08.17',
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img: wuweiwei20180911
  }
]
//马鑫
let maxin = [
  {
    name: '联诚精密', //股票名称
    code: '002921', //股票代码
    result: '20.52%',//涨幅
    daySend: '2018.08.27',//哪一天推送的
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img:maxin20180911
  }
]
//周煜
let zhouyue = [
  {
    name: '药明康德',
    code: '603259',
    result: '22.15%',
    daySend: '2018.08.17',//哪一天推送的
    day: '阶段',
    dayCount: '阶段最高涨幅',
    img: zhouyue20180911
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
