import wxConfig from '../../config/weixin'

export function average(){
    let array=[],all=0,len,average
    Array.prototype.forEach.call(arguments,(arg)=>{
        if(typeof arg === 'number'){
            array.push(arg)
        }
        else if(typeof arg === 'string'){
            array.push(arg)
        }
        else if(arg instanceof Array){
            array = array.concat(arg)
        }
    })

    array.forEach((num)=>{
        if(typeof num!=='number'){
            num = parseInt(num)
        }
        all+=num
    })
    len = array.length
    average = Math.round(all*100/len)/100
    return average
}

export function sum(arr){
    return arr.reduce((prev, curr) => {
        return prev + curr
    }, 0);
}

export function formatDate(data){
    if(data.title.indexOf('平均涨幅')>-1){
        let num = average(data.data)
        return num +'%'
    }
    else if(data.title.indexOf('最大涨幅')>-1){
        let arr = data.data1.concat(data.data2)
        let num = Math.max.apply(undefined,arr)
        return num +'%'
    }
    else if(data.title.indexOf('上涨个数')>-1){
        let num = data.data[0]
        return num
    }
    else if(data.title.indexOf('上涨概率')>-1){
        let sum = data.data.reduce((prev,curr)=>{
            return prev + parseInt(curr)
        },0)

        let num = parseInt(sum*100/(data.data.length*2))
        return num + '%'
    }
}

export function numToChinese(num){
    switch(num){
        case 1:
            return '次'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
    }
}

