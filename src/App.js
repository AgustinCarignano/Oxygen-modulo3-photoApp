import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./features/searchPhotos/searchPhotosSlice.js";
import SearchPhotosList from "./features/searchPhotos/SearchPhotosList";
import MyCollectionList from "./features/myCollection/MyCollectionList";
import Navbar from "./components/Navbar";
import PrincipalPage from "./components/PrincipalPage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/photo-app" />} />
            <Route path="/photo-app/" element={<PrincipalPage />} />
            <Route
              path="/photo-app/searchPhotos"
              element={<SearchPhotosList />}
            />
            <Route
              path="/photo-app/myCollection"
              element={<MyCollectionList />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
