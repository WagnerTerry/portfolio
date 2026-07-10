import Profile from "../src/assets/profile.png";
import Motorcycle from "../src/assets/motorcycle-cover.png";
import DiskPizza from "../src/assets/disk-pizza.png";
import Dictionary from "../src/assets/dictionary.png";
import StackFrontend from "../src/assets/stack-frontend.svg";
import StackBackend from "../src/assets/stack-backend.svg";
import StackMobile from "../src/assets/stack-mobile.svg";
import PhotoContact from "../src/assets/photo-contact.jpeg";
import Curriculum from "./data/curriculo do Wagner.pdf";

import { useState } from "react";

import { Project } from "./components/Project";
import { Skills } from "./components/Skills";
import { GameMode } from "./game/GameMode";

const NAV_LINKS = [
  { href: "#about", label: "SOBRE" },
  { href: "#projects", label: "PROJETOS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTATO" },
];

function SectionTitle(props: { stage: string; title: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5 mb-10 sm:mb-14">
      <span className="font-press-start text-neon-magenta text-[9px] sm:text-xs shrink-0">
        {props.stage}
      </span>
      <h2 className="font-press-start text-white neon-text text-base sm:text-2xl m-0 shrink-0">
        {props.title}
      </h2>
      <div className="flex-1 h-1 min-w-8 bg-gradient-to-r from-neon-cyan/70 to-transparent" />
    </div>
  );
}

