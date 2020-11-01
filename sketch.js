import PooEater from './poo_eater.js';
import LitterBox from './littter_box.js';

const bgColor = [83, 145, 126];

let pooEaters = [];
let nPooEaters = 1;

let nStopped = 0;
let nFailures = 0;
const maxFailures = 5;
let gameOver = false;

let litterBox;

let clickLoc;

function mouseClicked() {
  clickLoc.x = mouseX;
  clickLoc.y = mouseY;
}

let pooEaterIms;
let litterBoxIm;
const pooEaterImPaths = [
  'imgs/tonks1.png',
  'imgs/tonks2.png',
  'imgs/tonks3.png',
  'imgs/tonks4.png',
  'imgs/tonks5.png',
  'imgs/tonks6.png',
];
const litterBoxImPath = 'imgs/litterBox.png';
function preload() {
  pooEaterIms = pooEaterImPaths.map((x) => loadImage(x));
  litterBoxIm = loadImage(litterBoxImPath);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  litterBox = new LitterBox({ r: width * 0.15, img: litterBoxIm });
  clickLoc = createVector();
}

function draw() {
  background(bgColor);

  if (gameOver) {
    background(0);
    textAlign(CENTER);
    textSize(100);
    fill(200);
    text('GAME\nOVER', width / 2, height / 2 - 100);

    textSize(30);
    text(`Stopped: ${nStopped}`, width / 2, height / 2 + 100);
    return;
  }

  const releaseEveryN = round(map(nStopped, 0, 100, 60, 10, true));
  if (pooEaters.length < nPooEaters && frameCount % releaseEveryN === 0) {
    pooEaters.push(new PooEater({
      speed: map(nStopped, 0, 100, 1, 10, true), r: width * 0.08, img: random(pooEaterIms),
    }));
  }

  if (frameCount % 300 === 0) {
    nPooEaters += 2;
  }

  pooEaters = pooEaters.reduce((accum, x) => {
    x.update(clickLoc, litterBox);
    x.draw();
    if (!x.dead && dist(litterBox.x, litterBox.y, x.p.x, x.p.y) > 10) {
      accum.push(x);
    } else {
      window.navigator.vibrate(50);
      if (x.dead) {
        nStopped += 1;
      } else if (x.reachedLitterBox) {
        nFailures += 1;
      }
    }
    return accum;
  }, []);

  litterBox.draw();

  textSize(20);
  text(`Stopped: ${nStopped}; Fails: ${nFailures}`, 10, 30);

  if (nFailures >= maxFailures) {
    gameOver = true;
  }

  clickLoc.x = -100;
  clickLoc.y = -100;
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
