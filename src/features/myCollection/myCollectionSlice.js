import { createSlice } from "@reduxjs/toolkit";

//Estado inicial cuando no hay nada guardado en el localStorage
const defaultInitialState = {
  photos: [],
  tagList: [],
};

//Obtiene los valores del localStorage
const initialState =
  JSON.parse(localStorage.getItem("myCollection")) || defaultInitialState;

export const myCollectionSlice = createSlice({
  name: "myCollection",
  initialState,
  reducers: {
    //Agrega una foto a la coleccion ------------------------------------------
    addPhoto: (state, action) => {
      const { id, description, width, height, likes } = action.payload;
      const alreadyExist = state.photos.some((item) => item.id === id);
      if (!alreadyExist) {
        const { full, thumb, regular } = action.payload.urls;
        const urls = { full, thumb, regular };
        const date = new Date();
        const favPhoto = {
          id,
          description: description || "",
          width,
          height,
          likes,
          urls,
          dateAdded: date.toLocaleString(),
          tags: [],
        };
        state.photos.push(favPhoto);
        localStorage.setItem("myCollection", JSON.stringify(state));
      }
    },
    //elimina una foto de la coleccion ------------------------------------------------
    deletePhoto: (state, action) => {
      const index = state.photos.findIndex((img) => img.id === action.payload);
      state.photos.splice(index, 1);
      localStorage.setItem("myCollection", JSON.stringify(state));
    },
    //Se modifica la descripcion de la foto -------------------------------------------
    editDescription: (state, action) => {
      const { photoId, newDescription } = action.payload;
      const photoToEdit = state.photos.find((img) => img.id === photoId);
      photoToEdit.description = newDescription;
      localStorage.setItem("myCollection", JSON.stringify(state));
    },
    //Se agrega un tag a la lista de tags de la foto referida ----------------------------
    addTag: (state, action) => {
      const { photoId, newTag } = action.payload;
      const photoToEdit = state.photos.find((img) => img.id === photoId);
      if (!photoToEdit.tags.includes(newTag)) {
        photoToEdit.tags.push(newTag);
        if (!state.tagList.includes(newTag)) {
          state.tagList.push(newTag);
        }
      }
      localStorage.setItem("myCollection", JSON.stringify(state));
    },
    //Elimina un tag de la lista de tags de la foto ------------------------------------
    deleteTag: (state, action) => {
      const { photoId, tagToRemove } = action.payload;
      const photoToEdit = state.photos.find((img) => img.id === photoId);
      const tagIndexInPhoto = photoToEdit.tags.findIndex(
        (item) => item === tagToRemove
      );
      photoToEdit.tags.splice(tagIndexInPhoto, 1);
      let newTagList = [];
      for (let i = 0; i < state.photos.length; i++) {
        state.photos[i].tags.forEach((item) => {
          if (!newTagList.includes(item)) newTagList.push(item);
        });
      }
      state.tagList = [...newTagList];
      localStorage.setItem("myCollection", JSON.stringify(state));
    },
  },
});

export const { addPhoto, deletePhoto, editDescription, addTag, deleteTag } =
  myCollectionSlice.actions;

export const selectMyCollectionPhotos = (state) => state.myCollection.photos;
export const selectMyCollectionTagList = (state) => state.myCollection.tagList;

export default myCollectionSlice.reducer;