export function ChartAverageRise(){
    let distinguish = '平均涨幅',
        title_en_end = 'AVERAGE',
        remark = '注：推出当时价格为核算的基准价',
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        box = {
            top: 65,
            left: 30,
            width: 250
        },
        yAxis = {
            line: {
                color: '#eeeff1',
                width: 1,
                space: 35,
                num: 4
            },
            label: {
                top: 65,
                left: 18,
                space: 35,
                fontSize: 7,
                color: '#c3c8ce'
            }

        },
        xAxis = {
            line: {
                color: '#65d3e3',
                width: 3
            },
            point: {
                relative_left: 10,
                color: '#f18f68',
                radius: 3,
                space: 25
            },
            label: {
                relative_top: 6,
                fontSize: 7,
                color: '#c3c8ce'
            }
        }
    ;

    /*tool-中文转英文*/
    function cn_to_en(str) {
        switch (str) {
            case '五日':
                return 'FIVE-DAY';
            case '三日':
                return 'THREE-DAY';
            case '次日':
                return 'NEXT-DAY';
            default:
                return ''
        }
    }

    /*tool-格式化数据*/
    function format_data(record, box, xAxis, yAxis) {
        var data = record.data;
        var max = Math.max.apply(null, data);
        yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
        yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
        xAxis.point.totalH = yAxis.line.space * (yAxis.line.num - 1);
        xAxis.point.bottom = box.top + xAxis.point.totalH;
        xAxis.point.left = box.left + xAxis.point.relative_left;
        xAxis.label.left = xAxis.point.left;
        xAxis.label.space = xAxis.point.space;
        xAxis.label.top = xAxis.label.relative_top + xAxis.point.bottom;

        xAxis.point.array = [];
        data.forEach(function (_data, _index) {
            var x = xAxis.point.left + xAxis.point.space * _index,
                y = xAxis.point.bottom - (_data / yAxis.label.max ) * xAxis.point.totalH;
            xAxis.point.array.push(Point(x, y))
        })
    }

    /*toll-Point*/
    function Point(x, y) {
        return {
            x: x, y: y
        }
    }

    /*tool-num*/
    function adapt(num, delta) {
        return parseInt(num * delta)
    }

    /*paint-写字*/
    function writeText(ctx, obj) {
        var fontSize = adapt((obj.fontSize || 12), delta);
        var c = obj.color || '#000000';
        var base = obj.base || 'middle';
        var align = obj.align || 'center';
        var fill = obj.fill || false;
        var text = obj.text;
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var weight = obj.weight || 'normal';

        ctx.save();
        ctx.beginPath();
        ctx.font = 'normal normal ' + weight + ' ' + fontSize + "px serif";
        ctx.textBaseline = base;
        ctx.textAlign = align;
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.strokeStyle = c;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }

    /*paint-长方形*/
    function paintReact(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var fill = obj.fill;

        ctx.save();
        ctx.beginPath();
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.lineWidth = delta;
            ctx.strokeStyle = c;
            ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
    }

    /*paint-Y轴坐标*/
    function paintYLine(ctx, obj) {
        ctx.save();
        ctx.beginPath();

        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var width = adapt(obj.width, delta);
        var lineWidth = adapt(obj.line.width, delta);
        var color = obj.line.color || '#ffffff';

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    /*paint-折线*/
    function paintLine(ctx, obj) {
        ctx.save();
        ctx.beginPath();

        var points = obj.points.map((function(_point){
            var x = adapt(_point.x,delta);
            var y = adapt(_point.y,delta);
            return Point(x,y)
        }));
        var width = adapt(obj.width,delta);
        var color = obj.color;

        ctx.moveTo(points[0].x,points[0].y);
        points.forEach(function(_point,index){
            if(index===0){return}
            ctx.lineTo(_point.x,_point.y)
        });
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    /*paint-画点*/
    function paintPoint(ctx,obj){
        ctx.save();
        ctx.beginPath();

        var x = adapt(obj.x,delta);
        var y = adapt(obj.y,delta);
        var radius = adapt(obj.radius,delta);
        var color = obj.color||'#000000';

        ctx.arc(x,y,radius,0,2*PI,true);
        ctx.fillStyle = color;

        ctx.fill();

        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, xAxis, yAxis);
        const CANVAS = document.createElement('canvas');
        const main_width = main.clientWidth;
        const main_height = main.clientHeight;
        const base_width = 300;//设计稿宽度为600
        const base_height = 200;//设计稿高度为400
        const title = record.title;
        const title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        const CONTEXT = CANVAS.getContext('2d');
        const center = Point(base_width / 2, base_height / 2);

        /*图表标题*/
        paintReact(CONTEXT, {
            x: 90,
            y: 20,
            w: 120,
            h: 22.5,
            c: '#000000'
        });
        paintReact(CONTEXT, {
            x: 110,
            y: 15,
            w: 80,
            h: 15,
            c: '#ffffff',
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 15,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title,
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 30,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title_en,
            fontSize: 8,
            fill: true
        });

        /*画Y坐标轴*/
        for (let i = 0; i < yAxis.line.num; i++) {
            paintYLine(CONTEXT, {
                x: box.left,
                y: box.top + i * yAxis.line.space,
                width: box.width,
                line: yAxis.line,
                label: yAxis.label
            });
            writeText(CONTEXT, {
                x: yAxis.label.left,
                y: yAxis.label.top + i * yAxis.label.space,
                base: 'middle',
                align: 'left',
                fontSize: yAxis.label.fontSize,
                color: yAxis.label.color,
                text: yAxis.label.increase * (yAxis.line.num - 1 - i),
                fill: true
            })

        }

        /*画折现*/
        paintLine(CONTEXT,
            {
                points: xAxis.point.array,
                width: xAxis.line.width,
                color: xAxis.line.color
            }
        );

        xAxis.point.array.forEach(function(_point){
            let obj = {
                x:_point.x,
                y:_point.y,
                color:xAxis.point.color,
                radius:xAxis.point.radius
            };
            paintPoint(CONTEXT,obj)
        });

        /*写坐标*/
        // record.date.forEach(function (_date, index) {
        //     writeText(CONTEXT, {
        //         x: xAxis.label.left + index * xAxis.label.space,
        //         y: xAxis.label.top,
        //         base: 'top',
        //         align: 'center',
        //         fontSize: xAxis.label.fontSize,
        //         color: xAxis.label.color,
        //         text: _date,
        //         fill: true
        //     });
        // });

        main.appendChild(CANVAS);
    }
}

export function ChartRiseNum(){
    let distinguish = '上涨个数',
        title_en_end = 'RISE',
        remark = '注：推出当时价格为核算的基准价',
        base_width = 300,//设计稿宽度为600
        base_height = 230,//设计稿高度为460
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        atan = Math.atan,
        box = {
            y: 175,
            radius1: 107,
            radius2: 77,
            width: 30,

            fall_color: '#51db71',
            rise_color: '#f18f68',
            inner_color:'#ffffff'
        },
        pointer = {
            y: 165,
            angle:PI/3,
            d_angle:6/180*PI,
            color: '#c9c9c9',
            length:68,
            distance:6,
            wrap_color: '#838383',
            inner_radius: 11,
            outer_radius: 16,
            ring_width:5
        },
        label = {
            color: '#c3c8ce',
            fontSize: 9,
            start: {
                relative_left: 25,
                y: 175,
                text: ' 0'
            },
            middle: {
                y: 55,
                text: '22'
            },
            end: {
                relative_right: 25,
                y: 175,
                text: '44'
            }
        },
        data = {
            color: '#c3c8ce',
            fontSize: 9,
            fall: {
                relative_left: 40,
                relative_bottom: 20
            },
            total: {
                relative_bottom: 20
            },
            rise: {
                relative_right: 40,
                relative_bottom: 20
            }
        }
    ;

    /*tool-中文转英文*/
    function cn_to_en(str) {
        switch (str) {
            case '五日':
                return 'FIVE-DAY';
            case '三日':
                return 'THREE-DAY';
            case '次日':
                return 'NEXT-DAY';
            default:
                return ''
        }
    }

    /*tool-格式化数据*/
    function format_data(record, box, label, data) {
        record.rise = record.data[0];
        record.fall = record.data[1];
        record.total = record.rise + record.fall;

        box.x = base_width / 2;

        label.start.x = label.start.relative_left;
        label.middle.x = base_width / 2;
        label.end.x = base_width - label.end.relative_right;

        data.fall.x = data.fall.relative_left;
        data.fall.y = base_height - data.fall.relative_bottom;
        data.fall.text = '下跌个数：' + record.fall;
        data.fall.startAngle = -PI;
        data.fall.endAngle = data.fall.startAngle + PI * (record.fall / record.total);
        data.total.x = base_width / 2;
        data.total.y = base_height - data.total.relative_bottom;
        data.total.text = '总个数：' + record.total;
        data.rise.x = base_width - data.rise.relative_right;
        data.rise.y = base_height - data.rise.relative_bottom;
        data.rise.text = '上涨个数：' + record.rise;
        data.rise.startAngle = data.fall.startAngle + PI * (record.fall / record.total);
        data.rise.endAngle = 0;

        pointer.x = base_width/2;
        pointer.actor= Point(
            pointer.x-pointer.length * cos((record.fall / record.total)*PI),
            pointer.y-pointer.length * sin((record.fall / record.total)*PI)
        );
        pointer.one = Point(
            pointer.x,
            pointer.y-pointer.length
        );
        pointer.two = Point(
            pointer.x-pointer.inner_radius*cos((PI-pointer.angle)/2),
            pointer.y-pointer.inner_radius*sin((PI-pointer.angle)/2)
        );
        pointer.three = Point(
            pointer.x+pointer.inner_radius*cos((PI-pointer.angle)/2),
            pointer.y-pointer.inner_radius*sin((PI-pointer.angle)/2)
        );

    }

    /*toll-Point*/
    function Point(x, y) {
        return {
            x: x, y: y
        }
    }

    /*tool-num*/
    function adapt(num, delta) {
        return parseInt(num * delta)
    }

    /*tool-angle*/
    function evaluation_angle(point,center){
        var a = center.y-point.y;
        var b = center.x-point.x;
        return atan(b/a);
    }

    /*paint-写字*/
    function writeText(ctx, obj) {
        var fontSize = adapt((obj.fontSize || 12), delta);
        var c = obj.color || '#000000';
        var base = obj.base || 'middle';
        var align = obj.align || 'center';
        var fill = obj.fill || false;
        var text = obj.text;
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var weight = obj.weight || 'normal';

        ctx.save();
        ctx.beginPath();
        ctx.font = 'normal normal ' + weight + ' ' + fontSize + "px serif";
        ctx.textBaseline = base;
        ctx.textAlign = align;
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.strokeStyle = c;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }

    /*paint-长方形*/
    function paintReact(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var fill = obj.fill;

        ctx.save();
        ctx.beginPath();
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.lineWidth = delta;
            ctx.strokeStyle = c;
            ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
    }

    /*paint-环形*/
    function paintRing(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var radius = adapt(obj.radius, delta);
        var width = adapt(obj.width, delta);
        var startAngle = obj.startAngle;
        var endAngle = obj.endAngle;
        var anticlockwise = obj.anticlockwise;
        var color = obj.color||'#000000';
        var inner_color = obj.inner_color||'#ffffff';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius+width, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius, 0, 2*PI, anticlockwise);
        ctx.fillStyle = inner_color;
        ctx.fill();
        ctx.restore();
    }

    /*paint-指针*/
    function paintPointer(ctx,obj){
        var P = Point(adapt(obj.x,delta),adapt(obj.y,delta));
        var P_ONE = Point(adapt(obj.one.x-obj.x,delta),adapt(obj.one.y-obj.y,delta));
        var P_TWO = Point(adapt(obj.two.x-obj.x,delta),adapt(obj.two.y-obj.y,delta));
        var P_THREE = Point(adapt(obj.three.x-obj.x,delta),adapt(obj.three.y-obj.y,delta));
        var P_ACTOR = Point(adapt(obj.actor.x-obj.x,delta),adapt(obj.actor.y-obj.y,delta));
        var color = obj.color||'#000000';
        var d_angle = pointer.d_angle;
        var angle =evaluation_angle(P_ACTOR,{x:0,y:0});

        ctx.save();
        ctx.beginPath();
        ctx.translate(P.x,P.y);
        ctx.rotate(-angle-d_angle);
        ctx.moveTo(0,0);
        ctx.lineTo(P_TWO.x,P_TWO.y);
        ctx.lineTo(P_ONE.x,P_ONE.y);
        ctx.lineTo(P_THREE.x,P_THREE.y);

        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, label, data);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var title = record.title;
        var title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        var CONTEXT = CANVAS.getContext('2d');
        var center = Point(base_width / 2, base_height / 2);

        /*图表标题*/
        paintReact(CONTEXT, {
            x: 90,
            y: 20,
            w: 120,
            h: 22.5,
            c: '#000000'
        });
        paintReact(CONTEXT, {
            x: 110,
            y: 15,
            w: 80,
            h: 15,
            c: '#ffffff',
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 15,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title,
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 30,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title_en,
            fontSize: 8,
            fill: true
        });

        /*环形坐标*/
        writeText(CONTEXT, {
            x: label.start.x,
            y: label.start.y,
            text: label.start.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'bottom',
            align: 'left',
            fill: true
        });
        writeText(CONTEXT, {
            x: label.middle.x,
            y: label.middle.y,
            text: label.middle.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'top',
            align: 'center',
            fill: true
        });
        writeText(CONTEXT, {
            x: label.end.x,
            y: label.end.y,
            text: label.end.text,
            color: label.color,
            fontSize: label.fontSize,
            base: 'bottom',
            align: 'right',
            fill: true
        });

        paintRing(CONTEXT, {
            x: box.x,
            y: box.y,
            radius: box.radius2,
            width: box.width,
            startAngle: data.fall.startAngle,
            endAngle: data.fall.endAngle,
            anticlockwise: false,
            color: box.fall_color,
            inner_color:box.inner_color
        });
        paintRing(CONTEXT, {
            x: box.x,
            y: box.y,
            radius: box.radius2,
            width: box.width,
            startAngle: data.rise.startAngle,
            endAngle: data.rise.endAngle,
            anticlockwise: false,
            color: box.rise_color,
            inner_color:box.inner_color
        });

        /*环形数值*/
        writeText(CONTEXT, {
            x: data.fall.x,
            y: data.fall.y,
            text: data.fall.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'left',
            fill: true
        });
        writeText(CONTEXT, {
            x: data.total.x,
            y: data.total.y,
            text: data.total.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'center',
            fill: true
        });
        writeText(CONTEXT, {
            x: data.rise.x,
            y: data.rise.y,
            text: data.rise.text,
            color: data.color,
            fontSize: data.fontSize,
            base: 'bottom',
            align: 'right',
            fill: true
        });

        /*指针*/
        paintRing(CONTEXT,{
            x:pointer.x,
            y:pointer.y,
            radius:pointer.inner_radius,
            width:pointer.ring_width,
            startAngle:0,
            endAngle:2*PI,
            anticlockwise: false,
            color:pointer.wrap_color,
            inner_color:pointer.color,
        });
        paintPointer(CONTEXT,pointer);

        /*图表载入*/
        main.appendChild(CANVAS);
    }
}

