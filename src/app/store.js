import { configureStore } from "@reduxjs/toolkit";
import searchPhotosReducer from "../features/searchPhotos/searchPhotosSlice";
import myCollectionReducer from "../features/myCollection/myCollectionSlice";

export const store = configureStore({
  reducer: {
    searchPhotos: searchPhotosReducer,
    myCollection: myCollectionReducer,
  },
});
