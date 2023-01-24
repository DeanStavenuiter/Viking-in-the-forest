const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
let gameOver = false;
let animateId;

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

//function create image
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

//random number function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
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

//object class
class Objects {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: getRandomInt(0, -3),
      y: 0,
    };
    this.image = image;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

//monster class
class Monsters {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

//create background
let backgroundGame = new Background({
  position: {
    x: 0,
    y: -517,
  },
  imgSrc: "/img//level 1 img/background.png",
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
let imgChar = 1;
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
//door
const door = createImage("/img/level 1 img/door-closed.png");

//clouds
const cloud1 = createImage("img/clouds/cloud_shape2_1.png");
const cloud2 = createImage("img/clouds/cloud_shape2_2.png");
const cloud3 = createImage("img/clouds/cloud_shape2_3.png");
const cloud4 = createImage("img/clouds/cloud_shape2_4.png");
const cloud5 = createImage("img/clouds/cloud_shape3_1.png");
const cloud6 = createImage("img/clouds/cloud_shape3_2.png");
const cloud7 = createImage("img/clouds/cloud_shape3_3.png");
const cloud8 = createImage("img/clouds/cloud_shape3_4.png");
const cloud9 = createImage("img/clouds/cloud_shape3_5.png");
const cloud10 = createImage("img/clouds/cloud_shape4_1.png");
const cloud11 = createImage("img/clouds/cloud_shape4_2.png");
const cloud12 = createImage("img/clouds/cloud_shape4_3.png");
const cloud13 = createImage("img/clouds/cloud_shape4_4.png");
const cloud14 = createImage("img/clouds/cloud_shape4_5.png");
const cloud15 = createImage("img/clouds/cloud_shape6_1.png");
const cloud16 = createImage("img/clouds/cloud_shape6_2.png");
const cloud17 = createImage("img/clouds/cloud_shape6_3.png");
const cloud18 = createImage("img/clouds/cloud_shape6_4.png");
const cloud19 = createImage("img/clouds/cloud_shape6_5.png");

let clouds = [
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud1),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud2),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud3),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud4),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud5),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud6),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud7),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud8),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud9),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud10),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud11),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud12),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud13),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud14),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud15),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud16),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud17),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud18),
  new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud19),
];

//array of platforms
let bigPlatforms = [
  new Platform(0, 453, 444, 128, highPlatformBig),
  new Platform(581, 453, 444, 128, highPlatformBig),
  new Platform(1344, 389, 327, 192, higherPlatformSmall),
  new Platform(1153, 453, 319, 128, highPlatformSmall),
  new Platform(1724, 453, 444, 128, highPlatformBig),
  new Platform(2296, 325, 34, 64, floatingSingleBlock),
  new Platform(2424, 261, 34, 64, floatingSingleBlock),
  new Platform(2552, 453, 34, 64, floatingSingleBlock),
  new Platform(2680, 325, 34, 64, floatingSingleBlock),
  new Platform(2808, 453, 444, 128, highPlatformBig),
  new Platform(3316, 325, 34, 64, floatingSingleBlock),
  new Platform(3444, 133, 34, 64, floatingSingleBlock),
  new Platform(3732, 453, 192, 64, floatingPlatform),
  new Platform(3850, 382, 64, 64, door),
];

//monsters
const monster1Image = createImage("/img/animations/monster1/monsterleft1.png");

let monsters = [
  new Monsters(600, 330, 120, 120, monster1Image),
  new Monsters(700, 330, 120, 120, monster1Image),
];

//reset function for when you die
function reset() {
  
  player = new Player(
    {
      x: 0,
      y: 0,
    },
    knightImg
  );

  
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
    new Platform(3700, 453, 192, 64, floatingPlatform),
    new Platform(3850, 382, 64, 64, door),
  ];

  clouds = [
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud1),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud2),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud3),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud4),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud5),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud6),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud7),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud8),
    new Objects(getRandomInt(0, 3778), getRandomInt(0, 200), 3778, 308, cloud9),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud10
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud11
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud12
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud13
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud14
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud15
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud16
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud17
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud18
    ),
    new Objects(
      getRandomInt(0, 3778),
      getRandomInt(0, 200),
      3778,
      308,
      cloud19

    ),
  ];
    monsters = [
        new Monsters(600, 330, 120, 120, monster1Image),
        new Monsters(700, 330, 120, 120, monster1Image),
      ];
  scrollOfset = 0;
}

//array of hearts
const heartImg = createImage("/img/level 1 img/heart.png");
let totalHearts = 3;
let hearts = [
  new Hearts(850, 10, 30, 30, heartImg),
  new Hearts(900, 10, 30, 30, heartImg),
  new Hearts(950, 10, 30, 30, heartImg),
];

//animation settings
let scrollOfset = 0;
let idleRight = 1;
let idleLeft = 1;
let runRight = 1;
let runLeft = 1;
let jumpRight = 1;
let jumpLeft = 1;
let monster1 = 1;
let monster1WasRight = true;
let monster1WasLeft = true;

