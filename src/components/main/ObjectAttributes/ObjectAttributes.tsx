import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import Icons from "../../shared/icons";
import { SceneObject, UseScene } from "../Scene/useScene";

interface ObjectAttributesProps {
  objects: UseScene["objects"];
  selectedObjectId: UseScene["selectedObjectId"];
  onSetObjects: UseScene["onSetObjects"];
}

const ObjectAttributes = ({
  objects,
  selectedObjectId,
  onSetObjects,
}: ObjectAttributesProps) => {
  console.count("ObjectAttributes");

  const getItemIcon = (object: SceneObject) => {
    switch (object.shape) {
      case "cube":
        return <Icons.Cube />;
      case "sphere":
        return <Icons.Sphere />;
      case "cylinder":
        return <Icons.Cylinder />;
    }
  };

  if (!selectedObjectId || !(selectedObjectId in objects)) return null;

  const object = objects[selectedObjectId];

  const onUpdateObject = (key: string, value: string | number) => {
    const updatedObject = {
      ...object,
      [key]: value,
    };
    onSetObjects({
      ...objects,
      [selectedObjectId]: updatedObject,
    });
  };

  const onUpdateObjectPosition = (index: number, value: number) => {
    const newPosition: SceneObject["position"] = [...object.position];
    newPosition[index] = value;

    onSetObjects({
      ...objects,
      [selectedObjectId]: {
        ...object,
        position: newPosition,
      },
    });
  };

  return (
    <Stack>
      <ListItem>
        <ListItemIcon>{getItemIcon(object)}</ListItemIcon>
        <ListItemText primary={`Mesh: ${object.shape}`} secondary={object.id} />
      </ListItem>

      <Box
        padding={2}
        paddingTop={0}
        paddingBottom={0}
        gap={1}
        display="grid"
        gridTemplateColumns="auto 1fr"
        alignItems="center"
      >
        <Typography>Name</Typography>

        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={object.name}
          onChange={(e) => onUpdateObject("name", e.target.value)}
        />
      </Box>

      <Box
        display="grid"
        paddingTop={0}
        gridTemplateColumns="auto 20px 1fr"
        padding={2}
        gap={0.5}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          Position
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          X
        </Box>
        <Box>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={object.position[0]}
            onChange={(e) => onUpdateObjectPosition(0, Number(e.target.value))}
          />
        </Box>

        <Box></Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          Y
        </Box>
        <Box>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={object.position[1]}
            onChange={(e) => onUpdateObjectPosition(1, Number(e.target.value))}
          />
        </Box>

        <Box></Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          Z
        </Box>
        <Box>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={object.position[2]}
            onChange={(e) => onUpdateObjectPosition(2, Number(e.target.value))}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default ObjectAttributes;
