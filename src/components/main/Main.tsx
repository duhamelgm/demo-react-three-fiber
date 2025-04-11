import { Box, Grid, Stack } from "@mui/material";
import React, { useMemo } from "react";

import MeshesSidebar from "./MeshesSidebar";
import ObjectAttributes from "./ObjectAttributes";
import Scene from "./Scene";
import useScene from "./Scene/useScene";
import SceneTree from "./SceneTree";
import Topbar from "./Topbar";
import useFiesta from "./useFiesta";

const Main = () => {
  const {
    objects,
    onSetObjects,
    onUndo,
    onRedo,
    onSetSelectedObjectId,
    selectedObjectId,
  } = useScene();
  const { fiestaMode, setFiestaMode } = useFiesta();

  const objectsList = useMemo(() => Object.values(objects), [objects]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Topbar
        onUndo={onUndo}
        onRedo={onRedo}
        onSetObjects={onSetObjects}
        setFiestaMode={setFiestaMode}
      />

      <Grid container sx={{ flexGrow: 1 }}>
        <Grid size={2}>
          <MeshesSidebar
            onSetSelectedObjectId={onSetSelectedObjectId}
            objects={objects}
            onSetObjects={onSetObjects}
          />
        </Grid>
        <Grid size={7}>
          <Scene
            objects={objectsList}
            selectedObjectId={selectedObjectId}
            fiestaMode={fiestaMode}
            onSetSelectedObjectId={onSetSelectedObjectId}
          />
        </Grid>
        <Grid size={3}>
          <Stack direction="column" height="100%" borderLeft={1}>
            <Box borderBottom={1}>
              <SceneTree
                onSetSelectedObjectId={onSetSelectedObjectId}
                selectedObjectId={selectedObjectId}
                objects={objectsList}
              />
            </Box>

            <Box flexGrow={1}>
              <ObjectAttributes
                selectedObjectId={selectedObjectId}
                objects={objects}
                onSetObjects={onSetObjects}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