function App() {
  const [gameMode, setGameMode] = useState(false);

  if (gameMode) {
    return <GameMode onExit={() => setGameMode(false)} />;
  }

  return (
    <div className="scanlines min-h-screen">
      <button
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[100] pixel-btn bg-game-purple text-white animate-game-pulse hover:bg-game-red"
        onClick={() => setGameMode(true)}
        title="Jogue o portfólio em modo game!"
      >
        🎮 MODO GAME
      </button>

      <header className="fixed top-0 inset-x-0 z-50 bg-hud-bg/90 backdrop-blur border-b-2 border-neon-cyan/40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <a
            href="#about"
            className="font-press-start text-neon-cyan neon-text text-xs sm:text-sm no-underline"
          >
            WAGNER.EXE
          </a>
          <nav>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-8 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-press-start text-[9px] sm:text-[11px] no-underline text-slate-300 transition-colors hover:text-neon-yellow"
                  >
                    ▸ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <section
          id="about"
          className="scroll-mt-28 pt-32 sm:pt-44 pb-16 sm:pb-24 grid gap-12 md:grid-cols-2 items-center"
        >
          <div className="text-center md:text-left">
            <p className="font-press-start text-neon-green text-[10px] sm:text-xs mb-6 sm:mb-8">
              PLAYER 1 — READY <span className="animate-game-blink">▮</span>
            </p>
            <h1 className="font-press-start text-white text-base sm:text-xl lg:text-2xl leading-[2] m-0">
              E AÍ, TUDO BEM?
              <br />
              ME CHAMO{" "}
              <span className="text-neon-cyan neon-text">WAGNER</span>,
              <br />
              SOU{" "}
              <span className="text-[#ffd700] neon-text">
                DEV FULLSTACK
              </span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-slate-300 max-w-md mx-auto md:mx-0">
              +4 anos construindo interfaces, APIs e apps. Explore as missões
              abaixo ou aperte start para jogar o portfólio.
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#projects" className="pixel-btn bg-neon-cyan text-hud-bg">
                ▶ VER PROJETOS
              </a>
              <button
                className="pixel-btn bg-game-purple text-white hover:bg-game-red"
                onClick={() => setGameMode(true)}
              >
                🎮 MODO GAME
              </button>
            </div>
          </div>

          <div className="relative justify-self-center animate-neon-float">
            <div
              aria-hidden
              className="absolute inset-0 border-4 border-neon-magenta/60 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4"
            />
            <img
              src={Profile}
              alt="Foto de perfil"
              className="relative block w-64 sm:w-80 lg:w-96 max-w-full border-4 border-neon-cyan bg-hud-panel shadow-[0_0_35px_rgba(0,245,255,0.25)]"
            />
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-16 sm:py-24">
          <SectionTitle stage="STAGE 01" title="PROJETOS" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Project
              title="Gestão e Estoque"
              subtitle="Sistema web para controle de estoque de loja de motopeças."
              image={Motorcycle}
              alt="Imagem do sistema de motopeças"
              techs={["ReactJs", "TypeScript", "NodeJs", "MongoDB"]}
              link="https://github.com/WagnerTerry/moto-pecas-projeto"
            />
            <Project
              title="Pizzaria"
              subtitle="Sistema web para controle do fluxo de caixa e pedidos de uma pizzaria."
              image={DiskPizza}
              alt="Imagem do sistema de pizzaria"
              techs={["ReactJs", "NodeJs", "MySQL"]}
              link="https://github.com/WagnerTerry/new_disk_pizza"
            />
            <Project
              title="Dicionário em Inglês"
              subtitle="Dicionário em inglês, com significados e fonéticas."
              image={Dictionary}
              alt="Imagem do projeto dicionário"
              techs={["React Native", "TypeScript", "Async Storage", "Axios"]}
              link="https://github.com/WagnerTerry/challenge-coodesh-mobile"
            />
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 py-16 sm:py-24">
          <SectionTitle stage="STAGE 02" title="SKILLS" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Skills
              title="Frontend"
              description="Mais de 4 anos de experiência criando interfaces em diversos ambientes."
              techs={[
                "HTML5",
                "CSS",
                "Sass",
                "Styled Components",
                "JavaScript",
                "TypeScript",
                "Angular",
                "Vue",
                "React",
                "NextJs",
              ]}
              image={StackFrontend}
              alt="Stacks Frontend"
            />
            <Skills
              title="Backend"
              description="APIs, bancos de dados e infraestrutura de serviços."
              techs={[
                "NodeJs",
                "NestJs",
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Docker",
                "Swagger",
              ]}
              image={StackBackend}
              alt="Stacks Backend"
            />
            <Skills
              title="Mobile"
              description="Apps híbridos e multiplataforma."
              techs={["React Native", "Flutter", "Ionic"]}
              image={StackMobile}
              alt="Stacks Mobile"
            />
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16 sm:py-24">
          <SectionTitle stage="FINAL BOSS" title="CONTATO" />
          <div className="bg-hud-panel border-4 border-hud-line shadow-[8px_8px_0_#000] p-6 sm:p-10 grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] items-center">
            <div className="relative justify-self-center md:justify-self-start w-full max-w-[420px]">
              <div
                aria-hidden
                className="absolute inset-0 border-4 border-neon-cyan/50 translate-x-3 translate-y-3"
              />
              <img
                src={PhotoContact}
                alt="Foto de contato"
                className="relative block w-full border-4 border-neon-magenta object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 text-center md:text-left">
              <h3 className="font-press-start text-white text-sm sm:text-lg leading-[2] m-0">
                VAMOS TOMAR UM{" "}
                <span className="text-neon-yellow neon-text">CAFÉ?</span>
              </h3>
              <div className="text-xl sm:text-2xl text-slate-300 leading-relaxed">
                <p className="m-0">📟 21 97484-1079</p>
                <p className="m-0 break-all">✉ goncalveswagner15@gmail.com</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="https://www.linkedin.com/in/wagner-sgonçalves"
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn bg-[#0077b5] text-white"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/WagnerTerry"
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn bg-[#24292e] text-white"
                >
                  GITHUB
                </a>
                <a
                  href={Curriculum}
                  download="Currículo do Wagner"
                  rel="noreferrer"
                  className="pixel-btn bg-neon-green text-hud-bg"
                >
                  CURRÍCULO ⬇
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-neon-cyan/30 py-8 px-4 text-center">
        <p className="font-press-start text-[8px] sm:text-[10px] text-slate-400 m-0 leading-loose">
          © 2026 WAGNER GONÇALVES — INSERT COIN TO CONTINUE{" "}
          <span className="animate-game-blink">▮</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
