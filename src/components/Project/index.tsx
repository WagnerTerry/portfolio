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
    <div className="border-[14px] border-white shadow-[0px_4px_18px_0px_rgba(0,0,0,0.25)] shrink-0 max-w-[526px] max-[750px]:max-w-full max-[750px]:w-full">
      <img
        src={props.image}
        alt={props.alt}
        className="flex w-full h-full max-w-[550px] max-h-[400px]"
      />
    </div>
    <div className="px-8 flex flex-col max-[750px]:mt-4 max-[750px]:px-4">
      <strong className="text-[38px] font-bold leading-[37px] max-[750px]:text-[28px]">
        {props.title}
      </strong>
      <br />
      <span className="text-[27px] max-[750px]:text-[20px]">{props.subtitle}</span>
      <br />
      <span className="text-[19px]">{props.developed}</span>
      <br />
      <a href={props.link} target="_blank">
        <button className="rounded-[15px] border border-solid bg-[#0d95f8] w-[171px] h-[40px] text-white text-center text-[19px] font-bold cursor-pointer">
          Veja no github
        </button>
      </a>
    </div>
  </div>
);
