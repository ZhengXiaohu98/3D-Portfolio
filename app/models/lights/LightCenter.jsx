import { Vector3 } from 'three'
import { useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const getRandomRotation = () => Math.random() * Math.PI * 0.006;

const MovingSpot = ({ vec = new Vector3(), ...props }) => {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 0), 0.1);
    light.current.target.updateMatrixWorld();
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={12} angle={0.45} attenuation={4} anglePower={4} intensity={1.5} {...props} />
}

const LightCenter = ({ switchState }) => {

  const orbGltf = useLoader(GLTFLoader, "/3D-models/lights/LightCenter/scene.gltf");
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (!modelRef.current || switchState[0] === 0) {
      return;
    }
    const curRef = modelRef.current;

    const rx = getRandomRotation(), ry = getRandomRotation(), rz = getRandomRotation();
    curRef.rotation.x += rx;
    curRef.rotation.y += ry;
    curRef.rotation.z += rz;
  });

  return (
    <group>
      { switchState[0] === 1 && <MovingSpot color="#cec286" position={[0, 2.2, 0]} /> }
      <primitive
        object={orbGltf.scene}
        ref={modelRef}
        scale={0.08}
        position={[0, 2.2, 0]}
      />
    </group>
  )
}

export default LightCenter;


