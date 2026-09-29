import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere
function randomInSphere(numPoints: number, radius: number) {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;

    const sinPhi = Math.sin(phi);

    points[i * 3] = r * sinPhi * Math.cos(theta);
    points[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
}

const ParticleCloud = () => {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Use a stable reference for pointer to track global mouse movements
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sphere = useMemo(() => randomInSphere(1500, 3.5), []);

  useFrame((_state, delta) => {
    if (ref.current) {
      // Gentle rotation over time
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;

      // Follow mouse
      const targetX = (pointer.current.x * viewport.width) / 10;
      const targetY = (pointer.current.y * viewport.height) / 10;

      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0d7377" // matches teal-600
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
          opacity={0.8}
        />
      </Points>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#e07a5f" // matches coral-500
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
        />
      </Points>
    </group>
  );
};

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
