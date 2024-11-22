import { Canvas, useFrame } from "react-three-fiber";
import { useRef } from "react";

import vertexShader from "/src/shaders/vertexShader.glsl";
import fragmentShader from "/src/shaders/fragmentShader.glsl";
import { ShaderMaterial } from "three";

import * as THREE from "three";

const Geo = (props: { height: number; width: number }) => {
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    }
  });

  return (
    <>
      <mesh>
        <planeGeometry args={[props.width, props.height]} />
        {/* <meshPhongMaterial color={"white"} /> */}

        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0.0 },
            uResolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
          }}
        />
      </mesh>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <Canvas>
        <Geo
          height={window.innerHeight / 100}
          width={window.innerWidth / 100}
        />
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
