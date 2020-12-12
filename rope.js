
const tile = (ctx, columnPosition, rowPosition, height, color) => {
  const halfHeight = height/ 2 ;
  // Draw tile "2"
  // I'm just going to draw a path for simplicity, rather than
  // worrying about drawing a rectangle with rotation and translates
  ctx.beginPath();
  ctx.moveTo(columnPosition - halfHeight, rowPosition - halfHeight);
  ctx.lineTo(columnPosition, rowPosition - height);
  ctx.lineTo(columnPosition + height, rowPosition);
  ctx.lineTo(columnPosition + halfHeight, rowPosition + halfHeight);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
};

const tileCurve = (ctx, columnPosition, rowPosition, height, color) => {
  const halfHeight = height/ 2 ;
  // Draw tile "2"
  // I'm just going to draw a path for simplicity, rather than
  // worrying about drawing a rectangle with rotation and translates
  ctx.beginPath();
  ctx.moveTo(columnPosition - halfHeight, rowPosition - halfHeight);
  ctx.lineTo(columnPosition, rowPosition - height);
  // ctx.lineTo(columnPosition + height, rowPosition);
  ctx.quadraticCurveTo(columnPosition + halfHeight, rowPosition -height,
                       columnPosition + height, rowPosition);
  ctx.lineTo(columnPosition + halfHeight, rowPosition + halfHeight);
  ctx.quadraticCurveTo(columnPosition, rowPosition - 10,
     columnPosition - halfHeight, rowPosition - halfHeight);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
};

const tileReflective = (ctx, columnPosition, rowPosition, height, color) => {
  const width = height * 2;
  const halfHeight = height/ 2 ;
  ctx.beginPath();
  ctx.moveTo(columnPosition + halfHeight, rowPosition + halfHeight);
  ctx.lineTo(columnPosition + width - halfHeight, rowPosition - halfHeight);
  ctx.lineTo(columnPosition + width +5, rowPosition -5);
  ctx.lineTo(columnPosition + height, rowPosition + height);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
};

const tileReflectiveCurve = (ctx, columnPosition, rowPosition, height, color) => {
  const width = height * 2;
  const halfHeight = height/ 2 ;
  ctx.beginPath();
  ctx.moveTo(columnPosition + halfHeight, rowPosition + halfHeight -18);
  // ctx.lineTo(columnPosition + width - halfHeight, rowPosition - halfHeight);
  ctx.quadraticCurveTo(columnPosition + width - halfHeight, rowPosition,
    columnPosition + width - halfHeight, rowPosition - halfHeight-18);
  ctx.lineTo(columnPosition + width, rowPosition);
  ctx.quadraticCurveTo(columnPosition + width, rowPosition +halfHeight,
    columnPosition + height, rowPosition + height);
  // ctx.lineTo(columnPosition + height, rowPosition + height);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
};
const triangleArea = (p1, p2, p3) => {
  return Math.abs(p1.x * (p2.y - p3.y) +
                  p2.x * (p3.y - p1.y) +
                  p3.x * (p1.y - p2.y)/2);
}
const reg =(x, y) => ({
  A: {x: x -h2, y: y-h2},
  B: {x: x, y: y-h},
  C: {x: x+h, y: y},
  D: {x: x+h2, y: y+h2}
})

const vector = (p1, p2) => ({  x: (p2.x - p1.x), y: (p2.y - p1.y)});
const dot = (u, v) => u.x * v.x + u.y * v.y; 
const isPointInRectangle = (r, m) => {
  var AB = vector(r.A, r.B);
  var AM = vector(r.A, m);
  var BC = vector(r.B, r.C);
  var BM = vector(r.B, m);
  var dotABAM = dot(AB, AM);
  var dotABAB = dot(AB, AB);
  var dotBCBM = dot(BC, BM);
  var dotBCBC = dot(BC, BC);
  return 0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC;
}

const isPointLiesInsideReg = (reg, p) => {
  const {A, B, C , D} = reg;
  const ABCDArea = triangleArea(A,B,C) + triangleArea(A,D,C);
  const pABArea = triangleArea(p,A,B);
  const pBCArea = triangleArea(p,B,C);
  const pCDArea = triangleArea(p,C,D);
  const pADArea = triangleArea(p,A,D);
  console.log(ABCDArea, pABArea + pADArea+ pBCArea +pCDArea);
  return ABCDArea === pABArea + pADArea+ pBCArea +pCDArea;
}
// and we can leave the drawing of some tiles to later rows and columns
// we are drawing the pattern blocks from left to right and top to bottom
// Loop through the pattern block rows
//   const a = 60;
//   const b = 120;
const canvas = document.getElementById("herringbone");
const h = 50 * Math.sqrt(2);
const w = h * 2;
const h2 = h / 2; // How far tile 1 sticks out to the left of the pattern block
canvas.height = 400;
canvas.width = 800;
const ctx = canvas.getContext("2d");
// Set a universal stroke colour and width
// ctx.strokeStyle = "black";
// ctx.lineWidth = 4;

for (var y = 0, i=0; y < canvas.height + h; y += h, i++) {
  // Loop through the pattern block columns
  for (var x = 0; x < canvas.width + w; x += w) {
    // Draw tile "3"
    // console.log(x, y);
    // tile(ctx, x, y, h, i%2===0? 'blue': 'blue')
    tile(ctx, x, y, h, i%2===0? '#c0e3c0': '#c0e3c0')
    tileReflective(ctx, x, y, h , i%2===0? '#e3cbc0': '#e3cbc0')
    // tileReflectiveCurve(ctx, x, y, h , i%2===0? 'green': 'yellow')

  }
}


const minPointClicked =(p) => {
  for (var y = 0, i=-2; y < canvas.height + h; y += h, i++) {
    for (var x = 0, j=-1; x < canvas.width + w; x += w, j++) {
      if(isPointInRectangle(reg(x, y), p)) {

        console.log({x:p.x - w*i, y});
       return {x:p.x - w*i, y}
    }
  }
}
}

canvas.addEventListener('mousedown', e=> {
  const react = canvas.getBoundingClientRect();
  const {clientX , clientY} = e;
  console.log(clientX - react.left, clientY -react.top);
  // const p = minPointClicked( {x: clientX - react.left, y:clientY - react.top });
  // const p = {x: (clientX - react.left)%w, y:(clientY - react.top) %w };
  const p = {x: (clientX- react.left), y:(clientY - react.top) };
  console.log(p);
  // const p = point();
  // console.log(p);
  const reg =(x, y) => ({
    A: {x: x -h2, y: y-h2},
    B: {x: x, y: y-h},
    C: {x: x+h, y: y},
    D: {x: x+h2, y: y+h2}
})

  for (var y = 0, i=0; y < canvas.height + h; y += h, i++) {
    for (var x = 0; x < canvas.width + w; x += w) {
      if(isPointInRectangle(reg(x, y), p)) {
        tile(ctx, x, y, h, 'red')
        p.x+=w, p.y+=w;
      } else {
        tile(ctx, x, y, h, i%2===0? '#c0e3c0': '#c0e3c0')
        tileReflective(ctx, x, y, h , i%2===0? '#e3cbc0': '#e3cbc0')
      }
    }
  }

  for (var y = canvas.height + h2, i=h; y > 0; y -= h, i--) {
    for (var x = canvas.width + w - h2; x > 0; x -= w) {
      if(isPointInRectangle(reg(x, y), p)) {
        tile(ctx, x, y, h, 'red')
        p.x-=w, p.y-=w;
      } 
    }
  }
  
})