export function ChartMaxRise(){
    let distinguish = '最大涨幅',
        title_en_end = 'MAXIMUM',
        remark = '注：推出当时价格为核算的基准价',
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        box = {
            top: 62.5,
            left: 30,
            width: 250
        },
        yAxis = {
            line: {
                color: '#eeeff1',
                width: 1,
                space: 35,
                num: 5
            },
            label: {
                top: 62.5,
                left: 17.5,
                space: 35,
                fontSize: 8,
                color: '#c3c8ce'
            }

        },
        xAxis = {
            bar: {
                left: 5,
                color1: '#f18f68',
                color2: '#b7e4ee',
                width: 15,
                space: 10
            },
            label: {
                relative_top: 6,
                fontSize: 8,
                color: '#c3c8ce'
            }
        }
    ;

    /*tool-中文转英文*/
    function cn_to_en(str) {
        switch (str) {
            case '五日':
                return 'FIVE-DAY';
            case '三日':
                return 'THREE-DAY';
            case '次日':
                return 'NEXT-DAY';
            default:
                return ''
        }
    }

    /*tool-格式化数据*/
    function format_data(record, box, xAxis, yAxis) {
        var data = record.data1.concat(record.data2);
        var max = Math.max.apply(null, data);
        yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
        yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
        xAxis.bar.totalH = yAxis.line.space * (yAxis.line.num - 1);
        xAxis.bar.bottom = box.top + xAxis.bar.totalH;
        xAxis.label.left = box.left + xAxis.bar.left + xAxis.bar.width + xAxis.bar.space / 2;
        xAxis.label.space = (xAxis.bar.width + xAxis.bar.space) * 2;
        xAxis.label.top = xAxis.label.relative_top + xAxis.bar.bottom;
    }

    /*toll-Point*/
    function Point(x, y) {
        return {
            x: x, y: y
        }
    }

    /*tool-num*/
    function adapt(num, delta) {
        return parseInt(num * delta)
    }

    /*paint-写字*/
    function writeText(ctx, obj) {
        var fontSize = adapt((obj.fontSize || 12), delta);
        var c = obj.color || '#000000';
        var base = obj.base || 'middle';
        var align = obj.align || 'center';
        var fill = obj.fill || false;
        var text = obj.text;
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var weight = obj.weight || 'normal';

        ctx.save();
        ctx.beginPath();
        ctx.font = 'normal normal ' + weight + ' ' + fontSize + "px serif";
        ctx.textBaseline = base;
        ctx.textAlign = align;
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.strokeStyle = c;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }

    /*paint-长方形*/
    function paintReact(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var fill = obj.fill;

        ctx.save();
        ctx.beginPath();
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.lineWidth = delta;
            ctx.strokeStyle = c;
            ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
    }

    /*paint-Y轴坐标*/
    function paintYLine(ctx, obj) {
        ctx.save();
        ctx.beginPath();

        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var width = adapt(obj.width, delta);
        var lineWidth = adapt(obj.line.width, delta);
        var color = obj.line.color || '#ffffff';

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    /*paint-bar*/
    function paintBar(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var r = 6;
        var ptA = Point(x + r, y);
        var ptB = Point(x + w, y);
        var ptC = Point(x + w, y + h);
        var ptD = Point(x, y + h);
        var ptE = Point(x, y);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ptA.x, ptA.y);
        ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
        ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
        ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
        ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
        ctx.shadowColor = c;
        ctx.shadowBlur = 10;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, xAxis, yAxis);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var base_width = 300;//设计稿宽度为600
        var base_height = 250;//设计稿高度为500
        var title = record.title;
        var title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        var CONTEXT = CANVAS.getContext('2d');
        var center = Point(base_width / 2, base_height / 2);

        paintReact(CONTEXT, {
            x: 90,
            y: 20,
            w: 120,
            h: 22.5,
            c: '#000000'
        });
        paintReact(CONTEXT, {
            x: 110,
            y: 15,
            w: 80,
            h: 15,
            c: '#ffffff',
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 15,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title,
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 30,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title_en,
            fontSize: 8,
            fill: true
        });
        for (var i = 0; i < yAxis.line.num; i++) {
            paintYLine(CONTEXT, {
                x: box.left,
                y: box.top + i * yAxis.line.space,
                width: box.width,
                line: yAxis.line,
                label: yAxis.label
            });
            writeText(CONTEXT, {
                x: yAxis.label.left,
                y: yAxis.label.top + i * yAxis.label.space,
                base: 'middle',
                align: 'left',
                fontSize: yAxis.label.fontSize,
                color: yAxis.label.color,
                text: yAxis.label.increase * (yAxis.line.num - 1 - i),
                fill: true
            })

        }

        record.date.forEach(function (_date, index) {
            // writeText(CONTEXT, {
            //     x: xAxis.label.left + index * xAxis.label.space,
            //     y: xAxis.label.top,
            //     base: 'top',
            //     align: 'center',
            //     fontSize: xAxis.label.fontSize,
            //     color: xAxis.label.color,
            //     text: _date,
            //     fill: true
            // });
            paintBar(CONTEXT, {
                x: box.left + xAxis.bar.left + index * xAxis.label.space,
                y: xAxis.bar.bottom - xAxis.bar.totalH * (parseInt(record.data1[index]) / yAxis.label.max),
                w: xAxis.bar.width,
                h: xAxis.bar.totalH * (parseInt(record.data1[index]) / yAxis.label.max),
                c: xAxis.bar.color1
            });
            paintBar(CONTEXT, {
                x: box.left + xAxis.bar.left + xAxis.bar.width + xAxis.bar.space + index * xAxis.label.space,
                y: xAxis.bar.bottom - xAxis.bar.totalH * (parseInt(record.data2[index]) / yAxis.label.max),
                w: xAxis.bar.width,
                h: xAxis.bar.totalH * (parseInt(record.data2[index]) / yAxis.label.max),
                c: xAxis.bar.color2
            })
        });

        writeText(CONTEXT, {
            x: center.x,
            y: 230,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: remark,
            fontSize: 7,
            fill: true
        });

        main.appendChild(CANVAS);
    }
}

