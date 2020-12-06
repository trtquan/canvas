
const tile = (ctx, columnPosition, rowPosition, height, color) => {
    const halfHeight = height/ 2 ;
    // Draw tile "2"
    // I'm just going to draw a path for simplicity, rather than
    // worrying about drawing a rectangle with rotation and translates
    ctx.beginPath();
    ctx.moveTo(columnPosition - halfHeight, rowPosition - halfHeight);
    ctx.lineTo(columnPosition - height, rowPosition);
    ctx.lineTo(columnPosition, rowPosition + height);
    ctx.lineTo(columnPosition + halfHeight, rowPosition + halfHeight);
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
    ctx.lineTo(columnPosition - halfHeight, rowPosition  + width - halfHeight);
    ctx.lineTo(columnPosition, rowPosition  + width);
    ctx.lineTo(columnPosition + height, rowPosition + height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  };
  
  // and we can leave the drawing of some tiles to later rows and columns
  // we are drawing the pattern blocks from left to right and top to bottom
  // Loop through the pattern block rows
  //   const a = 60;
  //   const b = 120;
  const canvas = document.getElementById("herringbone");
  canvas.height = 250;
  canvas.width = 1600;
  const ctx = canvas.getContext("2d");
  const h = 50 * Math.sqrt(2);
  const w = h * 2;
  const h2 = h / 2; // How far tile 1 sticks out to the left of the pattern block
  // Set a universal stroke colour and width
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  
  for (var y = 0, i=0; y < canvas.height + w; y += w, i++) {
    // Loop through the pattern block columns
    for (var x = 0, j=0; x < canvas.width + h; x += h, j++) {
      // Draw tile "3"
      console.log(x,y);
      tile(ctx, x, y, h, i%2===0 && (j >4 && j  <8  || j >10 && j  <12 )? 'blue': 'red')
      tileReflective(ctx, x, y, h , i%2===0? 'green': 'white')
  
    }
  }
  