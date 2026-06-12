// Adaptado de ariroffe/personal-website (MIT) — scenes/interactive/player.js
import Phaser from "phaser";

const WALK_ANIMS = ["left", "right", "front", "back"] as const;

export class Player extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  speed = 175;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(5);
    this.body.setSize(26, 41);

    this.createAnims(scene);
  }

  private createAnims(scene: Phaser.Scene) {
    const anims = scene.anims;
    WALK_ANIMS.forEach((direction) => {
      const key = `ariel-${direction}-walk`;
      if (anims.exists(key)) return;
      anims.create({
        key,
        frames: anims.generateFrameNames("atlas", {
          prefix: `${key}.`,
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    });
    if (!anims.exists("ariel-wave")) {
      anims.create({
        key: "ariel-wave",
        frames: anims.generateFrameNames("atlas", {
          prefix: "ariel-wave.",
          start: 0,
          end: 4,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  walk(moveleft: boolean, moveright: boolean, moveup: boolean, movedown: boolean) {
    const prevVelocity = this.body.velocity.clone();

    this.body.setVelocity(0);

    // Animações de esquerda/direita têm precedência no movimento diagonal
    if (moveleft) {
      this.body.setVelocityX(-this.speed);
      this.anims.play("ariel-left-walk", true);
    } else if (moveright) {
      this.body.setVelocityX(this.speed);
      this.anims.play("ariel-right-walk", true);
    }
    if (moveup) {
      this.body.setVelocityY(-this.speed);
      if (!(moveleft || moveright)) this.anims.play("ariel-back-walk", true);
    } else if (movedown) {
      this.body.setVelocityY(this.speed);
      if (!(moveleft || moveright)) this.anims.play("ariel-front-walk", true);
    }

    // Normaliza para não andar mais rápido na diagonal
    this.body.velocity.normalize().scale(this.speed);

    // Parado: escolhe o frame idle (sem interromper o aceno do overworld)
    if (
      !(moveleft || moveright || moveup || movedown) &&
      !(this.anims.currentAnim == null || this.anims.currentAnim.key === "ariel-wave")
    ) {
      this.anims.stop();
      if (prevVelocity.x < 0) this.setTexture("atlas", "ariel-left");
      else if (prevVelocity.x > 0) this.setTexture("atlas", "ariel-right");
      else if (prevVelocity.y < 0) this.setTexture("atlas", "ariel-back");
      else if (prevVelocity.y > 0) this.setTexture("atlas", "ariel-front");
    }
  }
}
