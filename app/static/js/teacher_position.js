export default function (str){
    let arr = str.split('---')
    return arr.slice(-3);
}