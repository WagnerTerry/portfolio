// Adaptado de ariroffe/personal-website (MIT) — scenes/interactive/bigsign.js
import Phaser from "phaser";
import type { BaseScene } from "./base-scene";
import type { Player } from "./player";

export class BigSign extends Phaser.GameObjects.Zone {
  declare scene: BaseScene;
  signText: Phaser.GameObjects.BitmapText;
  signRect: Phaser.GameObjects.Rectangle;
  smSignText: Phaser.GameObjects.BitmapText;
  smSignRect: Phaser.GameObjects.Rectangle;
  purpleTiles: Phaser.GameObjects.Sprite[] = [];
  activated = false;

  constructor(
    scene: BaseScene,
    x: number,
    y: number,
    width: number,
    height: number,
    signX: number,
    signY: number,
    smSignX: number,
    smSignY: number,
    text: string
  ) {
    super(scene, x, y, width, height);

    scene.add.existing(this).setOrigin(0, 1);
    scene.physics.world.enable(this, 1);
    scene.physics.add.overlap(scene.player, this, () =>
      this.showSignText(scene.player)
    );

    // Versão pequena (telas estreitas)
    this.smSignText = scene.add
      .bitmapText(smSignX, smSignY, "pixelop", text, 16, 1)
      .setOrigin(0, 1)
      .setDepth(101)
      .setVisible(false);
    this.smSignRect = scene.add
      .rectangle(smSignX - 10, smSignY, this.smSignText.width + 20, this.smSignText.height, 0xffffff)
      .setStrokeStyle(1, 0x000000)
      .setOrigin(0, 1)
      .setDepth(100)
      .setVisible(false);

    // Versão grande
    this.signText = scene.add
      .bitmapText(signX, signY, "pixelop", text, 32, 1)
      .setOrigin(0, 1)
      .setDepth(101)
      .setVisible(false);
    this.signRect = scene.add
      .rectangle(signX - 10, signY, this.signText.width + 20, this.signText.height, 0xffffff)
      .setStrokeStyle(1, 0x000000)
      .setOrigin(0, 1)
      .setDepth(100)
      .setVisible(false);

    // Tiles roxos pulsantes
    if (!scene.anims.exists("purple-tile-anim")) {
      scene.anims.create({
        key: "purple-tile-anim",
        frames: scene.anims.generateFrameNames("anims_ui", {
          prefix: "purple.",
          start: 0,
          end: 2,
          zeroPad: 3,
        }),
        frameRate: 6,
        yoyo: true,
        delay: 400,
        repeatDelay: 800,
        repeat: -1,
      });
    }
    if (scene.scene.key === "ResearchScene") {
      this.purpleTiles.push(
        scene.add.sprite(x - 30, y - 10, "anims_ui", "purple.000").setOrigin(0, 1)
      );
    } else {
      this.purpleTiles.push(
        scene.add.sprite(x - 8, y, "anims_ui", "purple.000").setOrigin(0, 1)
      );
      // Se a altura passa de 1 tile, o bigSign tem 4 tiles
      if (height > 32) {
        this.purpleTiles.push(
          scene.add.sprite(x - 8, y - 32, "anims_ui", "purple.000").setOrigin(0, 1),
          scene.add.sprite(x - 8 + 32, y, "anims_ui", "purple.000").setOrigin(0, 1),
          scene.add.sprite(x - 8 + 32, y - 32, "anims_ui", "purple.000").setOrigin(0, 1)
        );
      }
    }
    this.purpleTiles.forEach((tile) => tile.setDepth(2).play("purple-tile-anim", true));
  }

  private showSignText(player: Player) {
    // +20 porque player.y é o centro do sprite e this.y é a base (origin 1)
    if (Math.ceil(player.y + 20) <= this.y) {
      this.purpleTiles.forEach((tile) => {
        tile.anims.stop();
        tile.setTint(0xffff00);
      });
      this.activated = true;
      if (window.innerWidth < 900) {
        this.smSignRect.setVisible(true);
        this.smSignText.setVisible(true);
      } else {
        this.signRect.setVisible(true);
        this.signText.setVisible(true);
      }
      // No overworld, o personagem acena ao ler o aviso
      if (
        this.scene.scene.key === "OverworldScene" &&
        player.body.velocity.x === 0 &&
        player.body.velocity.y === 0
      ) {
        player.anims.play("ariel-wave", true);
      }
    }
  }

  hideSignText(player: Player) {
    if (!this.activated) return;
    if (
      (!player.body.embedded && player.body.touching.none) ||
      Math.ceil(player.y + 20) > this.y
    ) {
      this.signRect.setVisible(false);
      this.signText.setVisible(false);
      this.smSignRect.setVisible(false);
      this.smSignText.setVisible(false);
      this.purpleTiles.forEach((tile) => tile.clearTint());
      this.activated = false;
    }
  }
}
