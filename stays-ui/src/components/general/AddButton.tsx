import { Add } from "@material-ui/icons";
import { IconButton } from "@mui/material";

export interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton(props: AddButtonProps) {
  return (
    <IconButton
      sx={{ height: 50, width: 50, bgcolor: "primary.dark" }}
      color="secondary"
      aria-label="open cancellation calendar"
      onClick={(e: any) => {
        e.stopPropagation();
        props.onClick(e);
      }}>
      <Add />
    </IconButton>
  );
}
