const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;

//player settings
class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 50;
  }
//draw player
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
const player = new Player({
  x: 0,
  y: 0,
});
//keys
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
};

//animate function
function animate() {
  window.requestAnimationFrame(animate);

  //background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //player
  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed || keys.arrowRight.pressed) player.velocity.x = 1;
  else if (keys.a.pressed || keys.arrowLeft.pressed) player.velocity.x = -1;
}

animate();
//movement tracker
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // console.log(event);
    case "d": //right
      keys.d.pressed = true;
      break;
    case "a": //left
      keys.a.pressed = true;
      break;
    case "w": //up
      player.velocity.y = -15;
      break;
    case "ArrowRight": //right
      keys.arrowRight.pressed = true;
      break;
    case "ArrowLeft": //left
      keys.arrowLeft.pressed = true;
      break;
    case "ArrowUp": //up
      player.velocity.y = -15;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // console.log(event);
    case "d": //right
      keys.d.pressed = false;
      break;
    case "a": //left
      keys.a.pressed = false;
      break;
    case "w": //up
    case "ArrowRight": //right
      keys.arrowRight.pressed = false;
      break;
    case "ArrowLeft": //left
      keys.arrowLeft.pressed = false;
      break;
  }
});
