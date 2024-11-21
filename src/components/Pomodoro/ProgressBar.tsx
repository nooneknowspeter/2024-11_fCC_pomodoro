const ProgressBar = (props: { progressColor: string }) => {
  return (
    <>
      <div
        id="progress-bar"
        className={`${props.progressColor} z-0 h-2 w-80 animate-pulse rounded-sm transition-all sm:w-80 md:w-full`}
      ></div>
    </>
  );
};
export default ProgressBar;
