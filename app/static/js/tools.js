import wxConfig from '../../config/weixin';

export function average() {
  let all = 0;
  let array = [];

  Array.prototype.forEach.call(arguments, arg => {
    if (typeof arg === 'number') {
      array.push(arg);
    } else if (typeof arg === 'string') {
      array.push(arg);
    } else if (arg instanceof Array) {
      array = array.concat(arg);
    }
  });

  array.forEach(num => {
    if (typeof num !== 'number') {
      num = parseInt(num);
    }
    all += num;
  });
  const len = array.length;
  const average_num = Math.round(all * 100 / len) / 100;
  return average_num;
}

export function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

// export function formatDate(data) {
//   if (data.title.indexOf('平均涨幅') > -1) {
//     const num = average(data.data);
//     return `${num}%`;
//   } else if (data.title.indexOf('最大涨幅') > -1) {
//     const arr = data.data1.concat(data.data2);
//     const num = Math.max([...arr]);
//     return `${num}%`;
//   } else if (data.title.indexOf('上涨个数') > -1) {
//     const num = data.data[0];
//     return num;
//   } else if (data.title.indexOf('上涨概率') > -1) {
//     const sum_num = data.data.reduce((prev, curr) => prev + parseInt(curr), 0);
//
//     const num = parseInt(sum_num * 100 / (data.data.length * 2));
//     return `${num}%`;
//   }
// }

// export function numToChinese(num) {
//   switch (num) {
//     case 1:
//       return '次';
//     case 2:
//       return '二';
//     case 3:
//       return '三';
//     case 4:
//       return '四';
//     case 5:
//       return '五';
//     default:
//       return '零';
//   }
// }

