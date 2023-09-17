import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const wallsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => ({
        url: `/wallhaven/home`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopWalls: builder.query({
      query: ({ page, toprange }) => ({
        url: `/wallhaven/topwalls?page=${page}&toprange=${toprange}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getLatestWalls: builder.query({
      query: ({ page }) => ({
        url: `/wallhaven/latest?page=${page}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getRandomWalls: builder.query({
      query: ({ page }) => ({
        url: `/wallhaven/random?page=${page}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSearchWalls: builder.query({
      query: ({ searchTerm, page }) => ({
        url: `/wallhaven/search?search=${searchTerm}&page=${page}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getFetchWall: builder.query({
      query: ({ id }) => ({
        url: `/wallhaven/w/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetHomeQuery,
  useGetTopWallsQuery,
  useGetLatestWallsQuery,
  useGetRandomWallsQuery,
  useGetSearchWallsQuery,
  useGetFetchWallQuery,
} = wallsApiSlice;
