import AnimatedCursor from "react-animated-cursor";
import { BackgroundAssembly, PomodoroAssembly } from "./components";

const App = () => {
  return (
    <>
      <BackgroundAssembly />
      <PomodoroAssembly />
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.6}
        outerScale={5}
      />
    </>
  );
};

export default App;
