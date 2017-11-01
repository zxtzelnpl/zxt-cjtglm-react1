import {average,sum} from './tools'

export default function (str) {
    let obj = {}
    let arr = str.split('---')
    let distinguish = str.slice(-4)
    switch (distinguish) {
        case '最大涨幅':
            obj.title = arr.pop()
            obj.date = []
            obj.data1 = []
            obj.data2 = []
            arr.forEach((item) => {
                let arr_item = item.split('+')
                obj.date.push(arr_item[0])
                obj.data1.push(parseFloat(arr_item[1]))
                obj.data2.push(parseFloat(arr_item[2]))
            })
            obj.data = obj.data1.concat(obj.data2)
            obj.result = Math.max.apply(undefined, obj.data) + '%'
            obj.water = obj.result
            return obj
        case '上涨概率':
            obj.title = arr.pop()
            obj.date = []
            obj.data = []
            arr.forEach((item) => {
                let arr_item = item.split('+')
                obj.date.push(arr_item[0])
                obj.data.push(parseInt(arr_item[1]))
            })
            obj.result = sum(obj.data) * 50 / obj.data.length  + '%'
            obj.water = obj.result
            return obj
        case '上涨个数':
            obj.title = arr.pop()
            obj.data = []
            arr.forEach((num) => {
                obj.data.push(parseInt(num))
            })

            obj.result = obj.data[0]
            obj.water = parseInt(obj.data[0]*100/sum(obj.data))+'%';
            return obj
        default:
            obj.title = '五日平均涨幅'
            obj.date = []
            obj.data = []
            arr.forEach((item) => {
                let arr_item = item.split('+')
                obj.date.push(arr_item[0])
                obj.data.push(parseFloat(arr_item[1]))
            })
            obj.result = average(obj.data) + '%'
            obj.water = obj.result
            return obj
    }
}