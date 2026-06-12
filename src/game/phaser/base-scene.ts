// Adaptado de ariroffe/personal-website (MIT) — scenes/base.js
import Phaser from "phaser";
import { Player } from "./player";
import { Sign } from "./sign";
import { BigSign } from "./bigsign";
import { Door } from "./door";
import { DOOR_LINKS, SIGN_TEXTS } from "../content";

type TiledObject = Phaser.Types.Tilemaps.TiledObject;

const getProp = (obj: TiledObject, name: string) =>
  (obj.properties as { name: string; value: unknown }[] | undefined)?.find(
    (p) => p.name === name
  )?.value;

// A fonte bitmap (pixelop) não tem glifos acentuados — remove os acentos (ç -> c, ã -> a...)
export const stripAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Os mapas/assets s\u00e3o fixos: se algo essencial faltar \u00e9 erro de asset, n\u00e3o de l\u00f3gica
function must<T>(value: T | null | undefined, what: string): T {
  if (value == null) throw new Error(`Asset do jogo ausente: ${what}`);
  return value;
}

export class BaseScene extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Player;
  signs: Sign[] = [];
  bigSign!: BigSign;
  showingSign = false;
  private layerToCollide!: Phaser.Tilemaps.TilemapLayer;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<"w" | "a" | "s" | "d", Phaser.Input.Keyboard.Key>;

  setLoading(visible: boolean) {
    this.game.events.emit("game-loading", visible);
  }

  createWorld(tilemapKey: string) {
    // ----------------
    // MAPA E TILESET (imagem extrudada: margem 1, espaçamento 2)
    this.map = this.make.tilemap({ key: tilemapKey });
    const tileset = must(
      this.map.addTilesetImage("tileset", "TilesetImage", 32, 32, 1, 2),
      "tileset"
    );

    this.map.createLayer("Ground1", tileset, 0, 0);
    this.map.createLayer("Ground2", tileset, 0, 0);
    this.map.createLayer("Collision1", tileset, 0, 0);
    this.map.createLayer("Collision2", tileset, 0, 0);
    must(this.map.createLayer("Above", tileset, 0, 0), "camada Above").setDepth(10);
    this.layerToCollide = must(
      this.map.createLayer("CollisionLayer", tileset, 0, 0),
      "camada CollisionLayer"
    );
    this.layerToCollide.setVisible(false);

    // ----------------
    // JOGADOR
    const spawnPoint = must(
      this.map.findObject("Objects", (obj) => obj.name === "Spawn Point"),
      "Spawn Point"
    );
    this.player = new Player(
      this,
      spawnPoint.x ?? 0,
      spawnPoint.y ?? 0,
      "atlas",
      "ariel-front"
    );

    // ----------------
    // CÂMERA E TECLADO
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    const keyboard = must(this.input.keyboard, "teclado");
    this.cursors = keyboard.createCursorKeys();
    this.wasd = {
      w: keyboard.addKey("W"),
      a: keyboard.addKey("A"),
      s: keyboard.addKey("S"),
      d: keyboard.addKey("D"),
    };

    this.scale.on("resize", this.resize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off("resize", this.resize, this);
    });

    // ----------------
    // OBJETOS INTERATIVOS (textos do Wagner via SIGN_TEXTS/DOOR_LINKS)
    this.signs = [];
    this.showingSign = false;
    must(this.map.getObjectLayer("Objects"), "camada Objects").objects.forEach((o) => {
      const key = `${this.scene.key}:${o.id}`;
      const x = o.x ?? 0;
      const y = o.y ?? 0;

      if (o.name === "door") {
        const link = Boolean(getProp(o, "link"));
        const destination = link
          ? DOOR_LINKS[key] ?? "#"
          : String(getProp(o, "destination"));
        new Door(this, Math.round(x), Math.round(y), o.width ?? 32, o.height ?? 32, destination, link);
      } else if (o.name === "bigSign") {
        this.bigSign = new BigSign(
          this,
          Math.round(x),
          Math.round(y),
          o.width ?? 32,
          o.height ?? 32,
          Number(getProp(o, "signX")),
          Number(getProp(o, "signY")),
          Number(getProp(o, "sm_signX")),
          Number(getProp(o, "sm_signY")),
          stripAccents(SIGN_TEXTS[key] ?? String(getProp(o, "text")))
        );
      } else if (o.name === "sign") {
        this.signs.push(
          new Sign(
            this,
            x,
            y,
            stripAccents(SIGN_TEXTS[key] ?? String(getProp(o, "text"))),
            String(getProp(o, "direction"))
          )
        );
      }
    });
  }

  resize(gameSize: Phaser.Structs.Size) {
    this.cameras.resize(gameSize.width, gameSize.height);
  }

  collideWithWorld() {
    // Tem que vir depois dos outros colliders para que eles detectem
    this.physics.add.collider(this.player, this.layerToCollide);
    this.layerToCollide.setCollisionBetween(40, 41);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
  }

  update() {
    let moveleft = false;
    let moveright = false;
    let moveup = false;
    let movedown = false;

    // ----------------
    // MOVIMENTO POR MOUSE/TOQUE
    const pointer = this.input.activePointer;
    if (pointer.primaryDown) {
      // getWorldPoint para acompanhar a câmera mesmo com o mouse parado
      const pointerPosition = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

      if (Math.abs(pointerPosition.x - this.player.x) > 15) {
        if (pointerPosition.x > this.player.x) moveright = true;
        else moveleft = true;
      }
      if (Math.abs(pointerPosition.y - this.player.y) > 15) {
        if (pointerPosition.y > this.player.y) movedown = true;
        else moveup = true;
      }
    }

    // ----------------
    // MOVIMENTO POR TECLADO
    if (this.cursors.left.isDown || this.wasd.a.isDown) moveleft = true;
    else if (this.cursors.right.isDown || this.wasd.d.isDown) moveright = true;

    if (this.cursors.up.isDown || this.wasd.w.isDown) moveup = true;
    else if (this.cursors.down.isDown || this.wasd.s.isDown) movedown = true;

    this.player.walk(moveleft, moveright, moveup, movedown);

    // ----------------
    // ESCONDE AS PLACAS AO SE MOVER
    if (this.showingSign && (moveleft || moveright || moveup || movedown)) {
      this.signs.forEach((sign) => {
        if (sign.activated) sign.playerMovement(moveleft, moveright, moveup, movedown);
      });
    }
    this.bigSign.hideSignText(this.player);
  }
}
