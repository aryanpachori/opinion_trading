import React, { ReactNode } from "react";

interface whyChooseUsCardProps {
  title: string;
  description: string;
  svg: ReactNode;
  reverse?: boolean;
}

const TakesCare: React.FC<whyChooseUsCardProps> = ({
  title,
  description,
  svg,
  reverse,
}) => {
  return (
    <div
      className={`flex item-center flex-wrap ${
        reverse
          ? "flex-row-reverse gradient-border-left"
          : "gradient-border-right"
      } gap-3 md:gap-0 justify-center md:justify-between  p-5 w-full -mt-5 md:mt-0`}
    >
      <div className="flex flex-col items-start justify-between">
        <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60 text-2xl">{title}</h2>
        <p className="md:w-[40rem] text-zinc-400">{description}</p>
      </div>
      <div className="hidden md:block">{svg}</div>
    </div>
  );
};

export default TakesCare;