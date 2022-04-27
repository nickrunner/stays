import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import router from "next/router";
import React from "react";

import { UserClient } from "../../../clients/userClient";
import { globalContext } from "../../../GlobalStore";
import { Org, OrgRecord, Role } from "../../../models";

export interface OrgSelectorProps {
  onOrgSelected: (org: Org) => void;
  defaultOrgId: string;
  orgs: OrgRecord[];
}

export function OrgSelector(props: any) {
  const [selectedOrgId, setSelectedOrgId] = React.useState<string>("");
  const [selectedOrg, setSelectedOrg] = React.useState<OrgRecord | null>(null);

  React.useEffect(() => {
    setSelectedOrg(getSelectedOrg(selectedOrgId));
    return;
  }, [selectedOrgId]);

  function getSelectedOrg(orgId: string): OrgRecord | null {
    for (const org of props.orgs) {
      if (org.id === orgId) {
        return org;
      }
    }
    return null;
  }

  function handleOrgChange(newOrgId: string) {
    setSelectedOrgId(newOrgId);
  }

  return (
    <Box
      sx={{
        display: props.orgs.length > 1 ? "flex" : "none",
        justifyContent: "flex-end"
      }}>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="org-label">Organization</InputLabel>
        <Select
          sx={{ color: "action.hover" }}
          labelId="orgLabel"
          id="org-select"
          value={selectedOrgId}
          defaultValue={props.defaultOrgId}
          label="Host Account"
          onChange={(event: SelectChangeEvent) => {
            handleOrgChange(event?.target.value);
          }}>
          {props.orgs.map((org: OrgRecord) => (
            <MenuItem key={org.id} value={org.id}>
              {org.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