export function chartAverageRise() {
  // let distinguish = '平均涨幅',
  // let remark = '注：推出当时价格为核算的基准价',
  const BOX = {
      top: 65,
      left: 30,
      width: 250
    },
    DPR = Math.max(window.devicePixelRatio || 1, 1),
    PI = Math.PI,
    TITLE_EN_END = 'AVERAGE',
    X_AXIS = {
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
    },
    Y_AXIS = {
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

    }
  ;
  let delta;

  /* tool-中文转英文*/
  function cn_to_en(str) {
    switch (str) {
      case '五日':
        return 'FIVE-DAY';
      case '三日':
        return 'THREE-DAY';
      case '次日':
        return 'NEXT-DAY';
      default:
        return '';
    }
  }

  /* toll-Point*/
  function Point(x, y) {
    return {
      x: x, y: y
    };
  }

  /* tool-格式化数据*/
  function format_data(record, box, xAxis, yAxis) {
    const data = record.data;
    const max = Math.max.apply(null, data);
    yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
    yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
    xAxis.point.totalH = yAxis.line.space * (yAxis.line.num - 1);
    xAxis.point.bottom = box.top + xAxis.point.totalH;
    xAxis.point.left = box.left + xAxis.point.relative_left;
    xAxis.label.left = xAxis.point.left;
    xAxis.label.space = xAxis.point.space;
    xAxis.label.top = xAxis.label.relative_top + xAxis.point.bottom;

    xAxis.point.array = [];
    data.forEach((_data, _index) => {
      const x = xAxis.point.left + xAxis.point.space * _index,
        y = xAxis.point.bottom - (_data / yAxis.label.max) * xAxis.point.totalH;
      xAxis.point.array.push(new Point(x, y));
    });
  }

  /* tool-num*/
  function adapt(num, _delta) {
    return parseInt(num * _delta);
  }

  /* paint-写字*/
  function writeText(ctx, obj) {
    const fontSize = adapt((obj.fontSize || 12), delta);
    const c = obj.color || '#000000';
    const base = obj.base || 'middle';
    const align = obj.align || 'center';
    const fill = obj.fill || false;
    const text = obj.text;
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const weight = obj.weight || 'normal';

    ctx.save();
    ctx.beginPath();
    ctx.font = `normal normal ${weight} ${fontSize}px serif`;
    ctx.textBaseline = base;
    ctx.textAlign = align;
    if (fill) {
      ctx.fillStyle = c;
      ctx.fillText(text, x, y);
    } else {
      ctx.strokeStyle = c;
      ctx.strokeText(text, x, y);
    }
    ctx.restore();
  }

  /* paint-长方形*/
  function paintReact(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const w = adapt(obj.w, delta);
    const h = adapt(obj.h, delta);
    const c = obj.c;
    const fill = obj.fill;

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

  /* paint-Y轴坐标*/
  function paintYLine(ctx, obj) {
    ctx.save();
    ctx.beginPath();

    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const width = adapt(obj.width, delta);
    const lineWidth = adapt(obj.line.width, delta);
    const color = obj.line.color || '#ffffff';

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.restore();
  }

  /* paint-折线*/
  function paintLine(ctx, obj) {
    ctx.save();
    ctx.beginPath();

    const points = obj.points.map((_point => {
      const x = adapt(_point.x, delta);
      const y = adapt(_point.y, delta);
      return new Point(x, y);
    }));
    const width = adapt(obj.width, delta);
    const color = obj.color;

    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((_point, index) => {
      if (index === 0) {
        return;
      }
      ctx.lineTo(_point.x, _point.y);
    });
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.restore();
  }

  /* paint-画点*/
  function paintPoint(ctx, obj) {
    ctx.save();
    ctx.beginPath();

    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const radius = adapt(obj.radius, delta);
    const color = obj.color || '#000000';

    ctx.arc(x, y, radius, 0, 2 * PI, true);
    ctx.fillStyle = color;

    ctx.fill();

    ctx.restore();
  }

  return function paintCanvas(main, record) {
    format_data(record, BOX, X_AXIS, Y_AXIS);
    const CANVAS = document.createElement('canvas');
    const main_width = main.clientWidth;
    const main_height = main.clientHeight;
    const base_width = 300;// 设计稿宽度为600
    const base_height = 200;// 设计稿高度为400
    const title = record.title;
    const title_en = `${cn_to_en(title.slice(0, 2))} ${TITLE_EN_END}`;
    delta = DPR * main_width / base_width;
    CANVAS.width = base_width * delta;
    CANVAS.height = base_height * delta;
    CANVAS.style.width = `${main_width}px`;
    CANVAS.style.height = `${main_height}px`;
    const CONTEXT = CANVAS.getContext('2d');
    const center = new Point(base_width / 2, base_height / 2);

    /* 图表标题*/
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

    /* 画Y坐标轴*/
    for (let i = 0; i < Y_AXIS.line.num; i++) {
      paintYLine(CONTEXT, {
        x: BOX.left,
        y: BOX.top + i * Y_AXIS.line.space,
        width: BOX.width,
        line: Y_AXIS.line,
        label: Y_AXIS.label
      });
      writeText(CONTEXT, {
        x: Y_AXIS.label.left,
        y: Y_AXIS.label.top + i * Y_AXIS.label.space,
        base: 'middle',
        align: 'left',
        fontSize: Y_AXIS.label.fontSize,
        color: Y_AXIS.label.color,
        text: Y_AXIS.label.increase * (Y_AXIS.line.num - 1 - i),
        fill: true
      });
    }

    /* 画折现*/
    paintLine(CONTEXT,
      {
        points: X_AXIS.point.array,
        width: X_AXIS.line.width,
        color: X_AXIS.line.color
      }
    );

    X_AXIS.point.array.forEach(_point => {
      const obj = {
        x: _point.x,
        y: _point.y,
        color: X_AXIS.point.color,
        radius: X_AXIS.point.radius
      };
      paintPoint(CONTEXT, obj);
    });

    /* 写坐标*/
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
  };
}

export function chartRiseNum() {
  const PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos,
    atan = Math.atan;
  const BASE_WIDTH = 300,
    BASE_HEIGHT = 230,
    // DISTINGGUISH = '上涨个数',
    DPR = Math.max(window.devicePixelRatio || 1, 1),
    // REMARK = '注：推出当时价格为核算的基准价',
    TITLE_EN_END = 'RISE',
    BOX = {
      y: 175,
      radius1: 107,
      radius2: 77,
      width: 30,

      fall_color: '#51db71',
      rise_color: '#f18f68',
      inner_color: '#ffffff'
    },
    POINTER = {
      y: 165,
      angle: PI / 3,
      d_angle: 6 / 180 * PI,
      color: '#c9c9c9',
      length: 68,
      distance: 6,
      wrap_color: '#838383',
      inner_radius: 11,
      outer_radius: 16,
      ring_width: 5
    },
    LABEL = {
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
    DATA = {
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
    };
  let delta;
  /* tool-中文转英文*/
  function cn_to_en(str) {
    switch (str) {
      case '五日':
        return 'FIVE-DAY';
      case '三日':
        return 'THREE-DAY';
      case '次日':
        return 'NEXT-DAY';
      default:
        return '';
    }
  }

  /* toll-Point*/
  function Point(x, y) {
    return {
      x: x, y: y
    };
  }

  /* tool-格式化数据*/
  function format_data(record, box, label, data) {
    record.rise = record.data[0];
    record.fall = record.data[1];
    record.total = record.rise + record.fall;

    box.x = BASE_WIDTH / 2;

    label.start.x = label.start.relative_left;
    label.middle.x = BASE_WIDTH / 2;
    label.end.x = BASE_WIDTH - label.end.relative_right;

    data.fall.x = data.fall.relative_left;
    data.fall.y = BASE_HEIGHT - data.fall.relative_bottom;
    data.fall.text = `下跌个数：${record.fall}`;
    data.fall.startAngle = -PI;
    data.fall.endAngle = data.fall.startAngle + PI * (record.fall / record.total);
    data.total.x = BASE_WIDTH / 2;
    data.total.y = BASE_HEIGHT - data.total.relative_bottom;
    data.total.text = `总个数：${record.total}`;
    data.rise.x = BASE_WIDTH - data.rise.relative_right;
    data.rise.y = BASE_HEIGHT - data.rise.relative_bottom;
    data.rise.text = `上涨个数：${record.rise}`;
    data.rise.startAngle = data.fall.startAngle + PI * (record.fall / record.total);
    data.rise.endAngle = 0;

    POINTER.x = BASE_WIDTH / 2;
    POINTER.actor = new Point(
      POINTER.x - POINTER.length * cos((record.fall / record.total) * PI),
      POINTER.y - POINTER.length * sin((record.fall / record.total) * PI)
    );
    POINTER.one = new Point(
      POINTER.x,
      POINTER.y - POINTER.length
    );
    POINTER.two = new Point(
      POINTER.x - POINTER.inner_radius * cos((PI - POINTER.angle) / 2),
      POINTER.y - POINTER.inner_radius * sin((PI - POINTER.angle) / 2)
    );
    POINTER.three = new Point(
      POINTER.x + POINTER.inner_radius * cos((PI - POINTER.angle) / 2),
      POINTER.y - POINTER.inner_radius * sin((PI - POINTER.angle) / 2)
    );
  }

  /* tool-num*/
  function adapt(num, _delta) {
    return parseInt(num * _delta);
  }

  /* tool-angle*/
  function evaluation_angle(point, center) {
    const a = center.y - point.y;
    const b = center.x - point.x;
    return atan(b / a);
  }

  /* paint-写字*/
  function writeText(ctx, obj) {
    const fontSize = adapt((obj.fontSize || 12), delta);
    const c = obj.color || '#000000';
    const base = obj.base || 'middle';
    const align = obj.align || 'center';
    const fill = obj.fill || false;
    const text = obj.text;
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const weight = obj.weight || 'normal';

    ctx.save();
    ctx.beginPath();
    ctx.font = `normal normal ${weight} ${fontSize}px serif`;
    ctx.textBaseline = base;
    ctx.textAlign = align;
    if (fill) {
      ctx.fillStyle = c;
      ctx.fillText(text, x, y);
    } else {
      ctx.strokeStyle = c;
      ctx.strokeText(text, x, y);
    }
    ctx.restore();
  }

  /* paint-长方形*/
  function paintReact(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const w = adapt(obj.w, delta);
    const h = adapt(obj.h, delta);
    const c = obj.c;
    const fill = obj.fill;

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

  /* paint-环形*/
  function paintRing(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const radius = adapt(obj.radius, delta);
    const width = adapt(obj.width, delta);
    const startAngle = obj.startAngle;
    const endAngle = obj.endAngle;
    const anticlockwise = obj.anticlockwise;
    const color = obj.color || '#000000';
    const inner_color = obj.inner_color || '#ffffff';

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius + width, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * PI, anticlockwise);
    ctx.fillStyle = inner_color;
    ctx.fill();
    ctx.restore();
  }

  /* paint-指针*/
  function paintPointer(ctx, obj) {
    const P = new Point(adapt(obj.x, delta), adapt(obj.y, delta));
    const P_ONE = new Point(adapt(obj.one.x - obj.x, delta), adapt(obj.one.y - obj.y, delta));
    const P_TWO = new Point(adapt(obj.two.x - obj.x, delta), adapt(obj.two.y - obj.y, delta));
    const P_THREE = new Point(adapt(obj.three.x - obj.x, delta), adapt(obj.three.y - obj.y, delta));
    const P_ACTOR = new Point(adapt(obj.actor.x - obj.x, delta), adapt(obj.actor.y - obj.y, delta));
    const color = obj.color || '#000000';
    const d_angle = POINTER.d_angle;
    const angle = evaluation_angle(P_ACTOR, {x: 0, y: 0});

    ctx.save();
    ctx.beginPath();
    ctx.translate(P.x, P.y);
    ctx.rotate(-angle - d_angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(P_TWO.x, P_TWO.y);
    ctx.lineTo(P_ONE.x, P_ONE.y);
    ctx.lineTo(P_THREE.x, P_THREE.y);

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  }

  return function paintCanvas(main, record) {
    format_data(record, BOX, LABEL, DATA);
    const CANVAS = document.createElement('canvas');
    const main_width = main.clientWidth;
    const main_height = main.clientHeight;
    const title = record.title;
    const title_en = `${cn_to_en(title.slice(0, 2))} ${TITLE_EN_END}`;
    delta = DPR * main_width / BASE_WIDTH;
    CANVAS.width = BASE_WIDTH * delta;
    CANVAS.height = BASE_HEIGHT * delta;
    CANVAS.style.width = `${main_width}px`;
    CANVAS.style.height = `${main_height}px`;
    const CONTEXT = CANVAS.getContext('2d');
    const center = new Point(BASE_WIDTH / 2, BASE_HEIGHT / 2);

    /* 图表标题*/
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

    /* 环形坐标*/
    writeText(CONTEXT, {
      x: LABEL.start.x,
      y: LABEL.start.y,
      text: LABEL.start.text,
      color: LABEL.color,
      fontSize: LABEL.fontSize,
      base: 'bottom',
      align: 'left',
      fill: true
    });
    writeText(CONTEXT, {
      x: LABEL.middle.x,
      y: LABEL.middle.y,
      text: LABEL.middle.text,
      color: LABEL.color,
      fontSize: LABEL.fontSize,
      base: 'top',
      align: 'center',
      fill: true
    });
    writeText(CONTEXT, {
      x: LABEL.end.x,
      y: LABEL.end.y,
      text: LABEL.end.text,
      color: LABEL.color,
      fontSize: LABEL.fontSize,
      base: 'bottom',
      align: 'right',
      fill: true
    });

    paintRing(CONTEXT, {
      x: BOX.x,
      y: BOX.y,
      radius: BOX.radius2,
      width: BOX.width,
      startAngle: DATA.fall.startAngle,
      endAngle: DATA.fall.endAngle,
      anticlockwise: false,
      color: BOX.fall_color,
      inner_color: BOX.inner_color
    });
    paintRing(CONTEXT, {
      x: BOX.x,
      y: BOX.y,
      radius: BOX.radius2,
      width: BOX.width,
      startAngle: DATA.rise.startAngle,
      endAngle: DATA.rise.endAngle,
      anticlockwise: false,
      color: BOX.rise_color,
      inner_color: BOX.inner_color
    });

    /* 环形数值*/
    writeText(CONTEXT, {
      x: DATA.fall.x,
      y: DATA.fall.y,
      text: DATA.fall.text,
      color: DATA.color,
      fontSize: DATA.fontSize,
      base: 'bottom',
      align: 'left',
      fill: true
    });
    writeText(CONTEXT, {
      x: DATA.total.x,
      y: DATA.total.y,
      text: DATA.total.text,
      color: DATA.color,
      fontSize: DATA.fontSize,
      base: 'bottom',
      align: 'center',
      fill: true
    });
    writeText(CONTEXT, {
      x: DATA.rise.x,
      y: DATA.rise.y,
      text: DATA.rise.text,
      color: DATA.color,
      fontSize: DATA.fontSize,
      base: 'bottom',
      align: 'right',
      fill: true
    });

    /* 指针*/
    paintRing(CONTEXT, {
      x: POINTER.x,
      y: POINTER.y,
      radius: POINTER.inner_radius,
      width: POINTER.ring_width,
      startAngle: 0,
      endAngle: 2 * PI,
      anticlockwise: false,
      color: POINTER.wrap_color,
      inner_color: POINTER.color
    });
    paintPointer(CONTEXT, POINTER);

    /* 图表载入*/
    main.appendChild(CANVAS);
  };
}

export function chartMaxRise() {
  // const DISTINGGUISH = '最大涨幅';
  const TITLE_EN_END = 'MAXIMUM',
    REMARK = '注：推出当时价格为核算的基准价',
    DPR = Math.max(window.devicePixelRatio || 1, 1),
    BOX = {
      top: 62.5,
      left: 30,
      width: 250
    },
    X_AXIS = {
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
    Y_AXIS = {
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
    };
  let delta;

  /* tool-中文转英文*/
  function cn_to_en(str) {
    switch (str) {
      case '五日':
        return 'FIVE-DAY';
      case '三日':
        return 'THREE-DAY';
      case '次日':
        return 'NEXT-DAY';
      default:
        return '';
    }
  }

  /* toll-Point*/
  function Point(x, y) {
    return {
      x: x, y: y
    };
  }

  /* tool-格式化数据*/
  function format_data(record, box, xAxis, yAxis) {
    const data = record.data1.concat(record.data2);
    const max = Math.max.apply(null, data);
    yAxis.label.increase = Math.ceil(max / (yAxis.line.num - 1));
    yAxis.label.max = yAxis.label.increase * (yAxis.line.num - 1);
    xAxis.bar.totalH = yAxis.line.space * (yAxis.line.num - 1);
    xAxis.bar.bottom = box.top + xAxis.bar.totalH;
    xAxis.label.left = box.left + xAxis.bar.left + xAxis.bar.width + xAxis.bar.space / 2;
    xAxis.label.space = (xAxis.bar.width + xAxis.bar.space) * 2;
    xAxis.label.top = xAxis.label.relative_top + xAxis.bar.bottom;
  }

  /* tool-num*/
  function adapt(num, _delta) {
    return parseInt(num * _delta);
  }

  /* paint-写字*/
  function writeText(ctx, obj) {
    const fontSize = adapt((obj.fontSize || 12), delta);
    const c = obj.color || '#000000';
    const base = obj.base || 'middle';
    const align = obj.align || 'center';
    const fill = obj.fill || false;
    const text = obj.text;
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const weight = obj.weight || 'normal';

    ctx.save();
    ctx.beginPath();
    ctx.font = `normal normal ${weight} ${fontSize}px serif`;
    ctx.textBaseline = base;
    ctx.textAlign = align;
    if (fill) {
      ctx.fillStyle = c;
      ctx.fillText(text, x, y);
    } else {
      ctx.strokeStyle = c;
      ctx.strokeText(text, x, y);
    }
    ctx.restore();
  }

  /* paint-长方形*/
  function paintReact(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const w = adapt(obj.w, delta);
    const h = adapt(obj.h, delta);
    const c = obj.c;
    const fill = obj.fill;

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

  /* paint-Y轴坐标*/
  function paintYLine(ctx, obj) {
    ctx.save();
    ctx.beginPath();

    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const width = adapt(obj.width, delta);
    const lineWidth = adapt(obj.line.width, delta);
    const color = obj.line.color || '#ffffff';

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.restore();
  }

  /* paint-bar*/
  function paintBar(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const w = adapt(obj.w, delta);
    const h = adapt(obj.h, delta);
    const c = obj.c;
    const r = 6;
    const ptA = new Point(x + r, y);
    const ptB = new Point(x + w, y);
    const ptC = new Point(x + w, y + h);
    const ptD = new Point(x, y + h);
    const ptE = new Point(x, y);

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
    format_data(record, BOX, X_AXIS, Y_AXIS);
    const CANVAS = document.createElement('canvas');
    const main_width = main.clientWidth;
    const main_height = main.clientHeight;
    const base_width = 300;// 设计稿宽度为600
    const base_height = 250;// 设计稿高度为500
    const title = record.title;
    const title_en = `${cn_to_en(title.slice(0, 2))} ${TITLE_EN_END}`;
    delta = DPR * main_width / base_width;
    CANVAS.width = base_width * delta;
    CANVAS.height = base_height * delta;
    CANVAS.style.width = `${main_width}px`;
    CANVAS.style.height = `${main_height}px`;
    const CONTEXT = CANVAS.getContext('2d');
    const center = new Point(base_width / 2, base_height / 2);

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
    for (let i = 0; i < Y_AXIS.line.num; i++) {
      paintYLine(CONTEXT, {
        x: BOX.left,
        y: BOX.top + i * Y_AXIS.line.space,
        width: BOX.width,
        line: Y_AXIS.line,
        label: Y_AXIS.label
      });
      writeText(CONTEXT, {
        x: Y_AXIS.label.left,
        y: Y_AXIS.label.top + i * Y_AXIS.label.space,
        base: 'middle',
        align: 'left',
        fontSize: Y_AXIS.label.fontSize,
        color: Y_AXIS.label.color,
        text: Y_AXIS.label.increase * (Y_AXIS.line.num - 1 - i),
        fill: true
      });
    }

    record.date.forEach((_date, index) => {
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
        x: BOX.left + X_AXIS.bar.left + index * X_AXIS.label.space,
        y: X_AXIS.bar.bottom - X_AXIS.bar.totalH * (parseInt(record.data1[index]) / Y_AXIS.label.max),
        w: X_AXIS.bar.width,
        h: X_AXIS.bar.totalH * (parseInt(record.data1[index]) / Y_AXIS.label.max),
        c: X_AXIS.bar.color1
      });
      paintBar(CONTEXT, {
        x: BOX.left + X_AXIS.bar.left + X_AXIS.bar.width + X_AXIS.bar.space + index * X_AXIS.label.space,
        y: X_AXIS.bar.bottom - X_AXIS.bar.totalH * (parseInt(record.data2[index]) / Y_AXIS.label.max),
        w: X_AXIS.bar.width,
        h: X_AXIS.bar.totalH * (parseInt(record.data2[index]) / Y_AXIS.label.max),
        c: X_AXIS.bar.color2
      });
    });

    writeText(CONTEXT, {
      x: center.x,
      y: 230,
      base: 'top',
      align: 'center',
      weight: 'bold',
      text: REMARK,
      fontSize: 7,
      fill: true
    });

    main.appendChild(CANVAS);
  };
}

export function chartRiseProbablity() {
  // const DISTINGGUISH = '上涨个数',
  // REMARK = '注：推出当时价格为核算的基准价';
  const PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos;
  const TITLE_EN_END = 'RISE PRO',
    BASE_WIDTH = 300,
    BASE_HEIGHT = 250,
    DPR = Math.max(window.devicePixelRatio || 1, 1),
    BOX = {
      y: 194,
      radius: 98
    },
    LITTLE_BOX = {
      radius: 35,
      color1: '#f18f68',
      color2: '#b7e4ee',
      fontColor: '#ffffff',
      fontSize: 16
    },
    MIDDLE = {
      y: 194,
      radius: 37,
      fontSize: 25,
      fontColor: '#ffffff',
      startAngle: 0,
      endAngle: 2 * PI,
      anticlockwise: true,
      color: '#ee7342',
      ring: {
        y: 194,
        radius: 46,
        startAngle: 0,
        endAngle: 2 * PI,
        anticlockwise: true,
        width: 2,
        color: '#daf0f5'
      }
    };
  let delta;

  /* tool-中文转英文*/
  function cn_to_en(str) {
    switch (str) {
      case '五日':
        return 'FIVE-DAY';
      case '三日':
        return 'THREE-DAY';
      case '次日':
        return 'NEXT-DAY';
      default:
        return '';
    }
  }

  /* tool-格式化数据*/
  function format_data(record, box, little_box, middle) {
    const A = -PI * 9 / 10, B = PI / 5;
    record.total = record.data.reduce((prev, next) => prev + next);
    record.probability = `${record.total * 100 / (record.data.length * 2)}%`;

    box.x = BASE_WIDTH / 2;

    little_box.points = record.data.map((_data, i) => {
      const obj = {};
      obj.rotate = A + B * i;
      obj.text = `${_data}个`;
      obj.x = box.x + cos(A + B * i) * box.radius;
      obj.y = box.y + sin(A + B * i) * box.radius;
      obj.color = i % 2 === 0 ? little_box.color1 : little_box.color2;
      obj.r = little_box.radius;
      return obj;
    });

    middle.x = BASE_WIDTH / 2;
    middle.ring.x = BASE_WIDTH / 2;
  }

  /* tool-Point*/
  function Point(x, y) {
    return {
      x: x, y: y
    };
  }

  /* tool-num*/
  function adapt(num, _delta) {
    return parseInt(num * _delta);
  }

  /* tool-angle*/
  // function evaluation_angle(point, center) {
  //   const a = center.y - point.y;
  //   const b = center.x - point.x;
  //   return atan(b / a);
  // }

  /* paint-写字*/
  function writeText(ctx, obj) {
    const fontSize = adapt((obj.fontSize || 12), delta);
    const c = obj.color || '#000000';
    const base = obj.base || 'middle';
    const align = obj.align || 'center';
    const fill = obj.fill || false;
    const text = obj.text;
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const weight = obj.weight || 'normal';

    ctx.save();
    ctx.beginPath();
    ctx.font = `normal normal ${weight} ${fontSize}px serif`;
    ctx.textBaseline = base;
    ctx.textAlign = align;
    if (fill) {
      ctx.fillStyle = c;
      ctx.fillText(text, x, y);
    } else {
      ctx.strokeStyle = c;
      ctx.strokeText(text, x, y);
    }
    ctx.restore();
  }

  /* paint-长方形*/
  function paintReact(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const w = adapt(obj.w, delta);
    const h = adapt(obj.h, delta);
    const c = obj.c;
    const fill = obj.fill;

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

  /* paint-五边形*/
  function paintPentagon(ctx, obj, index) {
    ctx.save();
    ctx.beginPath();

    const x = obj.x;
    const y = obj.y;
    const r = obj.r;
    const c = obj.color;
    const deg = obj.rotate;

    const A = PI / 2 - PI * 2 / 5;
    const B = PI * 2 / 5 - A;

    const ONE = new Point(adapt(0, delta), adapt(-r, delta));
    const TWO = new Point(adapt(cos(A) * r, delta), adapt(-sin(A) * r, delta));
    const THREE = new Point(adapt(cos(B) * r, delta), adapt(sin(B) * r, delta));
    const FOUR = new Point(adapt(-cos(B) * r, delta), adapt(sin(B) * r, delta));
    const FIVE = new Point(adapt(-cos(A) * r, delta), adapt(-sin(A) * r, delta));
    const X = adapt(x, delta);
    const Y = adapt(y, delta);

    ctx.translate(X, Y);
    if (index === 1 || index === 3) {
      ctx.rotate(deg + PI / 10);
    }

    ctx.moveTo(ONE.x, ONE.y);
    ctx.lineTo(TWO.x, TWO.y);
    ctx.lineTo(THREE.x, THREE.y);
    ctx.lineTo(FOUR.x, FOUR.y);
    ctx.lineTo(FIVE.x, FIVE.y);
    ctx.lineTo(ONE.x, ONE.y);

    ctx.fillStyle = c;
    ctx.fill();

    ctx.restore();
  }

  /* paint-环形*/
  function paintRing(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const radius = adapt(obj.radius, delta);
    const width = adapt(obj.width, delta);
    const startAngle = obj.startAngle;
    const endAngle = obj.endAngle;
    const anticlockwise = obj.anticlockwise;
    const color = obj.color || '#000000';
    const inner_color = obj.inner_color || '#ffffff';

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius + width, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * PI, anticlockwise);
    ctx.fillStyle = inner_color;
    ctx.fill();
    ctx.restore();
  }

  /* paint-圆形*/
  function paintCircle(ctx, obj) {
    const x = adapt(obj.x, delta);
    const y = adapt(obj.y, delta);
    const radius = adapt(obj.radius, delta);
    const startAngle = obj.startAngle;
    const endAngle = obj.endAngle;
    const anticlockwise = obj.anticlockwise;
    const color = obj.color || '#000000';

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  return function paintCanvas(main, record) {
    format_data(record, BOX, LITTLE_BOX, MIDDLE);
    const CANVAS = document.createElement('canvas');
    const main_width = main.clientWidth;
    const main_height = main.clientHeight;
    const title = record.title;
    const title_en = `${cn_to_en(title.slice(0, 2))} ${TITLE_EN_END}`;
    delta = DPR * main_width / BASE_WIDTH;
    CANVAS.width = BASE_WIDTH * delta;
    CANVAS.height = BASE_HEIGHT * delta;
    CANVAS.style.width = `${main_width}px`;
    CANVAS.style.height = `${main_height}px`;
    const CONTEXT = CANVAS.getContext('2d');
    const center = new Point(BASE_WIDTH / 2, BASE_HEIGHT / 2);

    /* 图表标题*/
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

    /* 五个5边形状*/
    LITTLE_BOX.points.forEach((point, index) => {
      paintPentagon(CONTEXT, point, index);
      writeText(CONTEXT, {
        x: point.x,
        y: point.y,
        base: 'middle',
        align: 'center',
        weight: 'bold',
        text: point.text,
        fill: true,
        color: LITTLE_BOX.fontColor,
        fontSize: LITTLE_BOX.fontSize
      });
    });

    paintRing(CONTEXT, MIDDLE.ring);
    paintCircle(CONTEXT, MIDDLE);
    writeText(CONTEXT, {
      x: MIDDLE.x,
      y: MIDDLE.y,
      base: 'middle',
      align: 'center',
      weight: 'bold',
      text: record.probability,
      fontSize: MIDDLE.fontSize,
      color: '#ffffff',
      fill: true
    });

    /* 图表载入*/
    main.appendChild(CANVAS);
  };
}

export function getQuery(search) {
  const query = {};
  const _query = search.slice(1).split('&');
  _query.forEach(str => {
    const arr = str.split('=');
    query[arr[0]] = arr[1];
  });
  return query;
}

export function getCode() {
  const url = encodeURIComponent(window.location.href);
  const urlCode = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.AppID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=lk#wechat_redirect`;
  window.location.href = urlCode;
}
