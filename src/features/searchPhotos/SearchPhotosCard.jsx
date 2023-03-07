import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Snackbar } from "@mui/material";
import bookmark from "../../images/bookmark.svg";

export default function SearchPhotosCard(props) {
  const [btnSelected, setBtnSelected] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { imgUrl, description, photo, onClick } = props;

  function handleOnClick() {
    setBtnSelected(!btnSelected);
    onClick(photo, !btnSelected);
    setOpen(true);
  }

  const btnClassName = btnSelected
    ? "bookmarkIcon bookmarkIcon-selected"
    : "bookmarkIcon";

  return (
    <Card
      sx={{
        position: "relative",
        ":hover .bookmarkIcon": {
          opacity: 1,
        },
        width: 270,
        height: 360,
      }}
    >
      <CardMedia
        component="img"
        alt={description}
        height="360"
        image={imgUrl}
      />
      <span className={btnClassName} onClick={handleOnClick}>
        <img src={bookmark} alt="" />
      </span>
      <Snackbar
        sx={{ color: "red" }}
        open={open}
        message={
          btnSelected ? "Add to your collection" : "Remove from your collection"
        }
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={2000}
      />
    </Card>
  );
}