//animate function
function animate() {
  animateId = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //background
  backgroundGame.update();

  //clouds
  clouds.forEach((cloudImg) => {
    cloudImg.draw();
    cloudImg.update();
  });

  //platforms
  bigPlatforms.forEach((platform) => {
    platform.draw();
  });

  //hearts
  hearts.forEach((heart) => {
    heart.draw();
  });

  //monsters
  monsters.forEach((monster) => {
    monster.draw();

    //monster moving left
    if (monster1WasRight) {
      monster1Image.src = "/img/animations/monster1/monsterleft1.png";
      if (animateId % 20 === 0) {
        monster1 += 1;
        if (monster1 > 6) {
          monster1 = 1;
        }
      }
      monster1Image.src =
        "/img/animations/monster1/monsterleft" + monster1 + ".png";
    }

    //monster moving right
    if (monster1WasLeft) {
      monster1Image.src = "/img/animations/monster1/monsterright1.png";
      if (animateId % 20 === 0) {
        monster1 += 1;
        if (monster1 > 6) {
          monster1 = 1;
        }
      }
      monster1Image.src =
        "/img/animations/monster1/monsterright" + monster1 + ".png";
    }
  });

  //players
  player.update();

  //idle right
  if (isNotMoving && wasRight) {
    knightImg.src = "/img/animations/knight/idle/idleright1.png";
    if (animateId % 10 === 0) {
      idleRight += 1;
      if (idleRight > 12) {
        idleRight = 1;
      }
    }
    knightImg.src =
      "/img/animations/knight/idle/idleright" + idleRight + ".png";
  }

  //idle left
  if (isNotMoving && wasLeft) {
    knightImg.src = "/img/animations/knight/idle/idleleft1.png";
    if (animateId % 10 === 0) {
      idleLeft += 1;
      if (idleLeft > 12) {
        idleLeft = 1;
      }
    }
    knightImg.src = "/img/animations/knight/idle/idleleft" + idleLeft + ".png";
  }

  //run right
  if (
    (keys.d.pressed && isMovingRight) ||
    (keys.arrowRight.pressed && isMovingRight)
  ) {
    knightImg.src = "/img/animations/knight/walk/walkright1.png";
    if (animateId % 10 === 0) {
      runRight += 1;
      if (runRight === 6) {
        runRight = 1;
      }
    }
    knightImg.src = "/img/animations/knight/walk/walkright" + runRight + ".png";
  }

  //run left
  if (
    (keys.a.pressed && isMovingLeft) ||
    (keys.arrowLeft.pressed && isMovingLeft)
  ) {
    knightImg.src = "/img/animations/knight/walk/walkleft1.png";
    if (animateId % 10 === 0) {
      runLeft += 1;
      if (runLeft === 6) {
        runLeft = 1;
      }
    }
    knightImg.src = "/img/animations/knight/walk/walkleft" + runLeft + ".png";
  }

  //jump right
  if (
    (wasRight && isMovingUp) ||
    (wasRight && isMovingUp && keys.d.pressed) ||
    (wasRight && isMovingUp && keys.arrowRight.pressed)
  ) {
    knightImg.src = "/img/animations/knight/jump/jumpright1.png.png";
    if (animateId % 10 === 0) {
      jumpRight += 1;
      if (jumpRight === 7) {
        jumpRight = 1;
      }
    }
    knightImg.src =
      "/img/animations/knight/jump/jumpright" + jumpRight + ".png";
  }

  //jump left
  if (
    (wasLeft && isMovingUp) ||
    (wasLeft && isMovingUp && keys.a.pressed) ||
    (wasLeft && isMovingUp && keys.arrowLeft.pressed)
  ) {
    knightImg.src = "/img/animations/knight/jump/jumpleft1.png.png";
    if (animateId % 10 === 0) {
      jumpLeft += 1;
      if (jumpLeft === 7) {
        jumpLeft = 1;
      }
    }
    knightImg.src = "/img/animations/knight/jump/jumpleft" + jumpLeft + ".png";
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

      monsters.forEach(monster => {
        monster.position.x -=2
      })

      bigPlatforms.forEach((platform) => {
        platform.position.x -= 2;
      });
    } else if (keys.a.pressed || keys.arrowLeft.pressed) {
      scrollOfset -= 2;


      monsters.forEach(monster => {
        monster.position.x +=2
      })

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
    if (totalHearts === 0) {
      gameOver = true;
    }
  }

  //big platform collision detection
  bigPlatforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x - 20 &&
      player.position.x <= platform.position.x - 30 + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

animate();
//movement tracker
window.addEventListener("keydown", (event) => {
  switch (event.key) {
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
  isMovingUp = false;
  isMovingDown = false;
  isNotMoving = true;

  switch (event.key) {
    case "d": //right
      keys.d.pressed = false;
      isMovingRight = false;
      wasRight = true;
      wasLeft = false;
      break;
    case "a": //left
      keys.a.pressed = false;
      isMovingLeft = false;
      wasRight = false;
      wasLeft = true;
      break;
    case "w": //up
      keys.w.pressed = false;
      isMovingUp = false;
      break;
    case "ArrowRight": //right
      keys.arrowRight.pressed = false;
      isMovingRight = false;
      wasRight = true;
      wasLeft = false;
      break;
    case "ArrowLeft": //left
      keys.arrowLeft.pressed = false;
      isMovingLeft = false;
      wasRight = false;
      wasLeft = true;
      break;
    case "ArrowUp": //up
      keys.arrowUp.pressed = false;
      isMovingUp = false;
  }
});

console.log(`was left: ${wasLeft}`);
console.log(`was right: ${wasRight}`);
