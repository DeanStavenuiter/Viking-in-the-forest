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

//animate function
function animate() {
  window.requestAnimationFrame(animate);

  //background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //player
  player.update();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // console.log(event);
    case "d":
      player.velocity.x = 2;
      break;
    case "a":
      player.velocity.x = -2;
      break;
    case "w":
      player.velocity.y = -15;
      break;
    case "ArrowRight":
      player.velocity.x = 2;
      break;
    case "ArrowLeft":
      player.velocity.x = -2;
      break;
    case "ArrowUp":
      player.velocity.y = -15;
      break;
  }
});
