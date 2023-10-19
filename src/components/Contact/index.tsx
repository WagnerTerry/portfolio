type IContact = {
    image: string;
    title: string;
    subtitle: string;
    developed: string;
    link: string;
    className: string;
    alt: string;
  };
  
  export const Contact = (props: IContact) => (
    <div className={props.className}>
      <div className="contact-container">
        <img src={props.image} alt={props.alt} />
      </div>
      <div className="contact-info">
        <strong>{props.title}</strong>
        <br />
        <span className='contact-subtitle'>{props.subtitle}</span>
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
  