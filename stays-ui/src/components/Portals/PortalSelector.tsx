import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import router from "next/router";
import React from "react";

import { globalContext } from "../../GlobalStore";
import { Entity, Role } from "../../models";

export interface EntitySelectorProps {
  onEntitySelected: (entity: Entity) => void;
}

export function EntitySelector<Type>(props: any) {
  const { globalState } = React.useContext(globalContext);
  const [selectedEntity, setSelectedEntity] = React.useState<(Entity & Type) | null>(null);
  const [selectedEntityId, setSelectedEntityId] = React.useState<string>("");

  function getSelectedEntity(entityId: string): (Entity & Type) | null {
    for (const entity of props.entities) {
      if (entity.id === entityId) {
        return entity;
      }
    }
    return null;
  }

  function handleEntityChange(newEntityId: string) {
    setSelectedEntityId(newEntityId);
  }

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "flex-end"
      }}>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="entity-label">Entityanization</InputLabel>
        <Select
          sx={{ color: "action.hover" }}
          labelId="entityLabel"
          id="entity-select"
          value={selectedEntityId}
          label={props.label}
          onChange={(event: SelectChangeEvent) => {
            handleEntityChange(event?.target.value);
          }}>
          {props.entities.map((entity: Entity & Type) => (
            <MenuItem key={entity.id} value={entity.id}>
              {entity.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
