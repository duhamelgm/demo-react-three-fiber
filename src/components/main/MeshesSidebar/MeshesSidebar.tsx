import React from "react";
import * as THREE from "three";

import { Box, Button, Stack, Typography } from "@mui/material";
import Icons from "../../shared/icons";
import { Shapes, UseScene } from "../Scene/useScene";

const geometries = {
  sphere: new THREE.SphereGeometry(1, 16, 16),
  cube: new THREE.BoxGeometry(1, 1, 1),
  cylinder: new THREE.CylinderGeometry(1, 1, 2, 16),
};

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
];

const getId = () => Math.random().toString(36).substring(2, 15);

interface MeshesSidebarProps {
  onSetObjects: UseScene["onSetObjects"];
  objects: UseScene["objects"];
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
}

const MeshesSidebar = ({
  onSetObjects,
  objects,
  onSetSelectedObjectId,
}: MeshesSidebarProps) => {
  console.count("MeshesSidebar");

  const onAddObject = (shape: Shapes) => {
    let id = getId();
    while (id in objects) {
      id = getId();
    }

    onSetObjects({
      ...objects,
      [id]: {
        id,
        name: shape,
        shape,
        position: [
          Math.floor(Math.random() * 10) - 5,
          Math.floor(Math.random() * 10) - 5,
          Math.floor(Math.random() * 10) - 5,
        ],
        geometry: geometries[shape],
        material: materials[Math.floor(Math.random() * materials.length)],
      },
    });
    onSetSelectedObjectId(id);
  };

  return (
    <Box borderRight={1} height="100%">
      <Box padding={2} borderBottom={1}>
        <Typography variant="h3">MESHES</Typography>
      </Box>

      <Stack padding={2} spacing={2}>
        <Button startIcon={<Icons.Cube />} onClick={() => onAddObject("cube")}>
          Add Cube
        </Button>
        <Button
          startIcon={<Icons.Sphere />}
          onClick={() => onAddObject("sphere")}
        >
          Add Sphere
        </Button>
        <Button
          startIcon={<Icons.Cylinder />}
          onClick={() => onAddObject("cylinder")}
        >
          Add Cylinder
        </Button>
      </Stack>
    </Box>
  );
};

export default MeshesSidebar;
