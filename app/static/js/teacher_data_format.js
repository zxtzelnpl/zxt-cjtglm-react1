import chart_format from './chart_format'
import {stocks,ranks} from './teacher_stock'
import teacher_position from './teacher_position'

export default function(products){
    products.forEach((product)=>{
        let records=[];
        if(product.fiveday!==''){
            records.push(chart_format(product.fiveday))
        }
        if(product.nextday!==''){
            records.push(chart_format(product.nextday))
        }
        if(product.risen!==''){
            records.push(chart_format(product.risen))
        }
        if(product.threeday!==''){
            records.push(chart_format(product.threeday))
        }
        product.records = records;
        product.stocks = stocks(product.name)
        product.rank = ranks(product.name)
        product.lables = teacher_position(product.position)//取标签后面的3个
    })
}