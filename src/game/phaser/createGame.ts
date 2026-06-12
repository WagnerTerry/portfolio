import Phaser from "phaser";
import {
  OverworldScene,
  ResearchScene,
  UniversityScene,
  SoftwareScene,
} from "./scenes";

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    pixelArt: true,
    autoRound: true,
    autoFocus: true,
    backgroundColor: "#000000",
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 0 } },
    },
    scene: [OverworldScene, ResearchScene, UniversityScene, SoftwareScene],
  });
}
