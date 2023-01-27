const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
let gameOver = false;
let animateId;
let score = 0;
let gameOverText = "GAME OVER";

const stepsAudio = new Audio("/sounds/steps.wav");
stepsAudio.volume = 0.1;
const forestAudio = new Audio("/sounds/forest.wav");
forestAudio.volume = 0.2;
const attackAudio = new Audio("/sounds/attack.wav");

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
  Space: {
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

// platform class
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

let turn = false;
//monster class
class Monsters {
  constructor(x, y, width, height, image, turnRight, turnLeft) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 1,
      y: 0,
    };
    this.image = image;
    this.width = width;
    this.height = height;
    this.turnRight = turnRight;
    this.turnLeft = turnLeft;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    if (this.position.x < this.turnRight) {
      turn = true;
      monster1WasLeft = true;
      monster1WasRight = false;
    }
    if (this.position.x > this.turnLeft) {
      turn = false;
      monster1WasRight = true;
      monster1WasLeft = false;
    }
    if (!turn) {
      this.position.x -= this.velocity.x;
    } else {
      this.position.x += this.velocity.x;
    }
  }
}

// coin class
class Coins {
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

//chest class
class Chests {
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

//create a player with his starting positions
const knightImg = createImage("images/animations/knight/knight right.png");
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
const highPlatformBig = createImage("images/level 1 img/highBigPlatform.png");

//high platform small
const highPlatformSmall = createImage(
  "images/level 1 img/highSmallPlatform.png"
);

//higher platform small
const higherPlatformSmall = createImage(
  "images/level 1 img/higherSmallPlatform.png"
);

//floating platform
const floatingPlatform = createImage(
  "images/level 1 img/floating-platform.png"
);

//floating single block
const floatingSingleBlock = createImage(
  "images/level 1 img/single-floating-block.png"
);
//door
const door = createImage("images/level 1 img/door-closed.png");

//clouds
const cloud1 = createImage("images/clouds/cloud_shape2_1.png");
const cloud2 = createImage("images/clouds/cloud_shape2_2.png");
const cloud3 = createImage("images/clouds/cloud_shape2_3.png");
const cloud4 = createImage("images/clouds/cloud_shape2_4.png");
const cloud5 = createImage("images/clouds/cloud_shape3_1.png");
const cloud6 = createImage("images/clouds/cloud_shape3_2.png");
const cloud7 = createImage("images/clouds/cloud_shape3_3.png");
const cloud8 = createImage("images/clouds/cloud_shape3_4.png");
const cloud9 = createImage("images/clouds/cloud_shape3_5.png");
const cloud10 = createImage("images/clouds/cloud_shape4_1.png");
const cloud11 = createImage("images/clouds/cloud_shape4_2.png");
const cloud12 = createImage("images/clouds/cloud_shape4_3.png");
const cloud13 = createImage("images/clouds/cloud_shape4_4.png");
const cloud14 = createImage("images/clouds/cloud_shape4_5.png");
const cloud15 = createImage("images/clouds/cloud_shape6_1.png");
const cloud16 = createImage("images/clouds/cloud_shape6_2.png");
const cloud17 = createImage("images/clouds/cloud_shape6_3.png");
const cloud18 = createImage("images/clouds/cloud_shape6_4.png");
const cloud19 = createImage("images/clouds/cloud_shape6_5.png");

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
  new Platform(-192, 453, 444, 128, floatingSingleBlock),
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
  new Platform(3732, 453, 192, 64, floatingPlatform),
  new Platform(3924, 453, 444, 128, highPlatformBig),
  new Platform(4496, 453, 444, 128, highPlatformBig),
  new Platform(5068, 325, 64, 64, floatingSingleBlock),
  new Platform(5196, 197, 64, 64, floatingSingleBlock),
  new Platform(5324, 325, 64, 64, floatingSingleBlock),
  new Platform(5452, 453, 444, 128, highPlatformBig),
  new Platform(6024, 453, 444, 128, highPlatformBig),
  // new Platform(3850, 382, 64, 64, door),
];

//monsters
const monster1Image = createImage(
  "images/animations/monster1/monsterleft1.png"
);

let monsters = [
  new Monsters(600, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(900, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(1200, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(1500, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(1800, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(2100, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(2300, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(2700, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(2900, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(3000, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(4000, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(4200, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(4500, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(4600, 330, 64, 64, monster1Image, 0, 2000),
  new Monsters(4800, 330, 64, 64, monster1Image, 0, 2000),
];

//coins
const coinsImage = createImage("images/animations/Slice1.png");

let coin = [
  new Coins(120, 415, 25, 25, coinsImage),
  new Coins(140, 415, 25, 25, coinsImage),
  new Coins(160, 415, 25, 25, coinsImage),
  new Coins(803, 415, 25, 25, coinsImage),
  new Coins(823, 415, 25, 25, coinsImage),
  new Coins(843, 415, 25, 25, coinsImage),
  new Coins(2689, 266, 25, 25, coinsImage),
  new Coins(3030, 415, 25, 25, coinsImage),
  new Coins(3050, 415, 25, 25, coinsImage),
  new Coins(3070, 415, 25, 25, coinsImage),
];

let totalCoins = new Coins(10, 15, 25, 25, coinsImage);

//chests
const chestImg = createImage("images/level 1 img/chest_closed.png");
const batmanImg = createImage("images/level 1 img/batman.png");

let chests = [new Chests(6400, 407, 64, 64, chestImg)];

let batman = new Chests(-256, 407, 64, 64, batmanImg);

//reset function for when you die
function reset() {
  player = new Player(
    {
      x: 0,
      y: 0,
    },
    knightImg
  );
  score = 0;
  //reset function
  bigPlatforms = [
    new Platform(-192, 453, 444, 128, floatingSingleBlock),
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
    new Platform(3732, 453, 192, 64, floatingPlatform),
    new Platform(3924, 453, 444, 128, highPlatformBig),
    new Platform(4496, 453, 444, 128, highPlatformBig),
    new Platform(5068, 325, 64, 64, floatingSingleBlock),
    new Platform(5196, 197, 64, 64, floatingSingleBlock),
    new Platform(5324, 325, 64, 64, floatingSingleBlock),
    new Platform(5452, 453, 444, 128, highPlatformBig),
    new Platform(6024, 453, 444, 128, highPlatformBig),
  ];
  //reset function
  chests = [new Chests(6400, 407, 64, 64, chestImg)];

  batman = new Chests(-256, 407, 64, 64, batmanImg);

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
  //reset function
  monsters = [
    new Monsters(600, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(900, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(1200, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(1500, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(1800, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(2100, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(2300, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(2700, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(2900, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(3000, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(4000, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(4200, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(4500, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(4600, 330, 64, 64, monster1Image, 0, 2000),
    new Monsters(4800, 330, 64, 64, monster1Image, 0, 2000),
  ];
  //reset function
  coin = [
    new Coins(120, 415, 25, 25, coinsImage),
    new Coins(140, 415, 25, 25, coinsImage),
    new Coins(160, 415, 25, 25, coinsImage),
    new Coins(795, 415, 25, 25, coinsImage),
    new Coins(815, 415, 25, 25, coinsImage),
    new Coins(833, 415, 25, 25, coinsImage),
    new Coins(2689, 266, 25, 25, coinsImage),
    new Coins(3030, 415, 25, 25, coinsImage),
    new Coins(3050, 415, 25, 25, coinsImage),
    new Coins(3070, 415, 25, 25, coinsImage),
    new Coins(4030, 415, 25, 25, coinsImage),
    new Coins(4050, 415, 25, 25, coinsImage),
    new Coins(4070, 415, 25, 25, coinsImage),
  ];
  //reset function
  totalCoins = new Coins(10, 15, 25, 25, coinsImage);

  BgLayers = [
    new StartBg(-1017, -302, 1028, 0, bg10, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg9, -517, -250, 0.2),
    new StartBg(-1017, -302, 1028, 0, bg11, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg12, -517, -250, 0.2),
    new StartBg(-1017, -302, 1028, 0, bg6, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg5, -517, -250, 0.2),
    new StartBg(-1017, -302, 1028, 0, bg4, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg3, -517, -250, 0.2),
    new StartBg(-1017, -302, 1028, 0, bg2, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg7, -517, -250, 0.2),
    new StartBg(-1017, -302, 1028, 0, bg1, -517, -250, 0.1),
    new StartBg(-1017, -302, 1028, 0, bg8, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg10, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg9, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg11, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg12, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg6, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg5, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg4, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg3, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg2, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg7, -517, -250, 0.2),
    new StartBg(-2034, -302, 1028, 0, bg1, -517, -250, 0.1),
    new StartBg(-2034, -302, 1028, 0, bg8, -517, -250, 0.2),
  ];
  // totalCoins = new Coins(10, 15, 25, 25, coinsImage);

  scrollOfset = 0;
  //reset function finished
}

//hearts
const heartImg = createImage("images/level 1 img/heart.png");
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
let attackImg = 1;
let jumpRight = 1;
let jumpLeft = 1;
let monster1 = 1;
let monster1WasRight = true;
let monster1WasLeft = false;
let attack = false;
let coins = 1;

//animate function
function animate() {
  cancelAnimationFrame(animateId);
  animateId = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.querySelector(".sounds").addEventListener("click", () => {
    forestAudio.play();
    forestAudio.loop;
  });

  BgLayers.forEach((layer) => {
    if (layer.x > 300) {
      layer.x = -1017;
    }

    layer.draw();
    layer.update();
  });

  //score
  ctx.font = "15px VT323";
  ctx.fillStyle = "white";
  ctx.fillText(score, 37, 33);

  //chests
  chests.forEach((chest) => {
    chest.draw();
  });

  batman.draw();
  //clouds
  clouds.forEach((cloudImg) => {
    cloudImg.draw();
    cloudImg.update();
    if (cloudImg.position.x < -250) {
      (cloudImg.position.x = getRandomInt(1500, 3778)),
        (cloudImg.position.y = getRandomInt(0, 200));
    }
  });

  //platforms
  bigPlatforms.forEach((platform) => {
    platform.draw();
  });

  //hearts
  hearts.forEach((heart) => {
    heart.draw();
  });

  //coins
  totalCoins.draw();

  coin.forEach((coin) => {
    coin.draw();
    coin.update();
    coinsImage.src = "images/animations/Slice0.png";
    if (animateId % 20 === 0) {
      coins += 1;
      if (coins > 13) {
        coins = 1;
      }
    }
    coinsImage.src = "images/animations/Slice" + coins + ".png";
  });

  //monsters
  monsters.forEach((monster) => {
    monster.draw();
    monster.update();

    //monster moving left
    if (monster1WasRight) {
      monster1Image.src = "images/animations/monster1/monsterleft1.png";
      if (animateId % 20 === 0) {
        monster1 += 1;
        if (monster1 > 6) {
          monster1 = 1;
        }
      }
      monster1Image.src =
        "images/animations/monster1/monsterleft" + monster1 + ".png";
      monster1WasLeft = false;
    }

    //monster moving right
    if (monster1WasLeft) {
      monster1Image.src = "images/animations/monster1/monsterright1.png";
      if (animateId % 20 === 0) {
        monster1 += 1;
        if (monster1 > 6) {
          monster1 = 1;
        }
      }
      monster1Image.src =
        "images/animations/monster1/monsterright" + monster1 + ".png";
      monster1WasRight = false;
    }
  });

  //players
  player.update();

  //idle right
  if (isNotMoving && wasRight) {
    knightImg.src = "images/animations/knight/idle/idleright1.png";
    if (animateId % 10 === 0) {
      idleRight += 1;
      if (idleRight > 12) {
        idleRight = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/idle/idleright" + idleRight + ".png";
  }

  //idle left
  if (isNotMoving && wasLeft) {
    knightImg.src = "images/animations/knight/idle/idleleft1.png";
    if (animateId % 10 === 0) {
      idleLeft += 1;
      if (idleLeft > 12) {
        idleLeft = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/idle/idleleft" + idleLeft + ".png";
  }

  //run right
  if (
    (keys.d.pressed && isMovingRight) ||
    (keys.arrowRight.pressed && isMovingRight)
  ) {
    knightImg.src = "images/animations/knight/walk/walkright1.png";
    if (animateId % 10 === 0) {
      runRight += 1;
      if (runRight === 6) {
        runRight = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/walk/walkright" + runRight + ".png";
  }

  //run left
  if (
    (keys.a.pressed && isMovingLeft) ||
    (keys.arrowLeft.pressed && isMovingLeft)
  ) {
    knightImg.src = "images/animations/knight/walk/walkleft1.png";
    if (animateId % 10 === 0) {
      runLeft += 1;
      if (runLeft === 6) {
        runLeft = 1;
      }
    }
    knightImg.src = "images/animations/knight/walk/walkleft" + runLeft + ".png";
  }

  //jump right
  if (
    (wasRight && isMovingUp) ||
    (wasRight && isMovingUp && keys.d.pressed) ||
    (wasRight && isMovingUp && keys.arrowRight.pressed)
  ) {
    knightImg.src = "images/animations/knight/jump/jumpright1.png.png";
    if (animateId % 10 === 0) {
      jumpRight += 1;
      if (jumpRight === 7) {
        jumpRight = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/jump/jumpright" + jumpRight + ".png";
  }

  //jump left
  if (
    (wasLeft && isMovingUp) ||
    (wasLeft && isMovingUp && keys.a.pressed) ||
    (wasLeft && isMovingUp && keys.arrowLeft.pressed)
  ) {
    knightImg.src = "images/animations/knight/jump/jumpleft1.png";
    if (animateId % 10 === 0) {
      jumpLeft += 1;
      if (jumpLeft === 7) {
        jumpLeft = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/jump/jumpleft" + jumpLeft + ".png";
  }

  //attack left
  if (attack && wasLeft) {
    knightImg.src = "images/animations/knight/attack/attackleft1.png";
    if (animateId % 10 === 0) {
      jumpLeft += 1;
      if (jumpLeft > 5) {
        jumpLeft = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/attack/attackleft" + jumpLeft + ".png";
  }

  //attack right
  if (attack && wasRight) {
    knightImg.src = "images/animations/knight/attack/attackright1.png";
    if (animateId % 10 === 0) {
      jumpLeft += 1;
      if (jumpLeft > 5) {
        jumpLeft = 1;
      }
    }
    knightImg.src =
      "images/animations/knight/attack/attackright" + jumpLeft + ".png";
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
      // scrollOfset += 2;

      monsters.forEach((monster) => {
        monster.position.x -= 2;
      });

      bigPlatforms.forEach((platform) => {
        platform.position.x -= 2;
      });

      coin.forEach((coin) => {
        coin.position.x -= 2;
      });

      chests.forEach((chest) => {
        chest.position.x -= 2;
      });

      batman.position.x -= 2;
    } else if (keys.a.pressed || keys.arrowLeft.pressed) {
      scrollOfset -= 2;

      monsters.forEach((monster) => {
        monster.position.x += 2;
      });

      bigPlatforms.forEach((platform) => {
        platform.position.x += 2;
      });

      coin.forEach((coin) => {
        coin.position.x += 2;
      });
      chests.forEach((chest) => {
        chest.position.x += 2;
      });

      batman.position.x += 2;
    }

    let winText1 = "YOU WIN!!";
    let winText2 = "to be continued";

    //win scenario
    chests.forEach((chest) => {
      if (player.position.x >= chest.position.x && attack) {
        cancelAnimationFrame(animateId);
        ctx.font = "50px VT323";
        ctx.fillStyle = "white";
        ctx.fillText(winText1, 430, 283);

        ctx.font = "50px VT323";
        ctx.fillStyle = "white";
        ctx.fillText(winText2, 380, 380);
      }
    });

    //lose scenario
    if (player.position.y > canvas.height) {
      totalHearts -= 1;
      hearts.pop();
      reset();
    }
    if (totalHearts === 0) {
      gameOver = true;
      cancelAnimationFrame(animateId);
      gameOverFunction();
      totalHearts = 3;
      hearts = [
        new Hearts(850, 10, 30, 30, heartImg),
        new Hearts(900, 10, 30, 30, heartImg),
        new Hearts(950, 10, 30, 30, heartImg),
      ];
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

  //checks for collision and player dies
  monsters.forEach((monster) => {
    if (
      monster.position.x < player.position.x + player.width - 70 &&
      monster.position.x + monster.width > player.position.x &&
      monster.position.y < player.position.y + player.height - 20 &&
      monster.height + monster.position.y > player.position.y
    ) {
      totalHearts -= 1;
      hearts.pop();
      reset();
      if (totalHearts === 0) {
        gameOver = true;
        cancelAnimationFrame(animateId);
        gameOverFunction();
        totalHearts = 3;
        hearts = [
          new Hearts(850, 10, 30, 30, heartImg),
          new Hearts(900, 10, 30, 30, heartImg),
          new Hearts(950, 10, 30, 30, heartImg),
        ];
      }
    }
  });

  //attack collision
  monsters.forEach((monster, index) => {
    if (
      monster.position.x < player.position.x + player.width &&
      monster.position.x + monster.width > player.position.x &&
      monster.position.y < player.position.y + player.height - 20 &&
      monster.height + monster.position.y > player.position.y
    ) {
      if (keys.Space.pressed) {
        monsters.splice(index, 1);
      }
    }
  });

  coin.forEach((singleCoin, index) => {
    if (
      singleCoin.position.x < player.position.x + player.width &&
      singleCoin.position.x + singleCoin.width > player.position.x &&
      singleCoin.position.y < player.position.y + player.height &&
      singleCoin.height + singleCoin.position.y > player.position.y
    ) {
      score++;
      coin.splice(index, 1);
    }
  });
}

//movement tracker
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d": //right
      stepsAudio.play();
      stepsAudio.loop = true;
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
    case " ": //attack
      attack = true;
      attackAudio.play();
      attackAudio.loop = true;
      keys.Space.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  isMovingUp = false;
  isMovingDown = false;
  isNotMoving = true;

  switch (event.key) {
    case "d": //right
      stepsAudio.loop = false;
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
    case " ": //attack
      attackAudio.loop = false;
      attack = false;
      keys.Space.pressed = false;
      break;
  }
});

let turnBg = false;

class StartBg {
  constructor(x, y, width, height, image, left, right, velocity) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: velocity,
      y: 0,
    };
    this.width = width;
    this.height = height;

    this.turnLeft = left;
    this.turnRight = right;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    if (this.position.x < this.turnRight) {
      this.position.x += this.velocity.x;
    }
    if (this.position.x > this.turnLeft) {
      this.position.x += this.velocity.x;
    }
  }
}

const bg1 = createImage("images/animations/background/longerbg/Group 43.png");
const bg2 = createImage("images/animations/background/longerbg/Group 44.png");
const bg3 = createImage("images/animations/background/longerbg/Group 44.png");
const bg4 = createImage("images/animations/background/longerbg/Group 45.png");
const bg5 = createImage("images/animations/background/longerbg/Group 46.png");
const bg6 = createImage("images/animations/background/longerbg/Group 47.png");
const bg7 = createImage("images/animations/background/longerbg/Group 48.png");
const bg8 = createImage("images/animations/background/longerbg/Group 49.png");
const bg9 = createImage("images/animations/background/longerbg/Group 50.png");
const bg10 = createImage("images/animations/background/longerbg/Group 51.png");
const bg11 = createImage("images/animations/background/longerbg/Group 52.png");
const bg12 = createImage("images/animations/background/longerbg/Group 53.png");
const bg13 = createImage("images/animations/background/longerbg/Group 54.png");

let BgLayers = [
  new StartBg(-1017, -302, 1028, 0, bg10, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg9, -517, -250, 0.2),
  new StartBg(-1017, -302, 1028, 0, bg11, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg12, -517, -250, 0.2),
  new StartBg(-1017, -302, 1028, 0, bg6, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg5, -517, -250, 0.2),
  new StartBg(-1017, -302, 1028, 0, bg4, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg3, -517, -250, 0.2),
  new StartBg(-1017, -302, 1028, 0, bg2, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg7, -517, -250, 0.2),
  new StartBg(-1017, -302, 1028, 0, bg1, -517, -250, 0.1),
  new StartBg(-1017, -302, 1028, 0, bg8, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg10, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg9, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg11, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg12, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg6, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg5, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg4, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg3, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg2, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg7, -517, -250, 0.2),
  new StartBg(-2034, -302, 1028, 0, bg1, -517, -250, 0.1),
  new StartBg(-2034, -302, 1028, 0, bg8, -517, -250, 0.2),
];

function gameOverFunction() {
  cancelAnimationFrame(animateId);
  animateId = window.requestAnimationFrame(gameOverFunction);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  BgLayers.forEach((layer) => {
    if (layer.x > canvas.width / 2) {
      layer.x = -1017;
    }

    layer.draw();
    layer.update();
  });

  ctx.font = "50px VT323";
  ctx.fillStyle = "white";
  ctx.fillText(gameOverText, 410, 283);
}

let startText = "START GAME";

function animateStart() {
  animateId = window.requestAnimationFrame(animateStart);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  BgLayers.forEach((layer) => {
    if (layer.x > canvas.width / 2) {
      layer.x = -1017;
    }

    layer.draw();
    layer.update();
  });

  ctx.font = "50px VT323";
  ctx.fillStyle = "white";
  ctx.fillText(startText, 410, 283);
}

window.onload = () => {
  animateStart();

  // animateKnight();
  // animateMage();
  // animateRogue();

  const startGameBtn = document.querySelector(".pixel2");
  startGameBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animateId);
    reset();
    animate();
  });
};

// class ChoosePlayer {
//   constructor(x, y, image, ctx) {
//     this.position = {
//       x,
//       y,
//     };
//     this.height = 64;
//     this.width = 64;
//     this.image = image;
//     this.ctx = ctx;
//   }
//   //draw player
//   draw() {
//     this.ctx.drawImage(this.image, this.position.x, this.position.y);
//   }

//   update() {
//     this.draw();
//   }
// }

// let MageImg = createImage('/img/animations/mage/mage.png')
// let RogueImg = createImage('/img/animations/rogue/rogueright.png')

// const charKnight = document.querySelector("#characterKnight");
// const ctxKnight = charKnight.getContext("2d");
// const charMage = document.querySelector("#characterMage");
// const ctxMage = charMage.getContext("2d");
// const charRoque = document.querySelector("#characterRogue");
// const ctxRogue = charRoque.getContext("2d");

// charKnight.width = 125;
// charKnight.height = 125;
// charMage.width = 125;
// charMage.height = 125;
// charRoque.width = 125;
// charRoque.height = 125;

// let Knight = new ChoosePlayer(0, 0, knightImg, ctxKnight);
// let Mage = new ChoosePlayer(0, 0, MageImg, ctxMage);
// let Roque = new ChoosePlayer(0, 0, RogueImg, ctxRogue);

// let animateIdKnight;
// let animateIdMage;
// let animateIdRogue;

// let mageImg = 0;
// let rogueImg = 0;

// function animateKnight() {
//   animateIdKnight = window.requestAnimationFrame(animateKnight);
//   ctxKnight.clearRect(0, 0, canvas.width, canvas.height);

//   Knight.update();

//   knightImg.src = "/img/animations/knight/idle/idleright1.png";
//   if (animateIdKnight % 10 === 0) {
//     idleRight += 1;
//     if (idleRight > 12) {
//       idleRight = 1;
//     }
//   }
//   knightImg.src = "/img/animations/knight/idle/idleright" + idleRight + ".png";
// }

// function animateMage() {
//   animateIdMage = window.requestAnimationFrame(animateMage);
//   ctxMage.clearRect(0, 0, canvas.width, canvas.height);

//   Mage.update()

//   MageImg.src = "/img/animations/mage/idle/idleright1.png";
//   if (animateIdMage % 10 === 0) {
//     mageImg += 1;
//     if (mageImg > 14) {
//       mageImg = 1;
//     }
//   }
//   MageImg.src = "/img/animations/mage/idle/idleright" + mageImg + ".png";
// }

// function animateRogue() {
//   animateIdRogue = window.requestAnimationFrame(animateRogue);
//   ctxRogue.clearRect(0, 0, canvas.width, canvas.height);

//   Roque.update();

//   RogueImg.src = "/img/animations/rogue/idle/idleright1.png.png";
//   if (animateIdRogue % 10 === 0) {
//     rogueImg += 1;
//     if (rogueImg > 18) {
//       rogueImg = 1;
//     }
//   }
//   RogueImg.src = "/img/animations/rogue/idle/idleright" + rogueImg + ".png";
// }
