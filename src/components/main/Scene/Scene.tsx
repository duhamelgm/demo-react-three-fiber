import { Canvas } from "@react-three/fiber";
import React from "react";

import { OrbitControls } from "@react-three/drei";
import { SceneObject as SceneObjectType, UseScene } from "./useScene";
import SceneObject from "./SceneObject";

interface SceneProps {
  objects: SceneObjectType[];
  selectedObjectId: UseScene["selectedObjectId"];
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
  fiestaMode: boolean;
}

const Scene = ({
  objects,
  selectedObjectId,
  onSetSelectedObjectId,
  fiestaMode,
}: SceneProps) => {
  console.count("Scene");

  return (
    <Canvas>
      <OrbitControls />
      <gridHelper />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {objects.map((object) => (
        <SceneObject
          key={object.id}
          object={object}
          onSetSelectedObjectId={onSetSelectedObjectId}
          selected={selectedObjectId === object.id}
          fiestaMode={fiestaMode}
        />
      ))}
    </Canvas>
  );
};

export default Scene;
