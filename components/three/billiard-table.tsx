"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useConfiguratorStore } from "@/store/configurator";
import * as THREE from "three";

const WOOD_HEX: Record<string, string> = {
  natural: "#DEB887",
  nogueira: "#6B3A2A",
  mogno: "#8B2500",
  carvalho: "#9C7B4E",
  ebano: "#2C1810",
  wenge: "#3D2314",
};

const FELT_HEX: Record<string, string> = {
  verde: "#8B0000",
  azul: "#1B3A6B",
  vermelho: "#8B0000",
  cinza: "#4A4A4A",
  preto: "#1C1C1C",
  vinho: "#722F37",
};

const LEG_SHAPES: Record<string, "rounded" | "square" | "chrome"> = {
  torneada: "rounded",
  reta: "square",
  cromada: "chrome",
  inox: "chrome",
  fundida: "rounded",
};

function BilliardTableMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { woodColor, feltColor, legType } = useConfiguratorStore();

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(WOOD_HEX[woodColor] ?? "#6B3A2A"),
        roughness: 0.4,
        metalness: 0.05,
      }),
    [woodColor]
  );

  const feltMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(FELT_HEX[feltColor] ?? "#8B0000"),
        roughness: 0.9,
        metalness: 0,
      }),
    [feltColor]
  );

  const legMat = useMemo(() => {
    const shape = LEG_SHAPES[legType] ?? "rounded";
    return new THREE.MeshStandardMaterial({
      color: shape === "chrome" ? new THREE.Color("#C0C0C0") : new THREE.Color(WOOD_HEX[woodColor] ?? "#6B3A2A"),
      roughness: shape === "chrome" ? 0.1 : 0.5,
      metalness: shape === "chrome" ? 0.9 : 0.0,
    });
  }, [legType, woodColor]);

  const pocketMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.8, metalness: 0 }),
    []
  );

  const ballMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.2, metalness: 0.1 }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  // Table dimensions (scaled for 3D scene)
  const W = 2.5; // width (felt surface)
  const L = 1.25; // length
  const H = 0.08; // felt thickness
  const railW = 0.15; // rail width
  const railH = 0.12; // rail height
  const legH = 0.8;
  const legR = 0.06;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* === FELT SURFACE === */}
      <mesh position={[0, legH + H / 2, 0]} material={feltMat} castShadow receiveShadow>
        <boxGeometry args={[W, H, L]} />
      </mesh>

      {/* === RAILS (wood) === */}
      {/* Long rails */}
      {[-1, 1].map((side) => (
        <mesh
          key={`rail-long-${side}`}
          position={[0, legH + H + railH / 2, side * (L / 2 + railW / 2)]}
          material={woodMat}
          castShadow
        >
          <boxGeometry args={[W + railW * 2, railH, railW]} />
        </mesh>
      ))}
      {/* Short rails */}
      {[-1, 1].map((side) => (
        <mesh
          key={`rail-short-${side}`}
          position={[side * (W / 2 + railW / 2), legH + H + railH / 2, 0]}
          material={woodMat}
          castShadow
        >
          <boxGeometry args={[railW, railH, L]} />
        </mesh>
      ))}

      {/* === POCKETS (6 total) === */}
      {[
        [-W / 2, L / 2], [0, L / 2], [W / 2, L / 2],
        [-W / 2, -L / 2], [0, -L / 2], [W / 2, -L / 2],
      ].map(([px, pz], i) => (
        <mesh
          key={`pocket-${i}`}
          position={[px, legH + H + 0.02, pz]}
          material={pocketMat}
          castShadow
        >
          <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
        </mesh>
      ))}

      {/* === LEGS === */}
      {[
        [-(W / 2 - 0.1), -(L / 2 - 0.1)],
        [(W / 2 - 0.1), -(L / 2 - 0.1)],
        [-(W / 2 - 0.1), (L / 2 - 0.1)],
        [(W / 2 - 0.1), (L / 2 - 0.1)],
      ].map(([lx, lz], i) => (
        <mesh
          key={`leg-${i}`}
          position={[lx, legH / 2, lz]}
          material={legMat}
          castShadow
        >
          {LEG_SHAPES[legType] === "square" ? (
            <boxGeometry args={[legR * 1.5, legH, legR * 1.5]} />
          ) : (
            <cylinderGeometry args={[legR, legR * 1.2, legH, 16]} />
          )}
        </mesh>
      ))}

      {/* === CUE BALL === */}
      <mesh position={[-0.4, legH + H + 0.07, 0]} material={ballMat} castShadow>
        <sphereGeometry args={[0.065, 32, 32]} />
      </mesh>

      {/* === COLORED BALLS (triangle) === */}
      {[
        { pos: [0.5, 0] as [number, number], color: "#e63946" },
        { pos: [0.62, 0.09] as [number, number], color: "#ffd166" },
        { pos: [0.62, -0.09] as [number, number], color: "#06d6a0" },
        { pos: [0.74, 0.18] as [number, number], color: "#118ab2" },
        { pos: [0.74, 0] as [number, number], color: "#7209b7" },
        { pos: [0.74, -0.18] as [number, number], color: "#f77f00" },
      ].map(({ pos, color }, i) => (
        <mesh
          key={`ball-${i}`}
          position={[pos[0], legH + H + 0.07, pos[1]]}
          castShadow
        >
          <sphereGeometry args={[0.065, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.2} />
        </mesh>
      ))}

      {/* === SHADOW PLANE === */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}

export { BilliardTableMesh };
