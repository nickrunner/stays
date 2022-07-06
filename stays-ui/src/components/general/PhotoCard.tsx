import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { XYCoord } from "dnd-core";
import * as React from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import { Photo } from "../../models";

export interface PhotoCardProps {
  photo: Photo;
  id: number;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, id, index, moveCard }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  function handleDescriptionChange(description: string) {
    photo.description = description;
  }

  const style = {
    cursor: "move"
  };

  return (
    <Card
      sx={{ m: 3, border: "1px solid", borderColor: "primary.dark" }}
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}>
      <CardMedia component="img" height="200" image={photo.url} />
      <CardContent sx={{ height: 100 }}>
        <TextField
          sx={{ mt: 0, p: 0 }}
          label="Description of Photo"
          fullWidth
          multiline
          rows={1}
          defaultValue={photo.description}
          onChange={(e: any) => handleDescriptionChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};
