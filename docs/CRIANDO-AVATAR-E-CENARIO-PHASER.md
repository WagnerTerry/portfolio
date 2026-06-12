# 🎨 Guia: criando seu personagem e cenário (Phaser + Tiled)

O Modo Game usa **Phaser 3** com assets de imagem: o personagem é um **atlas de sprites**
(PNG + JSON) e o cenário é um **mapa criado no editor Tiled** (JSON) com um **tileset** (PNG).
Este guia mostra como criar os seus e encaixar no projeto — substituindo os assets atuais.

---

## 1. Como o projeto está organizado

| O quê | Arquivo(s) | Quem carrega |
|---|---|---|
| **Personagem** (frames de andar/acenar) | `public/game/player.png` + `player.json` | `scenes.ts` → `load.atlas("atlas", ...)` |
| **Tileset** (imagem com os blocos do cenário) | `public/game/tileset_extruded.png` | `scenes.ts` → `load.image("TilesetImage", ...)` |
| **Mapas** (onde cada tile/objeto fica) | `public/game/*-new.json` (feitos no Tiled) | `scenes.ts` → `load.tilemapTiledJSON(...)` |
| **Textos das placas e links das portas** | `src/game/content.ts` (`SIGN_TEXTS`, `DOOR_LINKS`) | `base-scene.ts` |
| **Fonte dos balões** | `public/game/pixelop.png` + `pixelop.xml` | `scenes.ts` → `load.bitmapFont(...)` |
| **Animações de UI** (tiles roxos etc.) | `public/game/anims_ui.png` + `anims_ui.json` | `scenes.ts` |
| **Lógica das cenas** | `src/game/phaser/` (`base-scene`, `scenes`, `player`, `sign`, `bigsign`, `door`) | — |

> Para um jogo **menor e mais simples**: mantenha só a `OverworldScene` (remova as outras
> cenas de `createGame.ts` e de `scenes.ts`) e crie UM mapa pequeno no Tiled com casa,
> baús e portas com link (GitHub/LinkedIn) — sem interiores.

---

## 2. Criando o PERSONAGEM

### 2.1 O que o jogo espera

O personagem é um **atlas**: uma imagem `player.png` com todos os quadros e um `player.json`
dizendo onde cada quadro está. O código ([player.ts](../src/game/phaser/player.ts)) procura
estes nomes de frame (25 no total, hoje com ~32×41 px cada — pode usar outro tamanho):

```
ariel-front            ariel-back            ariel-left            ariel-right
ariel-front-walk.000   ariel-back-walk.000   ariel-left-walk.000   ariel-right-walk.000
ariel-front-walk.001   ariel-back-walk.001   ariel-left-walk.001   ariel-right-walk.001
ariel-front-walk.002   ariel-back-walk.002   ariel-left-walk.002   ariel-right-walk.002
ariel-front-walk.003   ariel-back-walk.003   ariel-left-walk.003   ariel-right-walk.003
ariel-wave.000 ... ariel-wave.004   (acenando, usado na tela inicial)
```

Ou seja: **1 quadro parado + 4 de caminhada para cada direção** (frente, costas, esquerda,
direita) + 5 acenando. Você pode renomear o prefixo (ex.: `wagner-front`) — basta trocar
o prefixo nas `anims.create` de `player.ts` e nos `setTexture("atlas", ...)` das cenas.

> Se mudar o tamanho do quadro, ajuste também a caixa de colisão em `player.ts`:
> `this.body.setSize(26, 41)` (largura/altura dos "pés" do personagem).

### 2.2 Desenhando os quadros (estilo livre, não precisa ser pixelado)

