import { SetStateAction, useState } from "react";
import * as THREE from "three";

export const SNAPSHOT_STORAGE_LIMIT = 10;

export type Shapes = "sphere" | "cube" | "cylinder";

export interface SceneObject {
  id: string;
  name: string;
  shape: string;
  position: [x: number, y: number, z: number];
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}

export type SceneObjects = Record<string, SceneObject>

export interface Snapshots {
  past: SceneObjects[];
  future: SceneObjects[];
}

export interface UseScene {
  objects: SceneObjects,
  selectedObjectId: string | null,
  onSetSelectedObjectId(id: string | null): void,
  onSetObjects(objects: SetStateAction<SceneObjects>, options?: { ignoreSnapshot?: boolean }): void,
  onUndo(): void,
  onRedo(): void,
  snapshots: Snapshots,
}

const useScene = (): UseScene => {
  const [objects, setObjects] = useState<SceneObjects>({});
  const [snapshots, setSnapshots] = useState<Snapshots>({ past: [], future: [] });
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const takeSnapshot = () => {
    setSnapshots({
      future: [],
      past: [...snapshots.past, objects].slice(-SNAPSHOT_STORAGE_LIMIT, snapshots.past.length + 1),
    });
  }

  const onSetObjects: UseScene['onSetObjects'] = (newObjects, options) => {
    if (!options?.ignoreSnapshot) {
      takeSnapshot();
    }

    if (selectedObjectId && !(selectedObjectId in newObjects)) {
      setSelectedObjectId(null);
    }

    setObjects(newObjects);
  }

  const onUndo = () => {
    if (snapshots.past.length === 0) return;

    const lastSnapshot = snapshots.past[snapshots.past.length - 1];
    const newSnapshots = {
      future: [objects, ...snapshots.future].slice(0, SNAPSHOT_STORAGE_LIMIT),
      past: [...snapshots.past].slice(0, -1),
    }

    setSnapshots(newSnapshots);
    onSetObjects(lastSnapshot, { ignoreSnapshot: true });
  };

  const onRedo = () => {
    if (snapshots.future.length === 0) return;

    const nextSnapshot = snapshots.future[0];
    const newSnapshots = {
      future: [...snapshots.future].slice(1),
      past: [...snapshots.past, objects].slice(-SNAPSHOT_STORAGE_LIMIT, snapshots.past.length + 1),
    }

    setSnapshots(newSnapshots);
    onSetObjects(nextSnapshot, { ignoreSnapshot: true });
  };

  return {
    objects,
    selectedObjectId,
    onSetSelectedObjectId: setSelectedObjectId,
    onSetObjects,
    onUndo,
    onRedo,
    snapshots
  };
};

export default useScene;
