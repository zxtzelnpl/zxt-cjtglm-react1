import lvxiangzhao from '../img/product/lvxiangzhao.jpg'
import maxin from '../img/product/maxin.jpg'
import suxuepeng from '../img/product/suxuepeng.jpg'
import wuweiwei from '../img/product/wuweiwei.jpg'
import yuliang from '../img/product/yuliang.jpg'
import zhoukang from '../img/product/zhoukang.jpg'
import zhouyu from '../img/product/zhouyu.jpg'
import shaojunjie from '../img/product/shaojunjie.jpg'

export default function(name){
    switch(name){
        case '吕向召':
            return lvxiangzhao
        case '马鑫':
            return maxin
        case '苏学鹏':
            return suxuepeng
        case '吴伟伟':
            return wuweiwei
        case '俞亮':
            return yuliang
        case '周康':
            return zhoukang
        case '周煜':
            return zhouyu
        case '邵军杰':
            return shaojunjie
        default:
            return zhouyu
    }
}