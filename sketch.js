let pos;
let vel;
let logoW;
let logoH;
let currentColor;

const label = 'DVD';
const baseSpeed = 4.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textFont('Helvetica');
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  setLogoSize();
  resetState();
}

function draw() {
  background(0);
  updatePosition();
  drawLogo();
}

function setLogoSize() {
  // Scale logo relative to canvas, keeping it legible on resize.
  const target = max(min(width, height) * 0.18, 48);
  textSize(target);
  logoW = textWidth(label);
  logoH = textAscent() + textDescent();
}

function resetState() {
  currentColor = pickColor();
  pos = createVector(random(width - logoW), random(height - logoH));
  const angle = random(TWO_PI);
  vel = p5.Vector.fromAngle(angle).setMag(baseSpeed);
  // Prevent a near-zero component that could feel “stuck” on one axis.
  if (abs(vel.x) < 0.5) vel.x = 0.5 * Math.sign(vel.x || 1);
  if (abs(vel.y) < 0.5) vel.y = 0.5 * Math.sign(vel.y || 1);
}

function updatePosition() {
  pos.add(vel);
  let bounced = false;

  if (pos.x <= 0) {
    pos.x = 0;
    vel.x *= -1;
    bounced = true;
  } else if (pos.x + logoW >= width) {
    pos.x = width - logoW;
    vel.x *= -1;
    bounced = true;
  }

  if (pos.y <= 0) {
    pos.y = 0;
    vel.y *= -1;
    bounced = true;
  } else if (pos.y + logoH >= height) {
    pos.y = height - logoH;
    vel.y *= -1;
    bounced = true;
  }

  if (bounced) {
    currentColor = pickColor();
  }
}

function drawLogo() {
  noStroke();
  fill(currentColor);
  text(label, pos.x, pos.y);
}

function pickColor() {
  // Bright random hue, avoid low saturation/value.
  return color(random(0, 360), 80, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setLogoSize();
  pos.x = constrain(pos.x, 0, max(width - logoW, 0));
  pos.y = constrain(pos.y, 0, max(height - logoH, 0));
}
