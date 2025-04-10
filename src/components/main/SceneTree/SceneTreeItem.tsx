import React, { useCallback, memo } from "react";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Icons from "../../shared/icons";
import { SceneObject, UseScene } from "../Scene/useScene";

interface SceneTreeItemProps {
  object: SceneObject;
  onSetSelectedObjectId: UseScene["onSetSelectedObjectId"];
  selected: boolean;
}

const SceneTreeItem = ({
  object,
  selected,
  onSetSelectedObjectId,
}: SceneTreeItemProps) => {
  console.count(`SceneTreeItem ${object.id}`);

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

  const onClickItem = useCallback(
    (id: string) => {
      onSetSelectedObjectId(id);
    },
    [onSetSelectedObjectId],
  );

  return (
    <ListItemButton selected={selected} onClick={() => onClickItem(object.id)}>
      <ListItemIcon>{getItemIcon(object)}</ListItemIcon>
      <ListItemText
        primary={`${object.shape}: ${object.name}`}
        secondary={object.id}
      />
    </ListItemButton>
  );
};

export default memo(SceneTreeItem, (prevProps, nextProps) => {
  return (
    prevProps.object.name === nextProps.object.name &&
    prevProps.selected === nextProps.selected
  );
});
