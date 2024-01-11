import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

const X_CONST_POS = -1.4, Y_CONST_POS = 1.4, Z_CONST_POS = 1.2;
const FIXED_POS = [0, 1.7, 2.4];
const FIXED_ROTATION = [-Math.PI / 8, 0, 0];
const ANIM_SPEED = 50;
const INIT_SCALE = 0.3;
const DUMPING_UP = 1.001, DUMPING_DOWN = 0.999;
const FIXED_DUMPING_UP = 1.0005, FIXED_DUMPING_DOWN = 0.9995;
const VIEW_BOUNCING_HEIGHT = 0.12, FIXED_BOUNCING_HEIGHT = 0.05;

const IntroRobot = ({ maxScroll, scrollPosition, isViewing, setIsViewing, isHovered, setIsHovered }) => {
  const gltf = useLoader(GLTFLoader, "/3D-models/intro_cube/scene.gltf");
  const pointerGltf = useLoader(GLTFLoader, "/3D-models/pointer/scene.gltf");

  const modelRef = useRef();
  const pointerRef = useRef();
  const [startPos, setStartPos] = useState([X_CONST_POS, Y_CONST_POS, 0.5]);
  const [startRotation, setStartRotation] = useState([0, 0, 0]);
  const [isDumpingUp, setIsDumpingUp] = useState(true);

  const movingOrb = (st_pos, ed_pos, st_rot, ed_rot, scale_factor) => {
    if (!modelRef.current) {
      return;
    }
    document.body.style.overflow = 'hidden';
    const curRef = modelRef.current;
    const { x, y, z } = curRef.position;
    const newX = x + (ed_pos[0] - st_pos[0]) / ANIM_SPEED;
    const newY = y + (ed_pos[1] - st_pos[1]) / ANIM_SPEED;
    const newZ = z + (ed_pos[2] - st_pos[2]) / ANIM_SPEED;
    curRef.position.set(newX, newY, newZ);


    curRef.rotation.x += (ed_rot[0] - st_rot[0]) / ANIM_SPEED;
    curRef.rotation.y += (ed_rot[1] - st_rot[1]) / ANIM_SPEED;
    curRef.rotation.z += (ed_rot[2] - st_rot[2]) / ANIM_SPEED;

    // scale a little bit
    curRef.scale.set(curRef.scale.x + scale_factor, curRef.scale.y + scale_factor, curRef.scale.z + scale_factor);
  }

  useFrame(({ clock }) => {
    if (!modelRef.current) {
      return;
    }

    if (pointerRef.current) {
      const elapsedTime = clock.getElapsedTime();
      pointerRef.current.rotation.z = elapsedTime;
    }

    const curRef = modelRef.current;
    // get the current position in canvas
    const { x, y, z } = curRef.position;

    if (isViewing === 1) {
      if (Math.abs(x - FIXED_POS[0]) <= 0.0001) {
        // when the y pos reachs the maximum, changing its direction
        if (y >= FIXED_POS[1] + FIXED_BOUNCING_HEIGHT) {
          setIsDumpingUp(false);
        }
        if (y < FIXED_POS[1]) {
          setIsDumpingUp(true);
        }
        const newY = y * (isDumpingUp ? FIXED_DUMPING_UP : FIXED_DUMPING_DOWN);
        curRef.position.set(FIXED_POS[0], newY, FIXED_POS[2]);
        return;
      }
      // Calling helper to animate the orb movement
      movingOrb(startPos, FIXED_POS, startRotation, FIXED_ROTATION, 0.001);
    } else {
      if (Math.abs(x - startPos[0]) > 0.0001) {
        movingOrb(FIXED_POS, startPos, FIXED_ROTATION, startRotation, -0.001);
      } else {

        let { y } = curRef.position;

        const rotationAngle = (scrollPosition / maxScroll) * Math.PI * 2;
        const newX = Math.cos(rotationAngle) * X_CONST_POS;
        const newZ = Math.sin(rotationAngle) * X_CONST_POS + Z_CONST_POS;
        // when the y pos reachs the maximum, changing its direction
        if (y >= Y_CONST_POS + VIEW_BOUNCING_HEIGHT) {
          setIsDumpingUp(false);
        }
        if (y < Y_CONST_POS) {
          setIsDumpingUp(true);
        }
        const newY = y * (isDumpingUp ? DUMPING_UP : DUMPING_DOWN);
        curRef.position.set(newX, newY, newZ);
        setStartPos([...modelRef.current.position.toArray()]);

        // rotating
        curRef.rotation.set(0, (curRef.rotation.y + 0.015) % (Math.PI * 2), curRef.rotation.z % (Math.PI * 2));
        document.body.style.overflow = 'auto';
      }

    }
  });

  const handleClick = () => {
    setIsViewing(1);
    setStartPos([...modelRef.current.position.toArray()]);
    setStartRotation([...modelRef.current.rotation.toArray()]);
    document.body.style.overflow = 'hidden';
  }

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(1);
  }

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(0);
  }

  return (
    <>
      <primitive
        object={gltf.scene}
        position={startPos}
        ref={modelRef}
        scale={INIT_SCALE}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {
          isViewing !== 1 &&
          <primitive
            object={pointerGltf.scene}
            ref={pointerRef}
            position={[0, 0.4, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={2}
          />
        }
      </primitive>
    </>
  );
};

export default IntroRobot;