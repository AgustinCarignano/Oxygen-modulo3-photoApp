import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function MyChip(props) {
  const { type, label, handleClick, handleDelete } = props;
  const [showOnDelete, setShowOnDelete] = useState(false);
  const chipType = {
    general: {
      backgroundHover: "#f2c288",
    },
    individual: {
      backgroundHover: "#f2c28880",
    },
  };

  function handleClickAction() {
    handleClick(props.label);
    setShowOnDelete(true);
  }

  function handleDeleteAction() {
    handleDelete(props.label);
    setShowOnDelete(false);
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{
          backgroundColor: "#f2c28880",
          ":hover": {
            backgroundColor: chipType[type].backgroundHover,
          },
          color: "#402712",
          marginBottom: "2px",
        }}
        size="small"
        label={label}
        onClick={handleClick ? handleClickAction : null}
        onDelete={handleDelete && showOnDelete ? handleDeleteAction : null}
      />
    </Stack>
  );
}
