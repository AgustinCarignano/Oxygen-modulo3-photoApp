import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import controlArrow from "../images/controlArrow.svg";

const theme = createTheme({
  palette: {
    custom: {
      main: "#736D4F",
      contrastText: "#fff",
    },
  },
});

function Slide({ photoList }) {
  const [photoToShow, setPhotoToShow] = useState(0);
  const [classShow, setClassShow] = useState("showNext");
  const [classHidden, setClassHidden] = useState("hiddenNext");

  function handleNextPhoto() {
    photoToShow === photoList.length - 1
      ? setPhotoToShow(0)
      : setPhotoToShow(photoToShow + 1);
    setClassName("next");
  }

  function handlePrevPhoto() {
    photoToShow === 0
      ? setPhotoToShow(photoList.length - 1)
      : setPhotoToShow(photoToShow - 1);
    setClassName("back");
  }

  function handleMoveTo(index) {
    if (index < photoToShow) {
      setClassName("back");
    } else {
      setClassName("next");
    }
    setPhotoToShow(index);
  }

  function setClassName(moveType) {
    if (moveType === "back") {
      setClassShow("showPrev");
      setClassHidden("hiddenPrev");
    } else {
      setClassShow("showNext");
      setClassHidden("hiddenNext");
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextPhoto();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="slider">
        <span
          className="slider__controls slider-prevImg"
          onClick={handlePrevPhoto}
        >
          <img src={controlArrow} alt="arrow icon" />
        </span>
        <span
          className="slider__controls slider-nextImg"
          onClick={handleNextPhoto}
        >
          <img src={controlArrow} alt="arrow icon" />
        </span>
        {photoList.map((item) => {
          const index = photoList.findIndex((el) => el === item);
          return (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={photoToShow === index ? classShow : classHidden}
            />
          );
        })}
        <Box sx={{ width: 280 }} className="slider__position">
          <Slider
            value={photoToShow + 1}
            onChange={(e, newValue) => handleMoveTo(newValue - 1)}
            marks
            min={1}
            max={photoList.length}
            color="custom"
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Slide;
