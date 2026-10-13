// Ícones em SVG no lugar dos caracteres Unicode (▶ ▸ ⬇ ▮): a fonte Press Start 2P não
// tem esses glifos, e o fallback do sistema saía pequeno e desalinhado nos botões.

type ArrowProps = {
  direction?: "right" | "down" | "left" | "up";
  /** tamanho relativo ao texto (em) */
  size?: number;
  className?: string;
};

const ROTATION = { right: 0, down: 90, left: 180, up: 270 };

// Os ícones usam a mesma grade da Press Start 2P (8 unidades por em, maiúsculas nas
// linhas 0–7), então ficam com a altura e a posição das letras ao lado.
// Pelas métricas da fonte, as letras ficam meia unidade acima do centro da linha;
// o NUDGE sobe o ícone o mesmo tanto para alinhar com elas.
const NUDGE = "translateY(-0.0625em)";

/** Seta triangular pixelada, alinhada ao meio do texto. */
export function Arrow({ direction = "right", size = 1, className = "" }: ArrowProps) {
  const rotation = ROTATION[direction];
  return (
    <svg
      viewBox="0 0 8 8"
      width={`${size}em`}
      height={`${size}em`}
      className={`inline-block shrink-0 fill-current ${className}`}
      style={{ transform: rotation ? `${NUDGE} rotate(${rotation}deg)` : NUDGE }}
      aria-hidden
    >
      <path d="M2 0 H3 V1 H4 V2 H5 V3 H6 V4 H5 V5 H4 V6 H3 V7 H2 Z" />
    </svg>
  );
}

/** Controle de videogame pixelado, na cor do texto. */
export function Gamepad({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 11 8"
      width="1.375em"
      height="1em"
      className={`inline-block shrink-0 fill-current ${className}`}
      fillRule="evenodd"
      style={{ transform: NUDGE }}
      aria-hidden
    >
      <path d="M2 0 H9 V1 H10 V2 H11 V7 H7 V6 H4 V7 H0 V2 H1 V1 H2 Z M2 2 H3 V3 H4 V4 H3 V5 H2 V4 H1 V3 H2 Z M8 2 H9 V3 H8 Z M7 3 H8 V4 H7 Z M9 3 H10 V4 H9 Z M8 4 H9 V5 H8 Z" />
    </svg>
  );
}

/** Cursor de terminal piscando (bloco), na cor do texto. */
export function Cursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[0.6em] h-[1em] align-middle bg-current animate-game-blink ${className}`}
      aria-hidden
    />
  );
}
