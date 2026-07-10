type ISkills = {
  image: string;
  title: string;
  description?: string;
  techs: string[];
  alt: string;
};

export const Skills = (props: ISkills) => (
  <article className="flex flex-col gap-4 bg-hud-panel border-4 border-hud-line shadow-[6px_6px_0_#000] p-6 transition-colors hover:border-neon-magenta/70">
    <div className="flex items-center gap-4">
      <img
        src={props.image}
        alt={props.alt}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 [filter:drop-shadow(0_0_8px_rgba(0,245,255,0.5))]"
      />
      <h3 className="font-press-start text-neon-magenta text-[11px] sm:text-xs leading-relaxed">
        {props.title}
      </h3>
    </div>


{props.description && (
      <p className="m-0 text-xl leading-snug text-slate-200">{props.description}</p>
    )}

    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
      {props.techs.map((tech) => (
        <li
          key={tech}
          className="text-base leading-none text-neon-green border border-neon-green/50 bg-neon-green/10 px-2 py-1"
        >
          {tech}
        </li>
      ))}
    </ul>
  </article>
);
