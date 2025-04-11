import * as THREE from "three";

import { Outlines } from "@react-three/drei";
import React, { useCallback, memo, useRef, useMemo } from "react";
import { SceneObject as SceneObjectType, UseScene } from "./useScene";
import { ThreeEvent, useFrame } from "@react-three/fiber";

interface SceneObjectProps {
  object: SceneObjectType;
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
  selected: boolean;
  fiestaMode: boolean;
}

const rainbowColors = [
  new THREE.Color(1, 0, 0), // Red
  new THREE.Color(1, 0.5, 0), // Orange
  new THREE.Color(1, 1, 0), // Yellow
  new THREE.Color(0, 1, 0), // Green
  new THREE.Color(0, 0, 1), // Blue
  new THREE.Color(0.6, 0, 1), // Violet (magenta-ish)
];

const SceneObject = ({
  object,
  onSetSelectedObjectId,
  selected,
  fiestaMode,
}: SceneObjectProps) => {
  console.count(`SceneObject ${object.id}`);
  const meshRef = useRef<THREE.Mesh>(null);

  const onClickSceneObject = useCallback(
    (e: ThreeEvent<MouseEvent>, id: string) => {
      e.stopPropagation();
      onSetSelectedObjectId(id);
    },
    [onSetSelectedObjectId],
  );

  let angle = 0;
  const offset = useMemo(() => Math.random() * rainbowColors.length, []);
  const signs = [
    Math.sign(Math.random() - 0.5),
    Math.sign(Math.random() - 0.5),
    Math.sign(Math.random() - 0.5),
  ];
  useFrame(() => {
    // Slowly move the object in a small circle of radius 0.5
    if (meshRef.current && fiestaMode) {
      angle += 0.01; // adjust the speed of rotation by modifying the increment
      const radius = 0.5; // radius of the circle
      const speed = 5; // adjust the speed of movement

      meshRef.current.position.x =
        radius * Math.cos(angle * speed) * signs[0] + object.position[0];
      meshRef.current.position.y =
        radius * Math.sin(angle * speed) * signs[1] + object.position[1];
      meshRef.current.position.z =
        radius * Math.sin(angle * speed) * signs[2] + object.position[2];

      const colorIndex = Math.floor(
        (angle * 0.5 + offset) % rainbowColors.length,
      );
      const material = meshRef.current.material as THREE.MeshBasicMaterial;

      if (rainbowColors[colorIndex]) {
        material.color.lerp(rainbowColors[colorIndex], 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      key={object.id}
      position={object.position}
      geometry={object.geometry}
      material={object.material}
      onClick={(e) => onClickSceneObject(e, object.id)}
    >
      {selected && <Outlines thickness={3} color="#2F0A28" />}
    </mesh>
  );
};

export default memo(SceneObject, (prevProps, nextProps) => {
  return (
    prevProps.object.position.toString() ===
      nextProps.object.position.toString() &&
    prevProps.selected === nextProps.selected &&
    prevProps.fiestaMode === nextProps.fiestaMode
  );
});
