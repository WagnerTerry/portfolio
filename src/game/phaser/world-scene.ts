import Phaser from "phaser";
import {
  TILE,
  bakeSprite,
  buildWorldCanvas,
  PLAYER_DOWN_STAND,
  PLAYER_DOWN_WALK,
  PLAYER_SIDE_STAND,
  PLAYER_SIDE_WALK,
  PLAYER_UP_STAND,
  PLAYER_UP_WALK,
} from "../pixelart";
import {
  AUTO_TILES,
  BUILDINGS,
  INTERACTIONS,
  MAP,
  MAP_H,
  MAP_W,
  PLAYER_START,
  SOLID_TILES,
} from "../world";

type Direction = "down" | "up" | "left" | "right";

const SPEED = 70;
const DELTAS: Record<Direction, [number, number]> = {
  down: [0, 1],
  up: [0, -1],
  left: [-1, 0],
  right: [1, 0],
};

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite & {
    body: Phaser.Physics.Arcade.Body;
  };
  private indicator!: Phaser.GameObjects.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<"w" | "a" | "s" | "d", Phaser.Input.Keyboard.Key>;
  private vkeys: Record<Direction, boolean> = {
    down: false,
    up: false,
    left: false,
    right: false,
  };
  private facing: Direction = "down";
  private frameHeight = 24;
  private lastAutoTile = "";

  constructor() {
    super("WorldScene");
  }

  preload() {
    // Avatar opcional do usuário: public/avatar.png (3 colunas x 4 linhas:
    // baixo, esquerda, direita, cima — padrão de charsets RPG Maker/Piskel/LPC)
    this.load.image("custom-avatar", `${import.meta.env.BASE_URL}avatar.png`);
  }

  create() {
    // ---------- texturas do jogador ----------
    this.createPlayerTextures();
    (["down", "up", "left", "right"] as Direction[]).forEach((direction) => {
      if (this.anims.exists(`walk-${direction}`)) return;
      this.anims.create({
        key: `walk-${direction}`,
        frames: [
          { key: `p-${direction}-1` },
          { key: `p-${direction}-0` },
          { key: `p-${direction}-2` },
          { key: `p-${direction}-0` },
        ],
        frameRate: 8,
        repeat: -1,
      });
    });

    // ---------- cenário ----------
    if (!this.textures.exists("world")) {
      this.textures.addCanvas("world", buildWorldCanvas(MAP, BUILDINGS));
    }
    this.add.image(0, 0, "world").setOrigin(0);
    this.physics.world.setBounds(0, 0, MAP_W * TILE, MAP_H * TILE);

    // ---------- jogador ----------
    this.player = this.add.sprite(
      (PLAYER_START.x + 0.5) * TILE,
      (PLAYER_START.y + 1) * TILE,
      "p-down-0"
    ) as WorldScene["player"];
    this.player.setOrigin(0.5, 1).setDepth(5);
    this.physics.add.existing(this.player);
    this.player.body.setSize(10, 6);
    this.player.body.setOffset(3, this.frameHeight - 6);
    this.player.body.setCollideWorldBounds(true);

    // ---------- colisões ----------
    const solids = this.physics.add.staticGroup();
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        if (!SOLID_TILES.has(MAP[y][x])) continue;
        const zone = this.add.zone(x * TILE, y * TILE, TILE, TILE).setOrigin(0);
        solids.add(zone);
      }
    }
    this.physics.add.collider(this.player, solids);

    // ---------- balão "!" ----------
    if (!this.textures.exists("indicator")) {
      const c = document.createElement("canvas");
      c.width = 10;
      c.height = 10;
      const g = c.getContext("2d");
      if (g) {
        g.fillStyle = "#1a1c2c";
        g.fillRect(0, 0, 10, 10);
        g.fillStyle = "#f8f8f8";
        g.fillRect(1, 1, 8, 8);
        g.fillStyle = "#1a1c2c";
        g.fillRect(4, 2, 2, 4);
        g.fillRect(4, 7, 2, 1);
      }
      this.textures.addCanvas("indicator", c);
    }
    this.indicator = this.add.image(0, 0, "indicator").setDepth(20).setVisible(false);

    // ---------- entrada ----------
    const keyboard = this.input.keyboard;
    if (keyboard) {
      this.cursors = keyboard.createCursorKeys();
      this.wasd = {
        w: keyboard.addKey("W"),
        a: keyboard.addKey("A"),
        s: keyboard.addKey("S"),
        d: keyboard.addKey("D"),
      };
      ["keydown-E", "keydown-ENTER", "keydown-SPACE"].forEach((event) =>
        keyboard.on(event, () => this.tryInteract())
      );
    }

    // d-pad e botão A do overlay React
    const onVKey = (direction: Direction, pressed: boolean) => {
      this.vkeys[direction] = pressed;
    };
    const onVInteract = () => this.tryInteract();
    this.game.events.on("vkey", onVKey);
    this.game.events.on("vinteract", onVInteract);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off("vkey", onVKey);
      this.game.events.off("vinteract", onVInteract);
    });
  }

  /** Gera as texturas do avatar: padrão desenhado em código, ou public/avatar.png se existir. */
  private createPlayerTextures() {
    const register = (key: string, canvas: HTMLCanvasElement) => {
      if (this.textures.exists(key)) this.textures.remove(key);
      this.textures.addCanvas(key, canvas);
    };

    if (this.textures.exists("custom-avatar")) {
      // Spritesheet externo: 3 colunas (passo A, parado, passo B) x 4 linhas (baixo, esq, dir, cima)
      const source = this.textures.get("custom-avatar").getSourceImage() as
        | HTMLImageElement
        | HTMLCanvasElement;
      const fw = Math.floor(source.width / 3);
      const fh = Math.floor(source.height / 4);
      const destW = TILE;
      const destH = Math.max(TILE, Math.round((fh * TILE) / fw));
      this.frameHeight = destH;

      const rows: Direction[] = ["down", "left", "right", "up"];
      rows.forEach((direction, row) => {
        // ordem dos frames no jogo: 0 = parado (coluna do meio), 1 e 2 = passos
        [1, 0, 2].forEach((col, i) => {
          const c = document.createElement("canvas");
          c.width = destW;
          c.height = destH;
          const g = c.getContext("2d");
          if (g) {
            g.imageSmoothingEnabled = false;
            g.drawImage(source, col * fw, row * fh, fw, fh, 0, 0, destW, destH);
          }
          register(`p-${direction}-${i}`, c);
        });
      });
      return;
    }

    // Avatar padrão (matrizes em pixelart.ts)
    this.frameHeight = 24;
    const defaults: Record<Direction, HTMLCanvasElement[]> = {
      down: [
        bakeSprite(PLAYER_DOWN_STAND),
        bakeSprite(PLAYER_DOWN_WALK),
        bakeSprite(PLAYER_DOWN_WALK, { flip: true }),
      ],
      up: [
        bakeSprite(PLAYER_UP_STAND),
        bakeSprite(PLAYER_UP_WALK),
        bakeSprite(PLAYER_UP_WALK, { flip: true }),
      ],
      left: [
        bakeSprite(PLAYER_SIDE_STAND),
        bakeSprite(PLAYER_SIDE_WALK),
        bakeSprite(PLAYER_SIDE_WALK),
      ],
      right: [
        bakeSprite(PLAYER_SIDE_STAND, { flip: true }),
        bakeSprite(PLAYER_SIDE_WALK, { flip: true }),
        bakeSprite(PLAYER_SIDE_WALK, { flip: true }),
      ],
    };
    (Object.keys(defaults) as Direction[]).forEach((direction) => {
      defaults[direction].forEach((canvas, i) => register(`p-${direction}-${i}`, canvas));
    });
  }

  private get dialogOpen(): boolean {
    return Boolean(this.game.registry.get("dialogOpen"));
  }

  private playerTile() {
    return {
      x: Math.floor(this.player.x / TILE),
      y: Math.floor((this.player.y - 2) / TILE),
    };
  }

  private facingInteraction() {
    const { x, y } = this.playerTile();
    const [dx, dy] = DELTAS[this.facing];
    return INTERACTIONS[`${x + dx},${y + dy}`];
  }

  private tryInteract() {
    if (this.dialogOpen) return;
    const interaction = this.facingInteraction();
    if (interaction) this.game.events.emit("dialog", interaction);
  }

  update(time: number) {
    if (this.dialogOpen) {
      this.player.body.setVelocity(0);
      this.player.anims.stop();
      this.player.setTexture(`p-${this.facing}-0`);
      this.indicator.setVisible(false);
      return;
    }

    // ---------- movimento (teclado, d-pad e toque/clique segurando) ----------
    let moveleft = this.cursors?.left.isDown || this.wasd?.a.isDown || this.vkeys.left;
    let moveright = this.cursors?.right.isDown || this.wasd?.d.isDown || this.vkeys.right;
    let moveup = this.cursors?.up.isDown || this.wasd?.w.isDown || this.vkeys.up;
    let movedown = this.cursors?.down.isDown || this.wasd?.s.isDown || this.vkeys.down;

    const pointer = this.input.activePointer;
    if (pointer.primaryDown) {
      const target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      if (Math.abs(target.x - this.player.x) > 12) {
        if (target.x > this.player.x) moveright = true;
        else moveleft = true;
      }
      if (Math.abs(target.y - this.player.y) > 12) {
        if (target.y > this.player.y) movedown = true;
        else moveup = true;
      }
    }

    this.player.body.setVelocity(0);
    if (moveleft) this.player.body.setVelocityX(-SPEED);
    else if (moveright) this.player.body.setVelocityX(SPEED);
    if (moveup) this.player.body.setVelocityY(-SPEED);
    else if (movedown) this.player.body.setVelocityY(SPEED);
    this.player.body.velocity.normalize().scale(SPEED);

    const moving = moveleft || moveright || moveup || movedown;
    if (moveleft) this.facing = "left";
    else if (moveright) this.facing = "right";
    else if (moveup) this.facing = "up";
    else if (movedown) this.facing = "down";

    if (moving) {
      this.player.anims.play(`walk-${this.facing}`, true);
    } else {
      this.player.anims.stop();
      this.player.setTexture(`p-${this.facing}-0`);
    }

    // ---------- portas com gatilho automático ----------
    const tile = this.playerTile();
    const tileKey = `${tile.x},${tile.y}`;
    const autoKey = AUTO_TILES[tileKey];
    if (autoKey && this.lastAutoTile !== tileKey) {
      this.lastAutoTile = tileKey;
      this.game.events.emit("dialog", INTERACTIONS[autoKey]);
    } else if (!autoKey) {
      this.lastAutoTile = "";
    }

    // ---------- balão "!" quando algo interativo está à frente ----------
    if (this.facingInteraction()) {
      const bob = Math.floor(time / 250) % 2;
      this.indicator
        .setPosition(this.player.x, this.player.y - this.frameHeight - 6 + bob)
        .setVisible(true);
    } else {
      this.indicator.setVisible(false);
    }
  }
}
