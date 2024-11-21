const ProgressBar = (props: { status: number; progressColor: string }) => {
  return (
    <>
      <div
        id="progress-bar"
        className={`${props.progressColor} z-0 h-2 w-80 scale-x-[${props.status}] rounded-sm opacity-15 transition-all sm:w-80 md:w-full`}
      ></div>
    </>
  );
};
export default ProgressBar;
