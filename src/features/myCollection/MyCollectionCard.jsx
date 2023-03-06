import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MyCollectionModal from "./MyCollectionModal";
import MyChip from "../../components/MyChip";

export default function MyCollectionCard({ img }) {
  //Elementos que se muestran en la tarjeta y que estan asociadas a una ventana modal
  const editDescriptionElement = (
    <span className="icons editIcon">
      <img src="/images/editIcon.svg" alt="" />
    </span>
  );

  const tagElement = (
    <span className="icons tagIcon">
      <img src="/images/tagIcon.svg" alt="" />
    </span>
  );

  const deletePhotoElement = (
    <span className="icons bookmarkDelete">
      <img src="/images/bookmarkDelete.svg" alt="" />
    </span>
  );

  return (
    <Card
      sx={{
        position: "relative",
        ":hover .icons": {
          opacity: 1,
        },
        maxWidth: 270,
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
          {img.tags.map((item) => {
            let index = img.tags.findIndex((el) => el === item);
            return <MyChip key={index} label={item} type="individual" />;
          })}
        </div>
      )}
      <MyCollectionModal
        content={deletePhotoElement}
        type="deletePhoto"
        img={img}
      />
      <a href="#void" downloadurl={img.urls.full} download="image.jpg">
        <span className="icons downloadIcon">
          <img src="/images/downloadIcon.svg" alt="" />
        </span>
      </a>
    </Card>
  );
}
