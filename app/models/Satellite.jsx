import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const X_CONST_POS = 1.4, Y_CONST_POS = 1.7, Z_CONST_POS = 0.158;
const INIT_SCALE = 50;
const RADIUS = 0.5;
const SLOW_FAC = 20;
const getRandomRotation = () => Math.random() * Math.PI * 0.002;


const Satellite = ({ maxScroll, scrollPosition, isViewing, setIsViewing, isHovered, setIsHovered }) => {
  const gltf = useLoader(GLTFLoader, "/3D-models/statllite/scene.gltf");
  const [colorMap] = useLoader(TextureLoader, ["/3D-models/statllite/textures/Material_51_baseColor.png"]);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (!modelRef.current) {
      return;
    }

    const curRef = modelRef.current;
    const { x, y, z } = curRef.position;

    const elapsedTime = clock.getElapsedTime();

    const dynamicAngle = (elapsedTime / SLOW_FAC) * Math.PI * 2;
    const newX = x;
    const newY = -Math.abs(RADIUS * Math.sin(dynamicAngle)) * Math.sin(dynamicAngle) + Y_CONST_POS;
    const newZ = RADIUS * Math.cos(dynamicAngle) + Z_CONST_POS;
    curRef.position.set(newX, newY, newZ);


    const rx = getRandomRotation(), ry = getRandomRotation(), rz = getRandomRotation();
    curRef.rotation.x += rx;
    curRef.rotation.y += ry;
    curRef.rotation.z += rz;
  });

  const handleClick = () => {
    setIsViewing(2);
  }

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(2);
  }

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(0);
  }

  return (
    <group>
      <primitive
        object={gltf.scene}
        position={[X_CONST_POS, Y_CONST_POS, Z_CONST_POS]}
        rotation={[0, Math.PI, 0]}
        ref={modelRef}
        scale={INIT_SCALE}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          map={colorMap}
        />
      </primitive>
    </group>
  );
};

export default Satellite;
