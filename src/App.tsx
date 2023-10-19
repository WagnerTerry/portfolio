import Play from "../src/assets/play.svg";
import Profile from "../src/assets/profile.png";
import Motorcycle from "../src/assets/motorcycle-cover.png";
import DiskPizza from "../src/assets/disk-pizza.png";
import Dictionary from "../src/assets/dictionary.png";
import StackFrontend from "../src/assets/stack-frontend.svg";
import StackBackend from "../src/assets/stack-backend.svg";
import StackMobile from "../src/assets/stack-mobile.svg";

import "./App.scss";
import { Project } from "./components/Project";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

function App() {
  return (
    <div>
      <div id="about">
        <header>
          <div className="full_name">
            <strong className="first_name">Wagner</strong>
            {/* <br /> */}
            <strong className="last_name">Gonçalves</strong>
            {/* <span>💻</span> */}
          </div>
          {/* <div className="menu">

        </div> */}

          <nav>
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

          {/* <div className="social_media">
          <div className="social_media_item">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/wagner-gon%C3%A7alves-a9319414a/"
              rel="noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
              </svg>
            </a>
          </div>
          <div className="social_media_item">
            <a
              target="_blank"
              href="https://github.com/WagnerTerry"
              rel="noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 496 512"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
          </div>
          <div className="social_media_item">
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5521974841079&amp;text=Wagner Gonçalves - Desenvolvedor de Software."
              rel="noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"
                ></path>
              </svg>
            </a>
          </div>
        </div> */}
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
              <img src={Play} alt="Ícone para ver os projetos." />
              <span>Confira meus Projetos!</span>
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
            subtitle={`Há 4 anos me aprofundando nas stacks: \n
             HTML5, CSS, Sass, Styled Components, Javascript, Typescript,
             Angular, Vue, React, NextJs`}
            image={StackFrontend}
            alt="Stacks Frontend"
          />

          <Skills
            className="container reverse-container"
            title="Backend Developer"
            subtitle="NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Swagger"
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
          <Contact
            className="container"
            title="Sistema de gestão e estoque"
            subtitle="Sistema web para controle de estoque, de loja de motopeças"
            image={Motorcycle}
            alt="Imagem do sistema de motopeças"
            developed="Sistema desenvolvido em ReactJs, Typescript, NodeJs e MongoDB"
            link="https://github.com/WagnerTerry/moto-pecas-projeto"
          />
          </div>
        </div>

   
    </div>
  );
}

export default App;