export function ChartRiseProbablity(){
    var distinguish = '上涨个数',
        title_en_end = 'RISE PRO',
        remark = '注：推出当时价格为核算的基准价',
        base_width = 300,//设计稿宽度为600
        base_height = 250,//设计稿高度为500
        dpr = Math.max(window.devicePixelRatio || 1, 1),
        delta,
        PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        box={
            y:194,
            radius:98
        },
        little_box={
            radius:35,
            color1:'#f18f68',
            color2:'#b7e4ee',
            fontColor:'#ffffff',
            fontSize:16
        },
        middle={
            y:194,
            radius:37,
            fontSize:25,
            fontColor:'#ffffff',
            startAngle : 0,
            endAngle:2*PI,
            anticlockwise:true,
            color:'#ee7342',
            ring:{
                y:194,
                radius:46,
                startAngle : 0,
                endAngle:2*PI,
                anticlockwise:true,
                width:2,
                color:'#daf0f5'
            }
        }
    ;

    /*tool-中文转英文*/
    function cn_to_en(str) {
        switch (str) {
            case '五日':
                return 'FIVE-DAY';
            case '三日':
                return 'THREE-DAY';
            case '次日':
                return 'NEXT-DAY';
            default:
                return ''
        }
    }

    /*tool-格式化数据*/
    function format_data(record, box, little_box, middle) {
        var A = -PI*9/10,B=PI/5;
        record.total = record.data.reduce(function(prev,next){
            return prev+next
        });
        record.probability = record.total*100/(record.data.length*2) +'%';

        box.x = base_width/2;

        little_box.points = record.data.map(function(_data,i){
            var obj={};
            obj.rotate = A+B*i;
            obj.text = _data + '个';
            obj.x =  box.x+cos(A+B*i)*box.radius;
            obj.y =  box.y+sin(A+B*i)*box.radius;
            obj.color = i%2===0?little_box.color1:little_box.color2;
            obj.r = little_box.radius;
            return obj;
        });

        middle.x = base_width/2;
        middle.ring.x = base_width/2;
    }

    /*tool-Point*/
    function Point(x, y) {
        return {
            x: x, y: y
        }
    }

    /*tool-num*/
    function adapt(num, delta) {
        return parseInt(num * delta)
    }

    /*tool-angle*/
    function evaluation_angle(point,center){
        var a = center.y-point.y;
        var b = center.x-point.x;
        return atan(b/a);
    }

    /*paint-写字*/
    function writeText(ctx, obj) {
        var fontSize = adapt((obj.fontSize || 12), delta);
        var c = obj.color || '#000000';
        var base = obj.base || 'middle';
        var align = obj.align || 'center';
        var fill = obj.fill || false;
        var text = obj.text;
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var weight = obj.weight || 'normal';

        ctx.save();
        ctx.beginPath();
        ctx.font = 'normal normal ' + weight + ' ' + fontSize + "px serif";
        ctx.textBaseline = base;
        ctx.textAlign = align;
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.strokeStyle = c;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }

    /*paint-长方形*/
    function paintReact(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var w = adapt(obj.w, delta);
        var h = adapt(obj.h, delta);
        var c = obj.c;
        var fill = obj.fill;

        ctx.save();
        ctx.beginPath();
        if (fill) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
        } else {
            ctx.lineWidth = delta;
            ctx.strokeStyle = c;
            ctx.strokeRect(x, y, w, h);
        }
        ctx.restore();
    }

    /*paint-五边形*/
    function paintPentagon(ctx,obj,index){
        ctx.save();
        ctx.beginPath();

        var x = obj.x;
        var y = obj.y;
        var r = obj.r;
        var c = obj.color;
        var deg = obj.rotate;

        var A = PI/2 - PI*2/5;
        var B = PI*2/5 - A;

        var ONE=Point(adapt(0,delta),adapt(-r,delta));
        var TWO=Point(adapt(cos(A)*r,delta),adapt(-sin(A)*r,delta));
        var THREE=Point(adapt(cos(B)*r,delta),adapt(sin(B)*r,delta));
        var FOUR =Point(adapt(-cos(B)*r,delta),adapt(sin(B)*r,delta));
        var FIVE = Point(adapt(-cos(A)*r,delta),adapt(-sin(A)*r,delta));
        var X = adapt(x,delta);
        var Y = adapt(y,delta);

        ctx.translate(X,Y);
        if(index===1||index===3){
            ctx.rotate(deg+PI/10);
        }

        ctx.moveTo(ONE.x,ONE.y);
        ctx.lineTo(TWO.x,TWO.y);
        ctx.lineTo(THREE.x,THREE.y);
        ctx.lineTo(FOUR.x,FOUR.y);
        ctx.lineTo(FIVE.x,FIVE.y);
        ctx.lineTo(ONE.x,ONE.y);

        ctx.fillStyle = c;
        ctx.fill();

        ctx.restore();
    }

    /*paint-环形*/
    function paintRing(ctx, obj) {
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var radius = adapt(obj.radius, delta);
        var width = adapt(obj.width, delta);
        var startAngle = obj.startAngle;
        var endAngle = obj.endAngle;
        var anticlockwise = obj.anticlockwise;
        var color = obj.color||'#000000';
        var inner_color = obj.inner_color||'#ffffff';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius+width, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius, 0, 2*PI, anticlockwise);
        ctx.fillStyle = inner_color;
        ctx.fill();
        ctx.restore();
    }

    /*paint-圆形*/
    function paintCircle(ctx,obj){
        var x = adapt(obj.x, delta);
        var y = adapt(obj.y, delta);
        var radius = adapt(obj.radius, delta);
        var startAngle = obj.startAngle;
        var endAngle = obj.endAngle;
        var anticlockwise = obj.anticlockwise;
        var color = obj.color||'#000000';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    return function paintCanvas(main, record) {
        format_data(record, box, little_box, middle);
        var CANVAS = document.createElement('canvas');
        var main_width = main.clientWidth;
        var main_height = main.clientHeight;
        var title = record.title;
        var title_en = cn_to_en(title.slice(0, 2)) + ' ' + title_en_end;
        delta = dpr * main_width / base_width;
        CANVAS.width = base_width * delta;
        CANVAS.height = base_height * delta;
        CANVAS.style.width = main_width + 'px';
        CANVAS.style.height = main_height + 'px';
        var CONTEXT = CANVAS.getContext('2d');
        var center = Point(base_width / 2, base_height / 2);

        /*图表标题*/
        paintReact(CONTEXT, {
            x: 90,
            y: 20,
            w: 120,
            h: 22.5,
            c: '#000000'
        });
        paintReact(CONTEXT, {
            x: 110,
            y: 15,
            w: 80,
            h: 15,
            c: '#ffffff',
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 15,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title,
            fill: true
        });
        writeText(CONTEXT, {
            x: center.x,
            y: 30,
            base: 'top',
            align: 'center',
            weight: 'bold',
            text: title_en,
            fontSize: 8,
            fill: true
        });

        /*五个5边形状*/
        little_box.points.forEach(function(point,index){
            paintPentagon(CONTEXT,point,index);
            writeText(CONTEXT, {
                x: point.x,
                y: point.y,
                base: 'middle',
                align: 'center',
                weight: 'bold',
                text: point.text,
                fill: true,
                color:little_box.fontColor,
                fontSize:little_box.fontSize
            });
        });

        paintRing(CONTEXT,middle.ring);
        paintCircle(CONTEXT,middle);
        writeText(CONTEXT, {
            x: middle.x,
            y: middle.y,
            base: 'middle',
            align: 'center',
            weight: 'bold',
            text: record.probability,
            fontSize: middle.fontSize,
            color:'#ffffff',
            fill: true
        });

        /*图表载入*/
        main.appendChild(CANVAS);
    }
}

export function getQuery(search) {
    let query = {}
    let _query = search.slice(1).split('&')
    _query.forEach((str) => {
        let arr = str.split('=')
        query[arr[0]] = arr[1]
    })
    return query
}

export function getCode() {
    let url = encodeURIComponent(window.location.href);
    let urlCode = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.AppID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=lk#wechat_redirect`
    window.location.href = urlCode
}