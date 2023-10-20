type ISkills = {
  image: string;
  title: string;
  subtitle: string;
  className: string;
  alt: string;
};

export const Skills = (props: ISkills) => (
  <div className={props.className}>
    <div className="skills-container">
      <img src={props.image} alt={props.alt} />
    </div>
    <div className="skills-info">
      <strong>{props.title}</strong>
      <br />
      <span className="skills-subtitle">{props.subtitle}</span>
      <br />
    </div>
  </div>
);
