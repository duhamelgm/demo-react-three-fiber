import React, { useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import {
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { UseScene } from "../Scene/useScene";

interface TopbarProps {
  onUndo: UseScene["onUndo"];
  onRedo: UseScene["onRedo"];
  onSetObjects: UseScene["onSetObjects"];
  setFiestaMode: (value: boolean) => void;
}

const Topbar = ({
  onUndo,
  onRedo,
  onSetObjects,
  setFiestaMode,
}: TopbarProps) => {
  console.count("Topbar");

  const [isEditingProjectName, setIsEditingProejctName] = useState(false);
  const [projectName, setProjectName] = useState("My Scene Project");

  return (
    <Stack borderBottom={1} direction="row" spacing={1}>
      <Stack padding={2} direction="row" spacing={1} borderRight={1}>
        {isEditingProjectName ? (
          <>
            <TextField
              size="small"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              variant="outlined"
            />
            <IconButton
              color="primary"
              onClick={() => setIsEditingProejctName(false)}
            >
              <SaveOutlinedIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography
              variant="h2"
              sx={{
                maxWidth: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                textWrap: "nowrap",
              }}
            >
              {projectName}
            </Typography>
            <IconButton
              color="primary"
              onClick={() => setIsEditingProejctName(true)}
            >
              <EditOutlinedIcon />
            </IconButton>
          </>
        )}
      </Stack>

      <Stack padding={2} direction="row" spacing={1}>
        <IconButton color="primary" onClick={onUndo}>
          <UndoOutlinedIcon />
        </IconButton>
        <IconButton color="primary" onClick={onRedo}>
          <RedoOutlinedIcon />
        </IconButton>
        <IconButton color="primary">
          <DeleteOutlineOutlinedIcon onClick={() => onSetObjects({})} />
        </IconButton>

        <FormControlLabel
          control={<Switch onChange={(e, checked) => setFiestaMode(checked)} />}
          label="Fiesta"
        />
      </Stack>
    </Stack>
  );
};

export default Topbar;
