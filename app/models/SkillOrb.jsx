import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Text } from "@react-three/drei";
import * as THREE from 'three';

const NUM_ORBS = 5
const INIT_SCALE = 0.1;
const RADIUS = 0.3;
const SLOW_FAC = 20;

const logos = [
  '/images/logos/react.png',
  '/images/logos/nextjs.png',
  '/images/logos/vue.png',
  '/images/logos/threejs.png',
  '/images/logos/nodejs.png',
];

const logo_text = [
  'react.js',
  'next.js',
  'vue.js',
  'three.js',
  'node.js'
];

const logo_color = [
  '#2B98D4',
  '#EDFEFF',
  '#8BC07B',
  '#FBF1F8',
  '#3FA40F'
]

const textureLoader = new TextureLoader();

const SkillOrb = () => {
  const modelRef = useRef();
  const orbRefs = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
  const [orbs, setOrbs] = useState([]);

  const renderOrbs = () => {
    const orbs = [];

    for (let i = 0; i < NUM_ORBS; i++) {
      const angle = (i / NUM_ORBS) * Math.PI * 2;
      const orbX = RADIUS * Math.cos(angle);
      const orbY = 0;
      const orbZ = RADIUS * (1 + Math.sin(angle));

      const texture = textureLoader.load(logos[i % logos.length]);

      orbs.push(
        <mesh
          key={i}
          scale={INIT_SCALE}
          position={[orbX, orbY, orbZ]}
          ref={orbRefs.current[i]}
        >
          <boxGeometry />
          <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
          <Text anchorX="center" anchorY='middle' position={[0, 1.3, 0]} scale={0.55} color={logo_color[i]}>
            {logo_text[i]}
          </Text>
        </mesh>
      );
    }
    return orbs;
  }

  useEffect(() => {
    const newOrbs = renderOrbs();
    setOrbs(newOrbs);
  }, []);

  useFrame(({ clock }) => {
    if (!orbRefs.current) {
      return;
    }
    const elapsedTime = clock.getElapsedTime();

    orbRefs.current.forEach((orbRef, index) => {
      const angle = (elapsedTime / SLOW_FAC + (index / NUM_ORBS)) * Math.PI * 2;
      const orbX = RADIUS * Math.cos(angle);
      const orbZ = RADIUS * (1 + Math.sin(angle));
      if (orbRef.current) {
        orbRef.current.position.x = orbX;
        orbRef.current.position.z = orbZ;
      }
    });
  });

  return (
    <group
      ref={modelRef}
      position={[0, 1.6, -.34]}
    >
      {orbs}
    </group>
  );
};

export default SkillOrb;
