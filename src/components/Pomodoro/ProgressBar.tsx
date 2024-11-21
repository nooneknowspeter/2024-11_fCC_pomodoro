const ProgressBar = (props: { opacity: string }) => {
  return (
    <>
      <div
        id="progress-bar"
        className={`${props.opacity} z-0 h-2 w-80 rounded-sm bg-neutral-50 transition-all duration-1000 sm:w-80 md:w-full`}
      ></div>
    </>
  );
};
export default ProgressBar;
