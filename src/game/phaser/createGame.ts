import Phaser from "phaser";
import { TILE } from "../pixelart";
import { MAP_H, MAP_W } from "../world";
import { WorldScene } from "./world-scene";

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    pixelArt: true,
    autoRound: true,
    autoFocus: true,
    backgroundColor: "#1a1c2c",
    // O mundo inteiro cabe na tela (sem câmera): o canvas é escalado para caber
    width: MAP_W * TILE,
    height: MAP_H * TILE,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 0 } },
    },
    scene: [WorldScene],
  });
}
