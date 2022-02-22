import { Box, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { StayClient } from "../../clients/stayClient";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../../../common/models/StayAttributes";
import { theme } from "../../Theme";
import { stayContext } from "./StayContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(item: string, selected: string[] | undefined) {
    if(! selected){
        return;
    }
    return {
      fontWeight:
        selected.indexOf(item) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export type StayAttributeSelectorProps = {
    type: StayAttributeType;
    label: string;
}

export default function StayAttributeSelector(props: StayAttributeSelectorProps) {
    const { stay } = React.useContext(stayContext);
    const [attributes, setAttributes] = React.useState<StayAttributeRecord[]>([]);

    function getSelected(){
        switch(props.type){
            case StayAttributeType.Amenity:
                return stay.amenities;
            case StayAttributeType.PropertyType:
                return stay.type;
            case StayAttributeType.SpecialInterest:
                return stay.specialInterests;
            default:
                return [];
        }
    }
    const [selectedAttributes, setSelectedAttributes] = React.useState<string[]>(getSelected());

    const getStayAttributes = async() => {
        const pt: StayAttributeRecord[] = await new StayClient().getStayAttributes(props.type);
        setAttributes(pt);
    }

    React.useEffect(() => {
        getStayAttributes();
        return;
    }, []);

    function handleAttributeChange(type: StayAttributeType, event: SelectChangeEvent<string[]>){
        const {
           target: { value },
         } = event;
         
         switch(props.type){
            case StayAttributeType.Amenity:
                stay.amenities = typeof value === 'string' ? value.split(',') : value;
                setSelectedAttributes(stay.amenities);
                break;
            case StayAttributeType.PropertyType:
                stay.type = typeof value === 'string' ? value.split(',') : value;
                setSelectedAttributes(stay.type);
                break;
            case StayAttributeType.SpecialInterest:
                stay.specialInterests = typeof value === 'string' ? value.split(',') : value;
                setSelectedAttributes(stay.specialInterests);
                break;
         }
         
     }



     return (
        <Select
        required
        sx={{width:500, mr:1}}
        label={props.label}
        multiple
        value={selectedAttributes}
        defaultValue={selectedAttributes}
        onChange={(e) => handleAttributeChange(StayAttributeType.PropertyType, e)}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: any) => (
                <Chip key={value} label={value} />
                ))}
            </Box>
            )}
        MenuProps={MenuProps}
    >
        {attributes.map((attr: StayAttribute) => {
            return <MenuItem
            key={attr.name}
            value={attr.name}
            style={getStyles(attr.name, stay.type)}
            >{attr.name}</MenuItem>
        })}
        
    </Select>
     );
}