export default function(name){
    let time = new Date()
    let month = time.getMonth()
    let date = time.getDate()
    if(month!==11){
        return 5
    }
    switch(name){
        case '吴伟伟':
            if(date<15){
                return 10
            }
            else{
                return 5
            }
        case '马鑫':
            if(date<20){
                return 10
            }
            else{
                return 5
            }
        case '周煜':
            if(date<25){
                return 10
            }
            else{
                return 5
            }
        default:
            return 5
    }
}