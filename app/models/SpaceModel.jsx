import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Spaceship, Satellite, SkillOrb, LightSatellite, LightOrb } from ".";

const SpaceModel = ({ maxScroll, scrollPosition, isViewing, setIsViewing, isHovered, setIsHovered, switchState }) => {
  const gltf = useLoader(GLTFLoader, "/3D-models/space_boi/scene.gltf");

  const modelRef = useRef();
  useFrame(() => {
    if (modelRef.current) {
      const rotationAngle = -(scrollPosition / maxScroll) * Math.PI * 2;
      modelRef.current.rotation.y = rotationAngle;
    }
  });

  return (
    <group ref={modelRef}>
      {/* main scene */}
      <primitive object={gltf.scene} scale={0.4} />
      {/* spaceship */}
      <Spaceship isViewing={isViewing} setIsViewing={setIsViewing} isHovered={isHovered} setIsHovered={setIsHovered} />
      {/* Statellite */}
      <Satellite maxScroll={maxScroll} scrollPosition={scrollPosition} isViewing={isViewing} setIsViewing={setIsViewing} isHovered={isHovered} setIsHovered={setIsHovered} />
      {/* Skill Orbs */}
      <SkillOrb />
      {/* Lights */}
      <LightSatellite />
      <LightOrb switchState={switchState} />
    </group>
  );
};

export default SpaceModel;
