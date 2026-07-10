type IProject = {
  image: string;
  title: string;
  subtitle: string;
  techs: string[];
  link: string;
  alt: string;
};

export const Project = (props: IProject) => (
  <article className="group flex flex-col bg-hud-panel border-4 border-hud-line shadow-[6px_6px_0_#000] transition-colors hover:border-neon-cyan/70">
    <div className="relative border-b-4 border-hud-line bg-black overflow-hidden">
      <img
        src={props.image}
        alt={props.alt}
        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute top-2 left-2 font-press-start text-[8px] text-hud-bg bg-neon-yellow px-2 py-1 border-2 border-black">
        QUEST
      </span>
    </div>

    <div className="flex flex-col flex-1 gap-3 p-5">
      <h3 className="font-press-start text-neon-yellow text-[11px] sm:text-xs leading-relaxed">
        {props.title}
      </h3>
      <p className="text-xl leading-snug text-slate-200">{props.subtitle}</p>

      <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
        {props.techs.map((tech) => (
          <li
            key={tech}
            className="text-base leading-none text-neon-cyan border border-neon-cyan/50 bg-neon-cyan/10 px-2 py-1"
          >
            {tech}
          </li>
        ))}
      </ul>

      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="pixel-btn mt-auto bg-neon-cyan text-hud-bg text-[9px] sm:text-[10px] self-start"
      >
        VER NO GITHUB ▶
      </a>
    </div>
  </article>
);
