import Play from "../src/assets/play.svg";
import Profile from "../src/assets/profile.png";
import Motorcycle from "../src/assets/motorcycle-cover.png";
import DiskPizza from "../src/assets/disk-pizza.png";
import Dictionary from "../src/assets/dictionary.png";
import StackFrontend from "../src/assets/stack-frontend.svg";
import StackBackend from "../src/assets/stack-backend.svg";
import StackMobile from "../src/assets/stack-mobile.svg";
import PhotoContact from "../src/assets/photo-contact.jpeg";
import Linkedin from "../src/assets/linkedin.jpeg";
import Github from "../src/assets/github.png";
import CurriculumIcon from "../src/assets/icone-curriculo.png";
import Curriculum from "../src/data/curriculo do Wagner.pdf";

import { useState } from "react";

import { Project } from "./components/Project";
import { Skills } from "./components/Skills";
import { GameMode } from "./game/GameMode";

function App() {
  const [gameMode, setGameMode] = useState(false);

  if (gameMode) {
    return <GameMode onExit={() => setGameMode(false)} />;
  }

  return (
    <div>
      <button
        className="fixed right-6 bottom-6 z-[100] font-press-start text-[12px] text-white bg-game-purple border-[3px] border-game-dark shadow-[4px_4px_0_#1a1c2c] px-[18px] py-[14px] cursor-pointer animate-game-pulse hover:bg-game-red active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#1a1c2c]"
        onClick={() => setGameMode(true)}
        title="Jogue o portfólio em modo game!"
      >
        🎮 Modo Game
      </button>

      <div id="about" className="p-8">
        <header className="flex justify-between items-center flex-wrap max-[750px]:flex-col max-[750px]:items-center max-[750px]:mb-8">
          <div className="flex items-end text-black font-michroma flex-col">
            <strong className="text-[30pt] font-normal max-[450px]:text-[22pt]">
              Wagner
            </strong>
            <strong className="text-[18pt] font-normal -mt-2 -mr-1.5 max-[450px]:text-[14pt]">
              Gonçalves
            </strong>
          </div>

          <nav className="w-[48%] max-[750px]:w-auto">
            <ul className="list-none flex justify-around gap-6 m-0 p-0 text-[14pt] mt-5">
              <li>
                <a
                  href="#about"
                  className="no-underline text-black hover:text-[#09e1bd]"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="no-underline text-black hover:text-[#09e1bd]"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="no-underline text-black hover:text-[#09e1bd]"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="no-underline text-black hover:text-[#09e1bd]"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="mt-20 flex items-center max-[750px]:flex-col">
          <div className="w-[40%] max-[750px]:w-full max-[750px]:text-center">
            <span className="text-black text-[56px] font-bold max-[750px]:text-[40px] max-[450px]:text-[30px]">
              E aí, <br />
              tudo bem? <br />
              Me chamo <br />
              Wagner, Sou <br />
              <strong className="text-[#1c8af8]">Dev FullStack</strong>
            </span>

            <div className="flex items-center mt-4 cursor-pointer max-[750px]:justify-center">
              <img
                src={Play}
                alt="Ícone para ver os projetos."
                className="w-[38px] h-[38px]"
              />
              <span className="text-[25px] font-normal ml-4 max-[450px]:text-[18px]">
                Confira meus Projetos!
              </span>
            </div>
          </div>

          <div className="flex-1 text-center max-[750px]:w-full max-[750px]:mt-8">
            <img src={Profile} alt="Foto de perfil" className="max-w-full" />
          </div>
        </div>
      </div>

      <div
        id="projects"
        className="mt-20 bg-[#f6f1f1] shadow-[inset_0px_5px_32px_rgba(0,0,0,0.3)] transition-shadow duration-300 ease-in-out p-8"
      >
        <h1 className="text-center font-press-start text-[26px] max-[750px]:text-[18pt] max-[450px]:text-[14pt] [text-shadow:3px_3px_0_rgba(13,149,248,0.35)]">
          Projetos
        </h1>

        <div className="mt-20">
          <Project
            className="flex justify-around mb-[109px] max-[750px]:flex-col max-[750px]:items-center"
            title="Sistema de gestão e estoque"
            subtitle="Sistema web para controle de estoque, de loja de motopeças"
            image={Motorcycle}
            alt="Imagem do sistema de motopeças"
            developed="Sistema desenvolvido em ReactJs, Typescript, NodeJs e MongoDB"
            link="https://github.com/WagnerTerry/moto-pecas-projeto"
          />

          <Project
            className="flex justify-around mb-[109px] flex-row-reverse max-[750px]:flex-col max-[750px]:items-center"
            title="Pizzaria"
            subtitle="Sistema web para controle do fluxo de caixa e pedidos de uma pizzaria."
            image={DiskPizza}
            alt="Imagem do sistema de pizzaria"
            developed="Sistema desenvolvido em ReactJs, NodeJs e MySQL"
            link="https://github.com/WagnerTerry/new_disk_pizza"
          />

          <Project
            className="flex justify-around mb-[109px] max-[750px]:flex-col max-[750px]:items-center"
            title="Dicionário em Inglês"
            subtitle="Dicionário em inglês , com significados e fonéticas. "
            image={Dictionary}
            alt="Imagem do projeto dicionário"
            developed="Sistema desenvolvido em React Native, Typescript, Async Storage e Axios"
            link="https://github.com/WagnerTerry/challenge-coodesh-mobile"
          />
        </div>
      </div>

      <div id="skills" className="mt-10 bg-white p-8">
        <h1 className="text-center font-press-start text-[26px] max-[750px]:text-[18pt] max-[450px]:text-[14pt] [text-shadow:3px_3px_0_rgba(13,149,248,0.35)]">
          Skills
        </h1>

        <div className="mt-20">
          <Skills
            className="flex justify-around items-center mb-[109px] max-[750px]:flex-col"
            title="Frontend Developer"
            subtitle={`Sou Desenvolvedor com mais de 4 anos de experiência trabalhando em diversos ambientes, como: \n
             HTML5, CSS, Sass, Styled Components, Javascript, Typescript,
             Angular, Vue, React, NextJs`}
            image={StackFrontend}
            alt="Stacks Frontend"
          />

          <Skills
            className="flex justify-around items-center mb-[109px] flex-row-reverse max-[750px]:flex-col"
            title="Backend Developer"
            subtitle="NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Swagger"
            image={StackBackend}
            alt="Stacks Backend"
          />

          <Skills
            className="flex justify-around items-center mb-[109px] max-[750px]:flex-col"
            title="Mobile Developer"
            subtitle="React Native, Flutter e Ionic"
            image={StackMobile}
            alt="Stacks Mobile"
          />
        </div>
      </div>

      <div
        id="contact"
        className="mt-20 bg-[#f6f1f1] shadow-[inset_0px_5px_32px_rgba(0,0,0,0.3)] transition-shadow duration-300 ease-in-out p-8"
      >
        <h1 className="text-center font-press-start text-[26px] max-[750px]:text-[18pt] max-[450px]:text-[14pt] [text-shadow:3px_3px_0_rgba(13,149,248,0.35)]">
          Contato
        </h1>

        <div className="mt-[120px]">
          <div className="flex justify-around mb-[109px] max-[750px]:flex-col max-[750px]:items-center">
            <div className="border-[14px] border-[#0d95f8] shadow-[0px_4px_18px_0px_rgba(0,0,0,0.25)] shrink-0 max-w-[526px] max-[750px]:max-w-full max-[750px]:w-full">
              <img
                src={PhotoContact}
                alt="Foto de contato"
                className="flex w-full h-full max-w-[550px] max-h-[400px]"
              />
            </div>
            <div className="px-8 flex flex-col justify-around max-[750px]:mt-8 max-[750px]:px-4 max-[750px]:w-full">
              <strong className="text-[56px] font-bold max-[750px]:text-[36px] max-[450px]:text-[28px]">
                Vamos tomar um{" "}
                <span className="text-[56px] text-[#0d95f8] max-[750px]:text-[36px] max-[450px]:text-[28px]">
                  Café?
                </span>
              </strong>
              <br />
              <span className="text-[27px] leading-[40px] max-[750px]:text-[20px]">
                21 974841079 <br /> goncalveswagner15@gmail.com
              </span>
              <br />
              <div className="flex justify-around items-center">
                <a
                  href={"https://www.linkedin.com/in/wagner-sgonçalves"}
                  target="_blank"
                >
                  <img
                    src={Linkedin}
                    alt="Ver perfil no Linkedin"
                    className="max-w-[80px]"
                  />
                </a>
                <a href={"https://github.com/WagnerTerry"} target="_blank">
                  <img src={Github} alt="Ver Github" className="max-w-[80px]" />
                </a>
                <a
                  href={Curriculum}
                  download="Currículo do Wagner"
                  rel="noreferrer"
                >
                  <img
                    src={CurriculumIcon}
                    alt="Baixar Currículo"
                    className="max-w-[80px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
