class LitterBox {
  constructor({ r = 80, img = null }) {
    this.x = width / 2;
    this.y = height / 2;
    this.r = r;
    this.a = 0;

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

  drawImg() {
    fill(64);
    noStroke();
    ellipse(0, 0, this.r * 2, this.r * 2);
    image(this.img, 0, 0, this.imgW, this.imgH);
  }

  drawDebug() {
    ellipse(0, 0, this.r * 2, this.r * 2);
  }

  draw() {
    if (this.dead && !this.reachedLitterBox) { return; }

    push();
    translate(this.x, this.y);
    rotate(this.a);

    if (this.has_img) {
      this.drawImg();
    } else {
      this.drawDebug();
    }
    pop();
  }
}

export default LitterBox;
