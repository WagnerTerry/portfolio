import '../../App.scss'

type IProject = {
  image: string;
  title: string;
  subtitle: string;
  developed: string;
  link: string;
  className: string;
  alt: string;
};

export const Project = (props: IProject) => (
  <div className={props.className}>
    <div className="project-container">
      <img src={props.image} alt={props.alt} />
    </div>
    <div className="project-info">
      <strong>{props.title}</strong>
      <br />
      <span className='project-subtitle'>{props.subtitle}</span>
      <br />
      <span>
        {props.developed}
      </span>
      <br />
      <a href={props.link} target='_blank'>
        <button>Veja no github</button>
      </a>
    </div>
  </div>
);