| Ferramenta | Tipo | Indicação |
|---|---|---|
| **[Krita](https://krita.org/)** | desktop, grátis | desenho digital completo (estilo cartoon/HD) |
| **[Photopea](https://www.photopea.com/)** | navegador, grátis | "Photoshop" online, abre PSD |
| **[Inkscape](https://inkscape.org/)** | desktop, grátis | vetor (escala sem perder qualidade) |
| **[Piskel](https://www.piskelapp.com/)** / **[Aseprite](https://www.aseprite.org/)** | navegador / pago | se um dia quiser estilo pixel |

Dicas:
- Desenhe um quadro base de frente e derive os outros (costas = sem rosto, lados = perfil)
- A caminhada com 4 quadros é: passo direito → neutro → passo esquerdo → neutro
- Exporte cada quadro como **PNG com fundo transparente**, todos do mesmo tamanho
- Tamanho bom para este mapa: entre **32×48 e 48×64 px** por quadro

**Não quer desenhar?** Pacotes prontos de personagens top-down (confira a licença, prefira CC0):
[itch.io](https://itch.io/game-assets/free/tag-top-down) (busque "top down character"),
[kenney.nl](https://kenney.nl/assets) (tudo CC0), [OpenGameArt](https://opengameart.org/),
[Universal LPC Generator](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/)
(gera personagem com caminhada nas 4 direções).

### 2.3 Empacotando os quadros no atlas (PNG + JSON)

Use um empacotador gratuito e nomeie cada quadro com os nomes da seção 2.1:

1. **[Free Texture Packer](https://free-tex-packer.com/)** (desktop/web, grátis)
   — arraste os PNGs, renomeie os frames, exporte no formato **JSON (hash)** → gera `player.png` + `player.json`
2. **[Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool/)** (navegador)
   — alternativa simples, exporta JSON-TP-Hash

Salve os dois arquivos em `public/game/` substituindo os atuais. Pronto: o jogo já usa.

> Alternativa sem atlas: se preferir um spritesheet em grade fixa, troque o `load.atlas`
> por `this.load.spritesheet("atlas", "...", { frameWidth: 32, frameHeight: 48 })` e use
> números de frame nas animações em vez de nomes.

---

## 3. Criando o CENÁRIO (editor Tiled)

### 3.1 Instale o Tiled e prepare um tileset

1. Baixe o **[Tiled](https://www.mapeditor.org/)** (grátis) — é o editor de mapas que o Phaser lê nativamente
2. Consiga um **tileset**: uma imagem com blocos de **32×32 px** (grama, casa, baú, árvore...)
   - Prontos (CC0): [kenney.nl/assets?q=rpg](https://kenney.nl/assets?q=rpg), itch.io ("32x32 tileset top down"), OpenGameArt
   - Ou desenhe o seu no Krita/Photopea: uma grade onde cada célula 32×32 é um bloco
3. **Extrusão** (evita riscos entre os tiles ao renderizar): com o tileset pronto, rode
   ```bash
   npx tile-extruder --tileWidth 32 --tileHeight 32 --input tileset.png --output tileset_extruded.png
   ```
   e salve o resultado em `public/game/`. O projeto já carrega com as margens corretas
   (`addTilesetImage("tileset", "TilesetImage", 32, 32, 1, 2)` em `base-scene.ts`).

### 3.2 Crie o mapa

1. Tiled → **New Map**: orientação Orthogonal, tiles 32×32, tamanho pequeno (ex.: **25×16 tiles** = 800×512 px)
2. **New Tileset**: importe o `tileset.png` ORIGINAL (sem extrusão) e nomeie **exatamente `tileset`**
   (é o nome que o código procura)
3. Crie estas **camadas de tiles**, com estes nomes exatos (o código as procura uma a uma):

| Camada | Para quê |
|---|---|
| `Ground1` | chão base (grama, terra) |
| `Ground2` | detalhes do chão (flores, caminho) |
| `Collision1` | objetos que bloqueiam (casa, baú, árvore) |
| `Collision2` | segunda camada de objetos |
| `Above` | o que fica POR CIMA do jogador (copa de árvore, telhado) |
| `CollisionLayer` | camada invisível: pinte com o tile marcador onde NÃO se pode andar |

4. **Colisão**: escolha um tile qualquer do seu tileset para ser o "marcador de parede" e
   pinte a `CollisionLayer` com ele. Veja o **ID** dele no Tiled (selecione o tile no tileset)
   e ajuste em [base-scene.ts](../src/game/phaser/base-scene.ts):
   ```ts
   this.layerToCollide.setCollisionBetween(40, 41); // troque pelos IDs do seu tileset (+1 do ID do Tiled)
   ```

5. Crie uma **camada de objetos** chamada `Objects` e adicione:

| Objeto | Como criar | Propriedades customizadas |
|---|---|---|
| **Spawn Point** | ponto, nome `Spawn Point` | — |
| **Porta com link** (GitHub/LinkedIn) | retângulo, nome `door` | `destination` (string, qualquer id) e `link` (bool, `true`) |
| **Porta para outra cena** (se usar interiores) | retângulo, nome `door` | `destination` = nome da cena, `link` = `false` |
| **Placa/baú com texto** | retângulo 32×32, nome `sign` | `text` (string) e `direction` (`up`, `down` ou `center`) |
| **Aviso grande** (tile que brilha) | retângulo, nome `bigSign` | `text`, `signX`, `signY`, `sm_signX`, `sm_signY` (posições do balão em px) |

6. **File → Export As → JSON** → salve em `public/game/` (ex.: `meu-mapa.json`)

### 3.3 Aponte o jogo para o seu mapa

Em [scenes.ts](../src/game/phaser/scenes.ts), na `OverworldScene`:

```ts
preload() {
  this.load.image("TilesetImage", `${ASSETS}tileset_extruded.png`);
  this.load.tilemapTiledJSON("OverworldMap", `${ASSETS}meu-mapa.json`); // seu mapa
  ...
}
create() {
  ...
  // tamanho do SEU mapa em pixels (largura×altura de tiles × 32)
  this.physics.world.setBounds(0, 0, 800, 512);
  this.cameras.main.setBounds(0, 0, 800, 512);
}
```

Para **um mapa só** (sem prédios/interiores): em `createGame.ts` deixe apenas
`scene: [OverworldScene]` e apague as outras cenas de `scenes.ts`.

### 3.4 Os textos e links ficam no código

Os textos das placas podem vir do próprio Tiled (propriedade `text`), mas o projeto permite
sobrescrever por código em [content.ts](../src/game/content.ts), usando o **ID do objeto**
(visível no Tiled ao selecionar o objeto):

```ts
export const SIGN_TEXTS: Record<string, string> = {
  "OverworldScene:13": "Bem-vindo ao meu portfólio!", // cena : id do objeto no Tiled
};

export const DOOR_LINKS: Record<string, string> = {
  "OverworldScene:18": LINKS.github,   // porta com link=true abre essa URL
  "OverworldScene:19": LINKS.linkedin,
};
```

> **Acentos**: a fonte bitmap atual (`pixelop`) não tem acentos — o código remove
> automaticamente (`stripAccents` em `base-scene.ts`). Para ter acentos, gere sua própria
> fonte bitmap em **[snowb.org](https://snowb.org/)** (escolha uma fonte do Google Fonts,
> inclua os caracteres `áàâãéêíóôõúüç`), exporte PNG + XML substituindo
> `pixelop.png`/`pixelop.xml`, e remova o uso de `stripAccents`.

---

## 4. Fluxo resumido

1. **Personagem**: desenhe/baixe os quadros → empacote no Free Texture Packer com os nomes
   esperados → substitua `public/game/player.png` + `player.json`
2. **Tileset**: desenhe/baixe blocos 32×32 → extrude com `tile-extruder` → `public/game/tileset_extruded.png`
3. **Mapa**: monte no Tiled (camadas + objetos da seção 3.2) → exporte JSON → `public/game/`
4. **Código**: aponte o preload para o novo mapa, ajuste bounds e IDs de colisão,
   edite textos/links em `content.ts`
5. `npm run dev` → 🎮 Modo Game → teste andar, placas, portas e colisões

## 5. Checklist de licenças

- Prefira assets **CC0** (kenney.nl, OpenGameArt filtrado) — uso livre sem atribuição
- Assets **CC-BY** exigem crédito (um agradecimento no README resolve)
- **Nunca** use sprites de jogos comerciais (Pokémon, RPG Maker sem licença etc.) em site público
