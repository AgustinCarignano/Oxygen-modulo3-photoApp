import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// access key: JbhJ4T2vDHGE_0YaRfxjaoZoCvGXoArWcn_g_DcP624
// secret key: xHnOgJRf3I8L1EkTjf_w7UJ9k7dDsv2jiyUj8twBnvE

//Estado inicial del slice
const initialState = {
  photos: [],
  trendingPhotos: [],
  searchWord: "",
  currentPage: 0,
  totalPages: 0,
  isLoading: false,
  hasError: false,
};

//Funcion asincrona que realiza el pedido a la API y retorna los datos
async function fetchToApi(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: "Client-ID JbhJ4T2vDHGE_0YaRfxjaoZoCvGXoArWcn_g_DcP624",
    },
  });
  const data = await response.json();
  return data;
}

//Thunk para realizar llamado a la API, con los terminos de busqueda o de forma aleatoria
export const getPhotosFromAPI = createAsyncThunk(
  "searchPhotos/getPhotos",
  async (searchObj) => {
    const { url, page } = searchObj;
    const data = await fetchToApi(url);
    const obj = {
      data,
      currentPage: page,
      totalPages: parseInt(data.total_pages) || 1,
    };
    return obj;
  }
);

//Thunk para realizar un pedido de fotos a la API para mostrar en el slider
export const getTrendingPhotos = createAsyncThunk(
  "searchPhotos/getTrendingPhotos",
  async () => {
    const randomPage = Math.floor(Math.random() * 50);
    const url = `https://api.unsplash.com/search/photos?query=trends&orientation=landscape&page=${randomPage}`;
    const data = await fetchToApi(url);
    const imgs = data.results.map((item) => {
      return { src: item.urls.regular, alt: item.description };
    });
    return imgs;
  }
);

export const searchPhotosSlice = createSlice({
  name: "searchPhotos",
  initialState,
  reducers: {
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosFromAPI.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPhotosFromAPI.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getPhotosFromAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        if (action.payload.data.results) {
          state.photos = action.payload.data.results;
        } else {
          state.photos = action.payload.data;
        }
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTrendingPhotos.fulfilled, (state, action) => {
        state.trendingPhotos = action.payload;
      });
  },
});

export const { setSearchWord } = searchPhotosSlice.actions;

export const selectSearchPhotos = (state) => state.searchPhotos.photos;
export const selectTrendingPhotos = (state) =>
  state.searchPhotos.trendingPhotos;
export const selectSearchWord = (state) => state.searchPhotos.searchWord;
export const selectIsLoading = (state) => state.searchPhotos.isLoading;
export const selectHasError = (state) => state.searchPhotos.hasError;
export const selectCurrentPage = (state) => state.searchPhotos.currentPage;
export const selectTotalPages = (state) => state.searchPhotos.totalPages;

export default searchPhotosSlice.reducer;
