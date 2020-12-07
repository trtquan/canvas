selectedTile = (name) => {
  return document.querySelectorAll(`.${name}`);
};

setTileColorChange = (event) => {
  selectedTile("red").forEach((element) => {
    element.style.fill = event.target.value;
  });
  for (var y = 0, i = 0; y < canvas.height + h; y += h, i++) {
    // Loop through the pattern block columns
    for (var x = 0; x < canvas.width + w; x += w) {
      // Draw tile "3"
      console.log(x, y);
      // tile(ctx, x, y, h, i%2===0? 'blue': 'blue')
      tileCurve(ctx, x, y, h, event.target.value);
      // tileReflectiveCurve(ctx, x, y, h , i%2===0? 'green': 'yellow')
    }
  }
};
setTileReflectiveColorChange = (event) => {
  selectedTile("green").forEach((element) => {
    element.style.fill = event.target.value;
  });
  const tileColor = document.getElementById('head').value
  for (var y = 0, i = 0; y < canvas.height + h; y += h, i++) {
    // Loop through the pattern block columns
    for (var x = 0; x < canvas.width + w; x += w) {
      // Draw tile "3"
      console.log(x, y);
      // tile(ctx, x, y, h, i%2===0? 'blue': 'blue')
      tileReflective(ctx, x, y, h, event.target.value);
      tileCurve(ctx, x, y, h, tileColor);
      // tileReflectiveCurve(ctx, x, y, h , i%2===0? 'green': 'yellow')
    }
  }
};
