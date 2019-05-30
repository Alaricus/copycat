import levels from './levels.js';

document.onload = (() => {
  const field = document.querySelector('pre');
  const title = document.querySelector('span');
  const ascii = [' ', '▓', '▓\n', '3', '4', '5', '6', 'ᵜ', 'ᴥ', '֎'];
  let currentLevel = 0;

  const drawMap = (level) => {
    if (currentLevel >= levels.length) {
      field.textContent = 'Game Over\nYou Won!';
      return;
    }

    title.textContent = currentLevel + 1;
    const map = levels[level].map;
    const avatar0 = levels[level].avatars[0];
    const avatar1 = levels[level].avatars[1];

    field.textContent = '';
    map.forEach((row, indexR) => {
      row.forEach((tile, indexT) => {
        if (avatar0.x === indexT && avatar0.y === indexR) {
          field.textContent += ascii[8];
        } else if (avatar1.x === indexT && avatar1.y === indexR) {
          field.textContent += ascii[7];
        } else {
          field.textContent += ascii[tile];
        }
      });
    });
  };

  const keys = {
    38: { x: 0, y: -1 },
    39: { x: 1, y: 0 },
    40: { x: 0, y: 1 },
    37: { x: -1, y: 0 },
  };

  const move = (key) => {
    levels[currentLevel].avatars.forEach((avatar) => {
      const next = levels[currentLevel].map[avatar.y + keys[key].y][avatar.x + keys[key].x];
      if (next === 0 || next === 9) {
        avatar.y += keys[key].y;
        avatar.x += keys[key].x;
      }
    });

    const level = levels[currentLevel];
    const avatar0 = level.avatars[0];
    const avatar1 = level.avatars[1];
    if (level.map[avatar0.y][avatar0.x] === 9 && level.map[avatar1.y][avatar1.x] === 9) {
      currentLevel += 1;
      return;
    }
    if (currentLevel === 0 && level.map[avatar0.y][avatar0.x] === 9) {
      currentLevel += 1;
    }
  };

  window.addEventListener('keydown', (e) => {
    if (currentLevel < levels.length) {
      move(e.keyCode);
      drawMap(currentLevel);
    }
  }, false);

  drawMap(currentLevel);
})();
