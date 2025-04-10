import { Outlines } from "@react-three/drei";
import React, { useCallback, memo } from "react";
import { SceneObject as SceneObjectType, UseScene } from "./useScene";
import { ThreeEvent } from "@react-three/fiber";

interface SceneObjectProps {
  object: SceneObjectType;
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
  selected: boolean;
}

const SceneObject = ({
  object,
  onSetSelectedObjectId,
  selected,
}: SceneObjectProps) => {
  console.count(`SceneObject ${object.id}`);

  const onClickSceneObject = useCallback(
    (e: ThreeEvent<MouseEvent>, id: string) => {
      e.stopPropagation();
      onSetSelectedObjectId(id);
    },
    [onSetSelectedObjectId],
  );

  return (
    <mesh
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
    prevProps.selected === nextProps.selected
  );
});
