// Adaptado de ariroffe/personal-website (MIT) — scenes/interactive/door.js
import Phaser from "phaser";
import type { BaseScene } from "./base-scene";

export class Door extends Phaser.GameObjects.Zone {
  declare scene: BaseScene;
  destination: string;
  link: boolean;

  constructor(
    scene: BaseScene,
    x: number,
    y: number,
    width: number,
    height: number,
    destination: string,
    link: boolean
  ) {
    super(scene, x, y, width, height);

    // No Tiled a coordenada é o canto inferior esquerdo do objeto
    this.setOrigin(0, 1);

    scene.add.existing(this);
    scene.physics.world.enable(this, 1);

    this.destination = destination;
    this.link = link;
    scene.physics.add.collider(scene.player, this, () => this.enterDoor(scene));
  }

  private enterDoor(scene: BaseScene) {
    // Dispara só no primeiro contato
    if (!scene.player.body.touching.none && scene.player.body.wasTouching.none) {
      if (this.link) {
        window.open(this.destination, "_blank", "noreferrer");
      } else {
        scene.scene.switch(this.destination);
      }
    }
  }
}
