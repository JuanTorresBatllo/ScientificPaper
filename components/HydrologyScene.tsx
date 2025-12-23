
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AridParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#d97706"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

const MountainPeak = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* Central Peak Simulation */}
      <Sphere ref={ref} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#475569"
          roughness={1}
          metalness={0.1}
          distort={0.4}
          speed={0.5}
        />
      </Sphere>
      {/* Halo indicating thin atmosphere */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
        <AridParticles />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <MountainPeak />
        </Float>
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const AltiplanoVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#9a3412" />
        <Environment preset="sunset" />
        
        <Float rotationIntensity={0.5} floatIntensity={0.3} speed={1.5}>
          <Sphere args={[1.5, 32, 32]}>
            <MeshDistortMaterial
              color="#9a3412"
              envMapIntensity={0.5}
              clearcoat={0.1}
              distort={0.5}
              speed={2}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};
