import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MyCollectionModal from "./MyCollectionModal";
import MyChip from "../../components/MyChip";
import editIcon from "../../images/editIcon.svg";
import tagIcon from "../../images/tagIcon.svg";
import bookmarkDelete from "../../images/bookmarkDelete.svg";
import downloadIcon from "../../images/downloadIcon.svg";

import { saveAs } from "file-saver";

export default function MyCollectionCard({ img }) {
  //Elementos que se muestran en la tarjeta y que estan asociadas a una ventana modal
  const editDescriptionElement = (
    <span className="icons editIcon">
      <img src={editIcon} alt="" />
    </span>
  );

  const tagElement = (
    <span className="icons tagIcon">
      <img src={tagIcon} alt="" />
    </span>
  );

  const deletePhotoElement = (
    <span className="icons bookmarkDelete">
      <img src={bookmarkDelete} alt="" />
    </span>
  );

  async function handleDownload() {
    const response = await fetch(img.urls.full, {
      headers: {
        Authorization: "Client-ID JbhJ4T2vDHGE_0YaRfxjaoZoCvGXoArWcn_g_DcP624",
      },
    });
    const blob = await response.blob();
    saveAs(window.URL.createObjectURL(blob), "image.jpeg");
  }

  return (
    <Card
      sx={{
        position: "relative",
        ":hover .icons": {
          opacity: 1,
        },
        width: 270,
      }}
    >
      <CardMedia
        component="img"
        height="360"
        alt={img.description}
        image={img.urls.thumb}
      />
      <CardContent>
        <h5 className="cardTitles">Description:</h5>
        {img.description ? (
          <p className="cardContent">{img.description}</p>
        ) : (
          <p className="cardContent">
            (You can add a description for helping you browse your collection)
          </p>
        )}
        <h5 className="cardTitles">Properties:</h5>
        <p className="cardContent">
          <b>Width: </b>
          {img.width}
        </p>
        <p className="cardContent">
          <b>Height: </b>
          {img.height}
        </p>
        <p className="cardContent">
          <b>Likes: </b>
          {img.likes}
        </p>
        <p className="cardContent">
          <b>Added: </b>
          {img.dateAdded}
        </p>
      </CardContent>
      <MyCollectionModal
        content={editDescriptionElement}
        type="editDescription"
        img={img}
      />
      <MyCollectionModal content={tagElement} type="addTag" img={img} />
      {img.tags.length !== 0 && (
        <div className="photoTagList">
          {img.tags.map((item, index) => {
            //let index = img.tags.findIndex((el) => el === item);
            return <MyChip key={index} label={item} type="individual" />;
          })}
        </div>
      )}
      <MyCollectionModal
        content={deletePhotoElement}
        type="deletePhoto"
        img={img}
      />
      <a href="#void" onClick={handleDownload}>
        <span className="icons downloadIcon">
          <img src={downloadIcon} alt="" />
        </span>
      </a>
    </Card>
  );
}
