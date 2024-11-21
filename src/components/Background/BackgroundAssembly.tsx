import { Canvas } from "@react-three/fiber";

const Mesh = (props: { height: number; width: number }) => {
  return (
    <mesh>
      <planeGeometry args={[props.height, props.width]} />
    </mesh>
  );
};

const BackgroundAssembly = () => {
  return (
    <div
      id="background"
      className="absolute left-0 top-0 h-screen w-screen bg-neutral-950"
    >
      <Canvas>
        <Mesh height={window.innerHeight} width={window.innerWidth} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="white" />
      </Canvas>
    </div>
  );
};

export default BackgroundAssembly;
