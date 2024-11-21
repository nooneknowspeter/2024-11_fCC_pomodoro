import React, { MutableRefObject } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SetTimer = (props: {
  id: string;
  onClickIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  displayTime: number;
  order: string;
  ref: MutableRefObject<null>;
  opacity: string;
}) => {
  let input = props.id;
  const regex = /[a-z]/;
  let toPascalCase = input.replace(regex, (x) => {
    return x.toUpperCase();
  });

  return (
    <div
      id={`set-${props.id}-timer`}
      className={`${props.order} ${props.opacity} flex flex-col gap-4 transition-all duration-700 md:w-[200px]`}
      ref={props.ref}
    >
      <h1 id={`${props.id}-label`} className="font-bold">
        {toPascalCase}
      </h1>
      <div
        id={`${props.id}-controls`}
        className="flex flex-row place-content-center content-center gap-10 text-center"
      >
        <button id={`${props.id}-increment`} onClick={props.onClickIncrement}>
          <FaArrowUp />
        </button>
        {/* display time */}
        <h1 id={`${props.id}-length`} className="text-center font-normal">
          {props.displayTime}
        </h1>
        <button id={`${props.id}-decrement`} onClick={props.onClickDecrement}>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default SetTimer;
