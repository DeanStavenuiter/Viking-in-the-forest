const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const gameOver = false;
let animateId;

//function create image
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

//background class
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

//hearts class
class Hearts {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };

    this.width = width;
    this.height = height;

    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

//player class
class Player {
  constructor(position, image) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 104;
    this.width = 64;
    this.image = image;
  }
  //draw player
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //check for the ground
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
  }
}

// platform
class Platform {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };

    this.width = width;
    this.height = height;

    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Objects {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

//create background
let backgroundGame = new Background({
  position: {
    x: 0,
    y: -576,
  },
  imgSrc: "/img/level 1 img/background.png",
});

//create a player with his starting positions
const knightImg = createImage("/img/animations/knight/knight right.png");
let player = new Player(
  {
    x: 0,
    y: 300,
  },
  knightImg
);

//player settings
let isMovingRight = false;
let isMovingLeft = false;
let isMovingUp = false;
let isMovingDown = false;
let isNotMoving = true;
let wasRight = true;
let wasLeft = false;
let imgChar = 1
// let damage = false;

//big platforms
const highPlatformBig = createImage("/img/level 1 img/highBigPlatform.png");

//high platform small
const highPlatformSmall = createImage("/img/level 1 img/highSmallPlatform.png");

//higher platform small
const higherPlatformSmall = createImage(
  "/img/level 1 img/higherSmallPlatform.png"
);

//floating platform
const floatingPlatform = createImage("/img/level 1 img/floating-platform.png");

//floating single block
const floatingSingleBlock = createImage(
  "img/level 1 img/single-floating-block.png"
);

//array of platforms
let bigPlatforms = [
  new Platform(0, 453, 444, 128, highPlatformBig),
  new Platform(581, 453, 444, 128, highPlatformBig),
  new Platform(1344, 389, 327, 192, higherPlatformSmall),
  new Platform(1153, 453, 319, 128, highPlatformSmall),
  new Platform(1724, 453, 444, 128, highPlatformBig),
  new Platform(2296, 325, 64, 64, floatingSingleBlock),
  new Platform(2424, 261, 64, 64, floatingSingleBlock),
  new Platform(2552, 453, 64, 64, floatingSingleBlock),
  new Platform(2680, 325, 64, 64, floatingSingleBlock),
  new Platform(2808, 453, 444, 128, highPlatformBig),
  new Platform(3316, 325, 64, 64, floatingSingleBlock),
  new Platform(3444, 133, 64, 64, floatingSingleBlock),
  new Platform(3316, 0, 64, 64, floatingSingleBlock),
  // new Platform(3444, 133, 64, 64, floatingSingleBlock),
  // new Platform(3316, 69, 64, 64, floatingSingleBlock),
  // new Platform(3444, 5, 64, 64, floatingSingleBlock),
  // new Platform(3572, 69, 64, 64, floatingSingleBlock),
  new Platform(3700, 453, 192, 64, floatingPlatform),
];

function reset() {
  //create background
  backgroundGame = new Background({
    position: {
      x: 0,
      y: -576,
    },
    imgSrc: "/img/level 1 img/background.png",
  });

  //create a player with his starting positions
  player = new Player(
    {
      x: 0,
      y: 0,
    },
    knightImg
  );

  //array of platforms
  bigPlatforms = [
    new Platform(0, 453, 444, 128, highPlatformBig),
    new Platform(581, 453, 444, 128, highPlatformBig),
    new Platform(1344, 389, 327, 192, higherPlatformSmall),
    new Platform(1153, 453, 319, 128, highPlatformSmall),
    new Platform(1724, 453, 444, 128, highPlatformBig),
    new Platform(2296, 325, 64, 64, floatingSingleBlock),
    new Platform(2424, 261, 64, 64, floatingSingleBlock),
    new Platform(2552, 453, 64, 64, floatingSingleBlock),
    new Platform(2680, 325, 64, 64, floatingSingleBlock),
    new Platform(2808, 453, 444, 128, highPlatformBig),
    new Platform(3316, 325, 64, 64, floatingSingleBlock),
    new Platform(3444, 133, 64, 64, floatingSingleBlock),
    new Platform(3316, 0, 64, 64, floatingSingleBlock),
    // new Platform(3444, 133, 64, 64, floatingSingleBlock),
    // new Platform(3316, 69, 64, 64, floatingSingleBlock),
    // new Platform(3444, 5, 64, 64, floatingSingleBlock),
    // new Platform(3572, 69, 64, 64, floatingSingleBlock),
    new Platform(3700, 453, 192, 64, floatingPlatform),
  ];

  scrollOfset = 0;
}

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

//array of hearts
const heartImg = createImage("/img/level 1 img/heart.png");
let totalHearts = 3;
let hearts = [
  new Hearts(850, 10, 30, 30, heartImg),
  new Hearts(900, 10, 30, 30, heartImg),
  new Hearts(950, 10, 30, 30, heartImg),
];

//checks for the end of the game
let scrollOfset = 0;

//animate function
function animate() {
  animateId = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //background
  backgroundGame.update();

  //platforms
  bigPlatforms.forEach((platform) => {
    platform.draw();
  });

  //hearts
  hearts.forEach((heart) => {
    heart.draw();
  });
  //players
  player.update();

  //idle right
  if (wasRight && isNotMoving) {
    // knightImg.src = "/img/animations/knight/idle/idleright1.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar > 12) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/idle/idleright" + imgChar + ".png";
  }

  //idle left
  if (wasLeft && isNotMoving) {
    knightImg.src = "/img/animations/knight/idle/idleleft1.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar > 12) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/idle/idleleft" + imgChar + ".png";
  }

  //run right
  if (isMovingRight) {
    knightImg.src = "/img/animations/knight/walk/walkright1.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar === 6) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/walk/walkright" + imgChar + ".png";
  }

  //run left
  if (isMovingLeft) {
    knightImg.src = "/img/animations/knight/walk/walkleft1.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar === 6) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/walk/walkleft" + imgChar + ".png";
  }

  //jump right
  if (wasRight && isMovingUp) {
    knightImg.src = "/img/animations/knight/jump/jumpright1.png.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar === 7) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/jump/jumpright" + imgChar + ".png";
  }

  //jump left
  if (wasRight && isMovingUp) {
    // knightImg.src = "/img/animations/knight/jump/jumpright1.png.png";
    if (animateId % 10 === 0) {
      imgChar += 1;
      if (imgChar === 7) {
        imgChar = 1;
      }
    }
    knightImg.src = "/img/animations/knight/jump/jumpright" + imgChar + ".png";
  }

  //speed of moving left and right
  player.velocity.x = 0;
  if (
    (keys.d.pressed && player.position.x < 500) ||
    (keys.arrowRight.pressed && player.position.x < 500)
  ) {
    player.velocity.x = 2;
  } else if (
    (keys.a.pressed && player.position.x > 100) ||
    (keys.arrowLeft.pressed && player.position.x > 100)
  ) {
    player.velocity.x = -2;
  } else {
    player.velocity.x = 0;

    //moving background
    if (keys.d.pressed || keys.arrowRight.pressed) {
      scrollOfset += 2;

      bigPlatforms.forEach((platform) => {
        platform.position.x -= 2;
      });
    } else if (keys.a.pressed || keys.arrowLeft.pressed) {
      scrollOfset -= 2;

      bigPlatforms.forEach((platform) => {
        platform.position.x += 2;
      });
    }

    //win scenario
    if (scrollOfset > 2000) {
      console.log("you win");
    }
    //lose scenario

    if (player.position.y > canvas.height) {
      totalHearts -= 1;
      hearts.pop();
      reset();
      console.log(totalHearts);
      console.log("you loose");
    }
    if (totalHearts === 0){
      gameOver = true
    }
  }

  //big platform collision detection
  bigPlatforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x - 50 + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

animate();
//movement tracker
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // console.log(event);
    case "d": //right
      keys.d.pressed = true;
      isMovingRight = true;
      isNotMoving = false;
      wasRight = true;
      wasLeft = false;
      break;
    case "a": //left
      keys.a.pressed = true;
      isMovingLeft = true;
      isNotMoving = false;
      wasRight = false;
      wasLeft = true;
      break;
    case "w": //up
      if (player.velocity.y < 3) {
        player.velocity.y = -15;
      }
      isMovingUp = true;
      break;
    case "ArrowRight": //right
      keys.arrowRight.pressed = true;
      isMovingRight = true;
      isNotMoving = false;
      wasRight = true;
      wasLeft = false;
      break;
    case "ArrowLeft": //left
      keys.arrowLeft.pressed = true;
      isMovingLeft = true;
      isNotMoving = false;
      wasRight = false;
      wasLeft = true;
      break;
    case "ArrowUp": //up
      if (player.velocity.y < 3) {
        player.velocity.y = -15;
      }
      isMovingUp = true;
      break;
  }
  console.log(`was left: ${wasLeft}`);
  console.log(`was right: ${wasRight}`);
});

window.addEventListener("keyup", (event) => {
  isMovingLeft = false;
  isMovingRight = false;
  isMovingUp = false;
  isMovingDown = false;
  isNotMoving = true;

  switch (event.key) {
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

console.log(`was left: ${wasLeft}`);
console.log(`was right: ${wasRight}`);
