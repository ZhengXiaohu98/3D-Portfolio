import { SpotLight } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from "react";

const PI = Math.PI;

const LightSatellite = () => {
  const gltf = useLoader(GLTFLoader, "/3D-models/lights/LightSatellite/scene.gltf");
  const [colorMap, roughnessMap, normalMap] = useLoader(TextureLoader, [
    "/3D-models/lights/LightSatellite/textures/groupedspaceshiop2defaultMat1_baseColor.png",
    "/3D-models/lights/LightSatellite/textures/groupedspaceshiop2defaultMat1_emissive.png",
    "/3D-models/lights/LightSatellite/textures/groupedspaceshiop2defaultMat1_normal.png"
  ]);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (!modelRef.current) {
      return;
    }

    const elapsedtime = clock.getElapsedTime();

    modelRef.current.rotation.z = elapsedtime/2;
  });

  return (
    <group >
      <SpotLight
        castShadow
        distance={6}
        angle={0.42}
        attenuation={1.5}
        anglePower={15}
        color="#72ca7b"
        position={[2, 2.3, -.06]}
      />
      <primitive
        object={gltf.scene}
        ref={modelRef}
        scale={0.06}
        position={[2.04, 2.33, -.06]}
        rotation={[-1.2, PI / 3, 0]}
      >
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={roughnessMap}
          normalMap={normalMap}
        />
      </primitive>
    </group>
  )
}

export default LightSatellite;