import { useState, useEffect, useCallback } from "react";

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
import { FaBars } from 'react-icons/fa';


import { Project } from "./components/Project";
import { Skills } from "./components/Skills";

import "./App.scss";

function App() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [, setVisible] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 120);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div id="portfolio">
      <div id="about">
        <header>
          <div className="full_name">
            <strong className="first_name">Wagner</strong>
            <strong className="last_name">Gonçalves</strong>
          </div>

          {/* Adicione estilos condicionais para o ícone do menu em dispositivos móveis */}
          <div className={`menu ${menuVisible ? "open" : ""}`} onClick={toggleMenu}>
            <FaBars />
          </div>

          <nav className={`navbar ${menuVisible ? "visible" : "hidden"}` } onClick={toggleMenu}>
            <ul>
              <li>
                <a href="#about">Sobre</a>
              </li>
              <li>
                <a href="#projects">Projetos</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </nav>

        </header>

        <div className="presentation">
          <div className="presentation-text">
            <span>
              E aí, <br />
              tudo bem? <br />
              Me chamo <br />
              Wagner, Sou <br />
              <strong>Dev FullStack</strong>
            </span>

            <div className="my-projects">
              <a href="#projects">
                <img src={Play} alt="Ícone para ver os projetos." />
                <span>Confira meus Projetos!</span>
              </a>
            </div>
          </div>

          <div className="profile-picture">
            <img src={Profile} alt="Foto de perfil" />
          </div>
        </div>
      </div>

      <div id="projects">
        <h1>Projetos</h1>

        <div className="show-projects">
          <Project
            className="container"
            title="Sistema de gestão e estoque"
            subtitle="Sistema web para controle de estoque, de loja de motopeças"
            image={Motorcycle}
            alt="Imagem do sistema de motopeças"
            developed="Sistema desenvolvido em ReactJs, Typescript, NodeJs e MongoDB"
            link="https://github.com/WagnerTerry/moto-pecas-projeto"
          />

          <Project
            className="container reverse-container"
            title="Pizzaria"
            subtitle="Sistema web para controle do fluxo de caixa e pedidos de uma pizzaria."
            image={DiskPizza}
            alt="Imagem do sistema de pizzaria"
            developed="Sistema desenvolvido em ReactJs, NodeJs e MySQL"
            link="https://github.com/WagnerTerry/new_disk_pizza"
          />

          <Project
            className="container"
            title="Dicionário em Inglês"
            subtitle="Dicionário em inglês , com significados e fonéticas. "
            image={Dictionary}
            alt="Imagem do projeto dicionário"
            developed="Sistema desenvolvido em React Native, Typescript, Async Storage e Axios"
            link="https://github.com/WagnerTerry/challenge-coodesh-mobile"
          />
        </div>
      </div>

      <div id="skills">
        <h1>Skills</h1>

        <div className="present-skills">
          <Skills
            className="container"
            title="Frontend Developer"
            subtitle={`Sou Desenvolvedor com mais de 4 anos de experiência trabalhando em diversos ambientes, como: \n
             HTML5, CSS, Sass, Styled Components, Javascript, Typescript,
             Angular, Vue, React, NextJs`}
            image={StackFrontend}
            alt="Stacks Frontend"
          />

          <Skills
            className="container reverse-container"
            title="Backend Developer"
            subtitle="NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Prisma, Swagger"
            image={StackBackend}
            alt="Stacks Backend"
          />

          <Skills
            className="container"
            title="Mobile Developer"
            subtitle="React Native, Flutter e Ionic"
            image={StackMobile}
            alt="Stacks Mobile"
          />
        </div>
      </div>

      <div id="contact">
        <h1>Contato</h1>

        <div className="contact-details">
          <div className="container">
            <div className="contact-container">
              <img src={PhotoContact} alt={"Foto de contato"} />
            </div>
            <div className="contact-info">
              <strong>
                Vamos tomar um <span className="coffee">Café?</span>
              </strong>
              <br />
              <span className="contact-subtitle">
                21 974841079 <br /> goncalveswagner15@gmail.com
              </span>
              <br />
              <div className="social-media">
                <a
                  href={"https://www.linkedin.com/in/wagner-sgonçalves"}
                  target="_blank"
                >
                  <img src={Linkedin} alt="Ver perfil no Linkedin" />
                </a>
                <a href={"https://github.com/WagnerTerry"} target="_blank">
                  <img src={Github} alt="Ver Github" />
                </a>
                <a
                  href={Curriculum}
                  download="Currículo do Wagner"
                  rel="noreferrer"
                >
                  <img src={CurriculumIcon} alt="Baixar Currículo" />
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
