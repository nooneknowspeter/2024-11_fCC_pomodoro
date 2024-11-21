const ProgressBar = (props: { status: string; progressColor: string }) => {
  return (
    <>
      <div
        id="progress-bar"
        className={`${props.progressColor} z-0 h-2 w-80 origin-top-left rounded-sm opacity-15 transition-all sm:w-80 md:w-full`}
      ></div>
    </>
  );
};
export default ProgressBar;
