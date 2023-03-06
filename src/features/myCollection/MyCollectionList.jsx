import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectMyCollectionPhotos,
  selectMyCollectionTagList,
} from "./myCollectionSlice";
import MyCollectionCard from "./MyCollectionCard";
import SearchBar from "../../components/SearchBar";
import MyChip from "../../components/MyChip";
import PaginationBar from "../../components/PaginationBar";
import ScrollUp from "../../components/ScrollUp";
import MyButton from "../../components/MyButton";
import MySelect from "../../components/MySelect";
import Slider from "../../components/Slider";
import "./myCollectionStyle.css";

function MyCollectionList() {
  const [inputSearch, setInputSearch] = useState("");
  const [photosToRender, setPhotosToRender] = useState([]);
  const [sliderPhotos, setSliderPhotos] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [tagToFilter, setTagToFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const myCollectionPhotos = useSelector(selectMyCollectionPhotos);
  const tagList = useSelector(selectMyCollectionTagList);

  //Agrega al estado el tag que se recibe por parametro y que permite filtrar las imagenes a mostrar
  function handleIncludeTagToFilter(tag) {
    const newArrayOftags = [...tagToFilter];
    newArrayOftags.push(tag);
    setTagToFilter(newArrayOftags);
    setCurrentPage(1);
  }

  //Elimina el tag de la lista para filtrar
  function handleExcludeTagToFilter(tag) {
    const newArrayOftags = [...tagToFilter];
    const index = newArrayOftags.findIndex((item) => item === tag);
    newArrayOftags.splice(index, 1);
    setTagToFilter(newArrayOftags);
    setCurrentPage(1);
  }

  //Al montar el componente, se obtiene un maximo de 10 fotos para el slider
  useEffect(() => {
    const length = myCollectionPhotos.length;
    if (length <= 10) {
      const photos = myCollectionPhotos.map((item) => {
        return { src: item.urls.regular, alt: item.description };
      });
      setSliderPhotos(photos);
    } else {
      const copyOfPhotos = [...myCollectionPhotos];
      const randomPhotos = [];
      while (randomPhotos.length < 10) {
        const randomIndex = Math.floor(Math.random() * copyOfPhotos.length);
        randomPhotos.push(copyOfPhotos[randomIndex]);
        copyOfPhotos.splice(randomIndex, 1);
      }
      const photos = randomPhotos.map((item) => {
        return { src: item.urls.regular, alt: item.description };
      });
      setSliderPhotos(photos);
    }
  }, [myCollectionPhotos]);

  //Se filtran las fotos de la coleccion para mostrar aquellan que coinciden con todos los criterios
  useEffect(() => {
    let photos = myCollectionPhotos.filter((item) =>
      item.description.toLowerCase().includes(inputSearch.toLowerCase())
    );
    if (tagToFilter.length !== 0) {
      photos = photos.filter((item) => {
        for (const tag of tagToFilter) {
          if (!item.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      });
    }
    photos.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) return -1;
      else if (a[orderBy] < b[orderBy]) return 1;
      return 0;
    });
    const sliceOfPhotos = photos.slice(
      (currentPage - 1) * 12,
      currentPage * 12
    );
    //setear la cantidad de paginas mostrando 12 fotos por pagina
    setTotalPages(Math.ceil(photos.length / 12));
    setPhotosToRender(sliceOfPhotos);
  }, [myCollectionPhotos, inputSearch, orderBy, tagToFilter, currentPage]);

  //Retorno si no hay imagenes agregadas a la coleccion
  if (myCollectionPhotos.length === 0) {
    return (
      <div className="emptyCollection">
        <h1 className="emptyCollection__title">There is nothing here yet!</h1>
        <h2 className="emptyCollection__subtitle">Start searching now</h2>
        <Link to="/searchPhotos">
          <MyButton text="Search" margin={{ top: "-5px", btm: "50px" }} />
        </Link>
      </div>
    );
  }

  //Retorno cuando hay imganes agregadas a la coleccion
  return (
    <div className="myCollectionList">
      <section className="myCollectionSlider">
        <h1 className="myCollectionSlider__title">Browse your collection</h1>
        <div className="myCollectionSlider__slider">
          <Slider photoList={sliderPhotos} />
        </div>
      </section>
      <section className="myCollectionBar">
        <h2 className="myCollectionBar__title">Search by description</h2>
        <SearchBar
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
        />
        <div className="myCollectionBar__filters">
          <MySelect
            optionValue={orderBy}
            onChange={(option) => {
              setOrderBy(option);
              setCurrentPage(1);
            }}
          />
          {tagList.length !== 0 && (
            <div className="globalTagList">
              {tagList.map((item) => {
                let index = tagList.findIndex((el) => el === item);
                return (
                  <MyChip
                    key={index}
                    label={item}
                    type="general"
                    handleClick={handleIncludeTagToFilter}
                    handleDelete={handleExcludeTagToFilter}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="myCollectionCards">
        {inputSearch !== "" || tagToFilter.length !== 0 ? (
          <h3 className="myCollectionCards__title">Results</h3>
        ) : (
          <div className="myCollectionCards__title"></div>
        )}
        <div className="myCollectionCards-container">
          {photosToRender.length === 0 ? (
            <p className="myCollectionCard__emptyFilter">
              No hay coincidencias
            </p>
          ) : (
            photosToRender.map((item) => {
              return (
                <div key={item.id}>
                  <MyCollectionCard img={item} />
                </div>
              );
            })
          )}
        </div>
        <div className="myCollectionCards__pagination">
          {totalPages > 1 && (
            <PaginationBar
              onChange={(v) => setCurrentPage(v)}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
        <ScrollUp />
      </section>
    </div>
  );
}

export default MyCollectionList;
