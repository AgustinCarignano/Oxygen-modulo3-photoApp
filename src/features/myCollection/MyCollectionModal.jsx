import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMyCollectionTagList,
  deletePhoto,
  editDescription,
  addTag,
  deleteTag,
} from "./myCollectionSlice";
import MyChip from "../../components/MyChip";
import MyButton from "../../components/MyButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: 350,
  bgcolor: "background.paper",
  border: "1px solid #402712",
  borderRadius: "20px",
  outline: "none",
  textAlign: "center",
  color: "#402712",
  boxShadow: 24,
  p: 4,
};

export default function MyCollectionModal(props) {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const tagList = useSelector(selectMyCollectionTagList);
  const dispatch = useDispatch();

  const { content, type, img } = props;

  //Segun el tipo de modal que se pase por props, se asigna un comportamiento a la ventana modal
  const modalTypes = {
    editDescription: {
      title: "Type a new description",
      options: [],
      placeholder: "Description...",
      showTags: false,
      confirmAction: (photoId, newDescription) =>
        newDescription !== "" &&
        dispatch(editDescription({ photoId, newDescription })),
    },
    addTag: {
      title: "Chose a tag or create one",
      option: [],
      placeholder: "New tag...",
      showTags: tagList.length > 0 ? true : false,
      confirmAction: (photoId, newTag) =>
        newTag !== "" && dispatch(addTag({ photoId, newTag })),
    },
    deletePhoto: {
      title: "Do you really want to delete this photo?",
      option: [],
      placeholder: "",
      showTags: false,
      confirmAction: (photoId) => dispatch(deletePhoto(photoId)),
    },
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleOnSubmit(input) {
    modalTypes[type].confirmAction(img.id, input);
    setInputText("");
    setOpen(false);
  }

  return (
    <div>
      <div onClick={handleOpen}>{content}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            style={{ font: "normal 400 20px/26px 'Montserrat', sans-serif" }}
          >
            {modalTypes[type].title}
          </Typography>
          {modalTypes[type].showTags && (
            <div>
              <h6 className="modal__subtitle">Existing labels</h6>
              <div className="modal__tagList">
                {tagList.map((item) => {
                  let index = tagList.findIndex((el) => el === item);
                  if (img.tags.some((el) => el === item)) {
                    return (
                      <MyChip key={index} label={item} type="individual" />
                    );
                  }
                  return (
                    <MyChip
                      key={index}
                      label={item}
                      type="individual"
                      handleClick={() =>
                        modalTypes[type].confirmAction(img.id, item)
                      }
                    />
                  );
                })}
              </div>
              <h6 className="modal__subtitle">Type a new one</h6>
            </div>
          )}
          <form className="modal__form">
            {modalTypes[type].placeholder && (
              <textarea
                name={type}
                id={type}
                cols="30"
                rows="5"
                placeholder={modalTypes[type].placeholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            )}
            {img.tags.length !== 0 && modalTypes[type].showTags && (
              <div>
                <h6 className="modal__subtitle">Delete a tag from the list</h6>
                <div className="modal__tagList">
                  {img.tags.map((item) => {
                    let index = img.tags.findIndex((el) => el === item);
                    return (
                      <MyChip
                        key={index}
                        label={item}
                        type="individual"
                        handleClick={() =>
                          dispatch(
                            deleteTag({
                              photoId: img.id,
                              tagToRemove: item,
                            })
                          )
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <MyButton
              text={
                inputText !== "" || type === "deletePhoto" ? "Confirm" : "Close"
              }
              onClick={() => handleOnSubmit(inputText)}
              margin={{ top: "20px", btm: "0px" }}
            />
          </form>
          <span className="closeModalIcon" onClick={handleClose}>
            <img src="/images/closeIcon.svg" alt="" />
          </span>
        </Box>
      </Modal>
    </div>
  );
}
