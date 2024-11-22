import { Canvas, useFrame } from "react-three-fiber";
import { useRef } from "react";

import vertexShader from "/src/shaders/vertexShader.glsl";
import fragmentShader from "/src/shaders/fragmentShader.glsl";
import { ShaderMaterial } from "three";

const Geo = (props: { height: number; width: number }) => {
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh>
        <planeGeometry args={[props.height, props.width]} />
        {/* <meshPhongMaterial color={"white"} /> */}

        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0.0 },
          }}
        />
      </mesh>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Geo height={window.innerHeight} width={window.innerWidth} />
      </Canvas>
    </>
  );
};

const BackgroundAssembly = () => {
  return (
    <div id="background" className="absolute left-0 top-0 h-screen w-screen">
      <Scene />
    </div>
  );
};

export default BackgroundAssembly;
