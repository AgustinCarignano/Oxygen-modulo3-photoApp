import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "../../utils/utils.js";
import { CircularProgress } from "@mui/material";
import {
  addPhoto,
  deletePhoto,
  createHrefToDownload,
} from "../../features/myCollection/myCollectionSlice";
import {
  getPhotosFromAPI,
  getTrendingPhotos,
  setSearchWord,
  selectSearchPhotos,
  selectTrendingPhotos,
  selectSearchWord,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
  selectHasError,
} from "./searchPhotosSlice";
import SearchPhotosCard from "./SearchPhotosCard";
import PaginationBar from "../../components/PaginationBar";
import ScrollUp from "../../components/ScrollUp";
import Slider from "../../components/Slider";
import SearchBar from "../../components/SearchBar.jsx";
import "./searchPhotosStyle.css";

function SearchPhotosList() {
  const [inputSearch, setInputSearch] = useState("");
  const debouncedSearchTerm = useDebounce(inputSearch, 500);
  const dispatch = useDispatch();
  const searchPhotos = useSelector(selectSearchPhotos);
  const trendingPhotos = useSelector(selectTrendingPhotos);
  const searchWord = useSelector(selectSearchWord);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  //Realiza un llamado nuevo a la API al cambiar la pagina
  function handlePaginateChange(target) {
    const obj = {
      url: `https://api.unsplash.com/search/photos?page=${target}&per_page=12&query=${searchWord}`,
      page: target,
    };
    dispatch(getPhotosFromAPI(obj));
  }

  //Agrega o quita una foto de la coleccion de favoritos
  function handlePutInFav(photo, add) {
    if (add) {
      dispatch(addPhoto(photo));
      dispatch(createHrefToDownload({ url: photo.urls.full, id: photo.id }));
    } else {
      dispatch(deletePhoto(photo.id));
    }
  }

  //Realiza un llamado a la API con los terminos de busqueda. Se aplica un retrado con UseDebaunce
  useEffect(
    () => {
      const searchedWord = inputSearch.trim();
      let url;
      if (searchedWord !== "") {
        url = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${searchedWord}`;
      } else {
        url = "https://api.unsplash.com/photos/random?count=12";
      }
      const obj = {
        url,
        page: 1,
      };
      dispatch(setSearchWord(searchedWord));
      dispatch(getPhotosFromAPI(obj));
    },
    // eslint-disable-next-line
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  //Realiza el llamado incial a la API al montar el elemento
  useEffect(() => {
    const obj = {
      url: "https://api.unsplash.com/photos/random?count=12",
      page: 0,
    };
    dispatch(getPhotosFromAPI(obj));
    dispatch(setSearchWord(""));
    dispatch(getTrendingPhotos());
    setInputSearch("");
  }, [dispatch]);

  return (
    <div className="searchPhotosList">
      <section className="searchPhotosSlider">
        <h1 className="searchPhotosSlider__title">Start searching</h1>
        <div className="searchPhotosSlider__slider">
          <Slider photoList={trendingPhotos} />
        </div>
      </section>
      <section className="searchPhotosBar">
        <h2 className="searchPhotosBar__title">Type your search</h2>
        <div className="searchPhotosInput">
          <SearchBar
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
            value={inputSearch}
          />
        </div>
      </section>
      <section className="searchPhotosCards">
        {hasError ? (
          <h4 className="searchPhotosCards__emptySearch">
            There seems to have been a mistake. Please try again in a few
            minutes
          </h4>
        ) : isLoading ? (
          <CircularProgress color="inherit" className="spinner" />
        ) : (
          <>
            {searchWord ? (
              <h3 className="searchPhotosCards__title">
                Results for <strong>{searchWord}</strong>
              </h3>
            ) : (
              <div className="searchPhotosCards__title"></div>
            )}
            <div className="searchPhotosCards-container">
              {searchPhotos.length === 0 ? (
                <h4 className="searchPhotosCards__emptySearch">
                  No results found for these terms
                </h4>
              ) : (
                searchPhotos.map((item) => {
                  return (
                    <div key={item.id}>
                      <SearchPhotosCard
                        imgUrl={item.urls.small}
                        description={item.description}
                        onClick={handlePutInFav}
                        photo={item}
                      />
                    </div>
                  );
                })
              )}
            </div>
            <div className="searchPhotosCards__pagination">
              {currentPage !== 0 && (
                <PaginationBar
                  onChange={handlePaginateChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
            <ScrollUp />
          </>
        )}
      </section>
    </div>
  );
}

export default SearchPhotosList;
