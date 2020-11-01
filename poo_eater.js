const randomOffScreenLoc = (minOff = 30, maxOff = 100) => {
  const edge = random(['left', 'top', 'right', 'bottom']);
  const mainEdgeOff = random(minOff, maxOff);

  const loc = createVector();
  if (edge === 'left') {
    loc.x = -mainEdgeOff;
    loc.y = random(-minOff, height + minOff);
  } else if (edge === 'top') {
    loc.y = -mainEdgeOff;
    loc.x = random(-minOff, width + minOff);
  } else if (edge === 'right') {
    loc.x = width + mainEdgeOff;
    loc.y = random(-minOff, height + minOff);
  } else if (edge === 'bottom') {
    loc.y = height + mainEdgeOff;
    loc.x = random(-minOff, width + minOff);
  }

  return loc;
};

class PooEater {
  constructor({
    speed = 1, r = 50, img = null,
  }) {
    this.dead = false;
    this.reachedLitterBox = false;

    this.p = randomOffScreenLoc();
    this.v = createVector();
    this.speed = speed;
    this.setVelocity();

    this.r = r;

    this.a = random(-PI / 4, PI / 4);

    this.img = img;

    if (img === null) {
      this.has_img = false;
    } else {
      this.has_img = true;
      if (img.width > img.height) {
        this.imgW = r * 2;
        this.imgH = img.height * (this.imgW / img.width);
      } else {
        this.imgH = r * 2;
        this.imgW = img.width * (this.imgH / img.height);
      }
    }
  }

  setVelocity() {
    const dx = width / 2 - this.p.x;
    const dy = height / 2 - this.p.y;
    this.v.x = dx;
    this.v.y = dy;
    this.v.limit(this.speed);
  }

  drawImg() {
    image(this.img, 0, 0, this.imgW, this.imgH);
  }

  drawDebug() {
    push();
    ellipse(0, 0, this.r * 2, this.r * 2);
    stroke(255, 0, 0);
    line(0, 0, this.r, 0);
    stroke(0, 0, 255);
    line(0, 0, -this.r, 0);
    pop();
  }

  draw() {
    if (this.dead) { return; }

    push();
    translate(this.p.x, this.p.y);
    this.a = atan2(height / 2 - this.p.y, width / 2 - this.p.x);

    if (this.p.x - width / 2 > 0) {
      this.a -= PI;
    }

    if (this.reachedLitterBox) { this.a += random(-PI / 10, PI / 10); }
    rotate(this.a);
    if (this.p.x - width / 2 > 0) {
      scale(-1, 1);
    }

    if (this.has_img) {
      this.drawImg();
    } else {
      this.drawDebug();
    }
    pop();
  }

  update(clickLocation, litterBox) {
    if (clickLocation.x >= 0 && clickLocation.y >= 0 && !this.reachedLitterBox) {
      const d = dist(clickLocation.x, clickLocation.y, this.p.x, this.p.y);
      if (d <= this.r) {
        this.dead = true;
        return;
      }
    } else {
      const d = dist(litterBox.x, litterBox.y, this.p.x, this.p.y);
      if (d <= (litterBox.r + this.r) * 0.8) {
        this.reachedLitterBox = true;
      }
    }

    this.setVelocity();
    this.p.add(this.v);
  }
}

export default PooEater;
