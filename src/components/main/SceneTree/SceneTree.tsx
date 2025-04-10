import React from "react";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Icons from "../../shared/icons";
import { SceneObject, UseScene } from "../Scene/useScene";
import SceneTreeItem from "./SceneTreeItem";

interface SceneTreeProps {
  objects: SceneObject[];
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
  selectedObjectId: UseScene["selectedObjectId"];
}

const SceneTree = ({
  objects,
  selectedObjectId,
  onSetSelectedObjectId,
}: SceneTreeProps) => {
  console.count("SceneTree");

  return (
    <Box>
      <Box padding={2} borderBottom={1}>
        <Typography variant="h3">SCENE TREE</Typography>
        <Typography>{objects.length} objects</Typography>
      </Box>

      <List dense sx={{ overflowY: "scroll", height: 400 }}>
        {objects.map((object) => (
          <SceneTreeItem
            selected={object.id === selectedObjectId}
            onSetSelectedObjectId={onSetSelectedObjectId}
            key={object.id}
            object={object}
          />
        ))}
      </List>
    </Box>
  );
};

export default SceneTree;
