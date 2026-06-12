// Adaptado de ariroffe/personal-website (MIT) — scenes/interactive/sign.js
import Phaser from "phaser";
import type { BaseScene } from "./base-scene";

export class Sign extends Phaser.GameObjects.Zone {
  declare scene: BaseScene;
  direction: string;
  signText: Phaser.GameObjects.BitmapText;
  signRect: Phaser.GameObjects.Rectangle;
  clickRadius = 100;
  showByClick = false;
  activated = false;

  constructor(
    scene: BaseScene,
    x: number,
    y: number,
    text: string,
    direction: string
  ) {
    super(scene, x, y, 32, 32);

    scene.add.existing(this).setOrigin(0, 1);
    scene.physics.world.enable(this, 1); // 1 = corpo estático

    this.direction = direction;
    const offsetX = 17;
    let offsetY = 0;
    if (direction === "up") offsetY = -45;
    else if (direction === "down") offsetY = 24;

    this.signText = scene.add
      .bitmapText(Math.round(x + offsetX), Math.round(y + offsetY), "pixelop", text, 16, 1)
      .setOrigin(0.5, 1)
      .setDepth(101)
      .setVisible(false);
    this.signRect = scene.add
      .rectangle(
        Math.round(x + offsetX),
        Math.round(y + offsetY),
        this.signText.width + 10,
        this.signText.height,
        0xffffff
      )
      .setStrokeStyle(1, 0x000000)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);

    scene.physics.add.collider(scene.player, this, () => this.collideSign());

    // Por clique/toque ativa dentro de um raio de distância
    this.setInteractive().on("pointerdown", this.clickSign, this);
  }

  private collideSign() {
    if (this.activated) return;
    const touching = this.scene.player.body.touching;
    if (this.direction === "center") this.showSignText();
    else if (this.direction === "up" && touching.up) this.showSignText();
    else if (this.direction === "down" && touching.down) this.showSignText();
  }

  private clickSign() {
    if (this.activated) return;
    const distance = Phaser.Math.Distance.BetweenPoints(
      this.getCenter(),
      this.scene.player
    );
    if (distance < this.clickRadius) {
      // Para não poluir a sala de aula com vários balões
      if (this.scene.scene.key === "UniversityScene") {
        this.scene.signs.forEach((sign) => sign.hideSignText());
      }
      this.showSignText();
      this.showByClick = true;
    }
  }

  showSignText() {
    this.signRect.setVisible(true);
    this.signText.setVisible(true);
    this.scene.showingSign = true;
    this.activated = true;
  }

  playerMovement(
    moveleft: boolean,
    moveright: boolean,
    moveup: boolean,
    movedown: boolean
  ) {
    if (this.showByClick) {
      // Ativada por clique: esconde só quando o jogador se afastar
      if (
        Phaser.Math.Distance.BetweenPoints(this.getCenter(), this.scene.player) >
        this.clickRadius
      ) {
        this.hideSignText();
      }
    } else if (moveleft || moveright) {
      this.hideSignText();
    } else if (this.direction === "up" && movedown) {
      this.hideSignText();
    } else if ((this.direction === "down" || this.direction === "center") && !movedown) {
      this.hideSignText();
    }
    void moveup;
  }

  hideSignText() {
    this.signRect.setVisible(false);
    this.signText.setVisible(false);
    this.showByClick = false;
    this.scene.showingSign = false;
    this.activated = false;
  }
}
