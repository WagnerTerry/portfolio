// Adaptado de ariroffe/personal-website (MIT) — scenes/{overworld,research,university,software}.js
import { BaseScene } from "./base-scene";

const ASSETS = `${import.meta.env.BASE_URL}game/`;

export class OverworldScene extends BaseScene {
  constructor() {
    super("OverworldScene");
  }

  preload() {
    this.setLoading(true);
    this.load.image("TilesetImage", `${ASSETS}tileset_extruded.png`);
    this.load.tilemapTiledJSON("OverworldMap", `${ASSETS}overworld-new.json`);
    this.load.atlas("atlas", `${ASSETS}player.png`, `${ASSETS}player.json`);
    this.load.bitmapFont("pixelop", `${ASSETS}pixelop.png`, `${ASSETS}pixelop.xml`);
    this.load.atlas("anims_ui", `${ASSETS}anims_ui.png`, `${ASSETS}anims_ui.json`);
  }

  create() {
    this.createWorld("OverworldMap");

    this.physics.world.setBounds(0, 0, 1920, 1088);
    this.cameras.main.setBounds(0, 0, 1920, 1088);

    // Nome no canteiro de flores (no lugar das letras em tiles do mapa original)
    this.add
      .bitmapText(944, 588, "pixelop", "WAGNER\nGONCALVES", 32, 1)
      .setOrigin(0.5, 0.5)
      .setTint(0x6d4c2f)
      .setDepth(1);

    // Ao voltar de um prédio, mostra o personagem de frente
    this.events.on("wake", () => this.player.setTexture("atlas", "ariel-front"));

    this.collideWithWorld();
    this.setLoading(false);
  }
}

export class ResearchScene extends BaseScene {
  constructor() {
    super("ResearchScene");
  }

  preload() {
    this.setLoading(true);
    this.load.tilemapTiledJSON("ResearchMap", `${ASSETS}research-new.json`);
  }

  create() {
    this.createWorld("ResearchMap");

    this.physics.world.setBounds(0, 0, 960, 768);
    this.cameras.main.setBounds(0, 0, 960, 768);

    // Entrando pela porta, mostra o personagem de costas
    this.events.on("create", () => this.player.setTexture("atlas", "ariel-back"));
    this.events.on("wake", () => this.player.setTexture("atlas", "ariel-back"));

    this.collideWithWorld();
    this.setLoading(false);
  }
}

export class UniversityScene extends BaseScene {
  constructor() {
    super("UniversityScene");
  }

  preload() {
    this.setLoading(true);
    this.load.tilemapTiledJSON("UniversityMap", `${ASSETS}university-new.json`);
  }

  create() {
    this.createWorld("UniversityMap");

    this.physics.world.setBounds(0, 0, 1440, 768);
    this.cameras.main.setBounds(0, 0, 1440, 768);

    this.events.on("create", () => this.player.setTexture("atlas", "ariel-back"));
    this.events.on("wake", () => this.player.setTexture("atlas", "ariel-back"));

    // Fonte d'água animada
    if (!this.anims.exists("fountain-anim")) {
      this.anims.create({
        key: "fountain-anim",
        frames: this.anims.generateFrameNames("anims_ui", {
          prefix: "fountain.",
          start: 1,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
    const fountain = this.add.sprite(928, 608, "anims_ui", "fountain.000");
    fountain.playReverse("fountain-anim");

    this.collideWithWorld();
    this.setLoading(false);
  }
}

export class SoftwareScene extends BaseScene {
  constructor() {
    super("SoftwareScene");
  }

  preload() {
    this.setLoading(true);
    this.load.tilemapTiledJSON("SoftwareMap", `${ASSETS}software-new.json`);
  }

  create() {
    this.createWorld("SoftwareMap");

    this.physics.world.setBounds(0, 0, 960, 768);
    this.cameras.main.setBounds(0, 0, 960, 768);

    this.events.on("create", () => this.player.setTexture("atlas", "ariel-back"));
    this.events.on("wake", () => this.player.setTexture("atlas", "ariel-back"));

    // Computadores animados
    if (!this.anims.exists("smallcomputer-anim")) {
      this.anims.create({
        key: "smallcomputer-anim",
        frames: this.anims.generateFrameNames("anims_ui", {
          prefix: "comput2.",
          start: 0,
          end: 1,
          zeroPad: 3,
        }),
        frameRate: 2,
        repeat: -1,
      });
    }
    this.add.sprite(880, 80, "anims_ui", "comput2.000").play("smallcomputer-anim");

    if (!this.anims.exists("bigcomputer-anim")) {
      this.anims.create({
        key: "bigcomputer-anim",
        frames: this.anims.generateFrameNames("anims_ui", {
          prefix: "comput.",
          start: 0,
          end: 1,
          zeroPad: 3,
        }),
        frameRate: 2,
        repeat: -1,
      });
    }
    this.add.sprite(528, 80, "anims_ui", "comput.000").play("bigcomputer-anim");

    this.collideWithWorld();
    this.setLoading(false);
  }
}
