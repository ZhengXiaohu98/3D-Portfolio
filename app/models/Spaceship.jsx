import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from 'react';

const INIT_SCALE = .1;
const ANIM_SPEED = 400;
const PI = Math.PI;

// path for spaceship movement
const positionArr = [
  [2, .05, .18],
  [0.4, 2.05, 2.28],
  [-0.9, 2.28, 2.46],
  [-1.8, 1.65, .38],
  [-1.2, 0.95, -2.38],
  [0.7, 0.45, -1.38],
  [2, .05, .18],
];

const rotationArr = [
  [0, 0, 0],
  [-PI * 0.05, -PI * 0.25, -PI * 0.3],
  [-PI * 0.2, -PI * 0.8, -PI * 0.3],
  [0, -PI, PI * 0.25],
  [0, -PI * 1.3, PI * 0.2],
  [0, -PI * 1.9, PI * 0.1],
  [0, -PI * 2, 0]
];


const Spaceship = ({ isViewing, setIsViewing, isHovered, setIsHovered }) => {
  const gltf = useLoader(GLTFLoader, "/3D-models/spaceship/scene.gltf");
  const [colorMap, roughnessMap, normalMap] = useLoader(TextureLoader, [
    "/3D-models/spaceship/textures/Material.007_baseColor.png",
    "/3D-models/spaceship/textures/Material.007_metallicRoughness.png",
    "/3D-models/spaceship/textures/Material.007_normal.png"
  ]);
  const modelRef = useRef();
  const [curIdx, setCurIdx] = useState(0);

  // moving from ed_pos to st_pos, same with rotation
  // returns true if it reaches the end position
  // cause err if the difference of x of the two postion doesnt change
  const movingSpaceship = (st_pos, ed_pos, st_rot, ed_rot) => {
    if (!modelRef.current) {
      return;
    }
    const curRef = modelRef.current;
    const { x, y, z } = curRef.position;

    // reached the destination
    if (Math.abs(x - ed_pos[0]) < 0.001) {
      if (curIdx === rotationArr.length - 2) {
        curRef.rotation.set(0, 0, 0);
      }
      return true;
    }

    const newX = x + (ed_pos[0] - st_pos[0]) / ANIM_SPEED;
    const newY = y + (ed_pos[1] - st_pos[1]) / ANIM_SPEED;
    const newZ = z + (ed_pos[2] - st_pos[2]) / ANIM_SPEED;
    curRef.position.set(newX, newY, newZ);


    curRef.rotation.x += (ed_rot[0] - st_rot[0]) / ANIM_SPEED;
    curRef.rotation.y += (ed_rot[1] - st_rot[1]) / ANIM_SPEED;
    curRef.rotation.z += (ed_rot[2] - st_rot[2]) / ANIM_SPEED;

    return false;
  }

  useFrame(({ clock }) => {
    if (!modelRef.current) {
      return;
    }

    const nextIdx = (curIdx + 1) % positionArr.length;
    const reachedDest = movingSpaceship(positionArr[curIdx], positionArr[nextIdx], rotationArr[curIdx], rotationArr[nextIdx]);
    if (reachedDest) {
      setCurIdx(nextIdx);
    }
  });

  const handleClick = () => {
    setIsViewing(3);
  }

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(3);
  }

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(0);
  }

  return (
    <>
      <primitive
        object={gltf.scene}
        position={positionArr[curIdx]}
        rotation={rotationArr[curIdx]}
        ref={modelRef}
        scale={INIT_SCALE}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={roughnessMap}
          normalMap={normalMap}
        />
      </primitive>
    </>
  );
};

export default Spaceship;
