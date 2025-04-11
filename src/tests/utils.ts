import * as THREE from "three";

export const getMockObject = () => ({
  id: "1",
  shape: "cube",
  name: "Object 1",
  position: [1, 2, 3] as [x: number, y: number, z: number],
  geometry: new THREE.BoxGeometry(1, 1, 1),
  material: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
})