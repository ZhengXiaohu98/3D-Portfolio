import { Vector3 } from 'three'
import { useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MovingSpot = ({ vec = new Vector3(), ...props }) => {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 0), 0.1);
    light.current.target.updateMatrixWorld();
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={12} angle={0.45} attenuation={4} anglePower={4} intensity={1.5} {...props} />
}

const LightOrb = ({ switchState }) => {
  const orbGltf = useLoader(GLTFLoader, "/3D-models/lights/LightOrb/scene.gltf");
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (!modelRef.current || switchState[1] === 0) {
      return;
    }
    const curRef = modelRef.current;

    const ry = Math.random() * Math.PI * 0.006;
    curRef.rotation.y += ry;

  });

  return (
    <group>
      { switchState[1] === 1 && <MovingSpot color="#C9EDFC" position={[-1.14, 2.32, -1.24]} /> }
      <primitive
        object={orbGltf.scene}
        ref={modelRef}
        scale={0.058}
        position={[-1.155, 2.28, -1.24]}
      />
    </group>
  )
}

export default LightOrb;


