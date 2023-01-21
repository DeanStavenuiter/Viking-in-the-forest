const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;

class Background {
  constructor({ position, imgSrc }) {
    this.position = position;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  draw() {
    if (!this.img) return;
    ctx.drawImage(this.img, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

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

    //check for the ground
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
// platform
class Platform {
  constructor() {
    this.position = {
      x: 0,
      y: 512,
    };

    (this.width = 380), (this.height = 64);

    // this.image = image
  }

  draw() {
    // ctx.drawImage(this.image, this.position.x, this.position.y)
    ctx.fillStyle = "red";
    ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//small platform
class PlatformSmall {
  constructor() {
    this.position = {
      x: 444,
      y: 448,
    };

    (this.width = 192), (this.height = 64);

    // this.image = image
  }

  draw() {
    // ctx.drawImage(this.image, this.position.x, this.position.y)
    ctx.fillStyle = "red";
    ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//create a player with his starting positions
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

const backgroundGame = new Background({
  position: {
    x: 0,
    y: -576,
  },
  imgSrc: "/img/level 1 img/background.png",
});

const bigPlatform = new Platform();

const platformSmall1 = new PlatformSmall();
const platformSmall2 = new PlatformSmall();

//animate function
function animate() {
  window.requestAnimationFrame(animate);

  //background
  backgroundGame.update();

  //player
  platformSmall1.draw();
  platformSmall2.draw();
  bigPlatform.draw();

  player.update();
  //speed of moving left and right
  player.velocity.x = 0;
  if (keys.d.pressed || keys.arrowRight.pressed) {
    player.velocity.x = 2;
  } else if (keys.a.pressed || keys.arrowLeft.pressed) {
    player.velocity.x = -2;
  }

  //big platform collision detection
  if (
    player.position.y + player.height <= bigPlatform.position.y &&
    player.position.y + player.height + player.velocity.y >= bigPlatform.position.y &&
    // player.position.x + player.width >= bigPlatform.position.x &&
    player.position.x  <= bigPlatform.position.x + bigPlatform.width
  ) {
    player.velocity.y = 0;
  }
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
    case "ArrowRight": //right
      keys.arrowRight.pressed = false;
      break;
    case "ArrowLeft": //left
      keys.arrowLeft.pressed = false;
      break;
  }
});
