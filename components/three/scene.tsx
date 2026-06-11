"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { BilliardTableMesh } from "./billiard-table";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.1, 0.5]} />
      <meshStandardMaterial color="#8B0000" />
    </mesh>
  );
}

interface SceneProps {
  autoRotate?: boolean;
  showControls?: boolean;
  quality?: "low" | "medium" | "high";
}

export function BilliardScene({ autoRotate = false, showControls = true, quality = "high" }: SceneProps) {
  return (
    <Canvas
      shadows={quality !== "low"}
      gl={{
        antialias: quality !== "low",
        toneMapping: 4, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      className="w-full h-full"
    >
      <PerspectiveCamera makeDefault position={[3.5, 3, 3.5]} fov={45} />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow={quality !== "low"}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#ff8888" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#c8a84b" />

      {/* Environment */}
      <Environment preset="warehouse" />

      {/* Table */}
      <Suspense fallback={<LoadingFallback />}>
        <BilliardTableMesh />
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
      </Suspense>

      {/* Controls */}
      {showControls && (
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={0.3}
          minDistance={2}
          maxDistance={8}
          target={[0, 0.8, 0]}
        />
      )}
    </Canvas>
  );
}
