type ISkills = {
  image: string;
  title: string;
  subtitle: string;
  className: string;
  alt: string;
};

export const Skills = (props: ISkills) => (
  <div className={props.className}>
    <div className="max-w-[526px] max-[750px]:max-w-full max-[750px]:w-full">
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
      <span className="text-[27px] whitespace-pre-line max-[750px]:text-[20px]">
        {props.subtitle}
      </span>
      <br />
    </div>
  </div>
);
