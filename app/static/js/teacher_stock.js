import wuweiwei20181109 from '../img/stocks/吴伟伟3日.jpg';
import maxin20181109 from '../img/stocks/马鑫三日.jpg';
import dongqian20181109 from '../img/stocks/董齐安两日.jpg';

//吴伟伟
let wuweiwei = [
  {
    name: '捷昌驱动',
    code: '603583',
    result: '22.61%',
    daySend: '2018.10.25',
    day: '3',
    dayCount: '三日最高涨幅',
    img: wuweiwei20181109
  }
]
//马鑫
let maxin = [
  {
    name: '兴瑞科技', //股票名称
    code: '002937', //股票代码
    result: '17.17%',//涨幅
    daySend: '2018.11.01',//哪一天推送的
    day: '3',
    dayCount: '三日最高涨幅',
    img:maxin20181109
  }
]

//周煜
// let zhouyue = [
//   {
//     name: '药明康德',
//     code: '603259',
//     result: '22.15%',
//     daySend: '2018.08.17',//哪一天推送的
//     day: '阶段',
//     dayCount: '阶段最高涨幅',
//     img: dongqian20181109
//   }
// ]

// 董齐安
let dongqian = [
  {
    name: '蠡湖股份',
    code: '300694',
    result: '14.38%',
    daySend: '2018.10.31',//哪一天推送的
    day: '2',
    dayCount: '两日最高涨幅',
    img: dongqian20181109
  }
]

// hotTeachers的的股票
export function stocks(name) {
  switch (name) {
    case '吴伟伟':
      return wuweiwei
    case '马鑫':
      return maxin
    // case '周煜':
    //   return zhouyue
    case '董齐安':
      return dongqian
    default:
      return []
  }
}

// hotTeachers的排名
export function ranks(name) {
  switch (name) {
    case '吴伟伟':
      return 2
    case '马鑫':
      return 2
    case '董齐安':
      return 1
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
    case '董齐安':
      return 0
    default:
      return 0
  }
}
