import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InMessage {
    page: string,
    idUri: string,
    favorites: any[],
    refreshFavorites: boolean,
    playingTrack: any,
    playState:boolean
}
const initialState: InMessage = {
    page: "home",
    idUri: "",
    favorites: [],
    refreshFavorites: false,
    playingTrack: "",
    playState:false
};

export const spotifySlice = createSlice({
    name: "spotify",
    initialState,
    reducers: {
        setPageState(state: any, action: PayloadAction<any>) {
            state.page = action.payload;
        },
        setUriState(state: any, action: PayloadAction<any>) {
            state.idUri = action.payload;
        },
        setFavoritesState(state: any, action: PayloadAction<any>) {
            state.favorites = action.payload;
        },
        setRefreshFavorites(state: any, action: PayloadAction<any>) {
            state.refreshFavorites = action.payload;
        },
        setPlayingTrack(state: any, action: PayloadAction<any>) {
            state.playingTrack = action.payload;
        },
        setPlayState(state: any, action: PayloadAction<any>) {
            state.playState = action.payload;
        },
    },
});

export const { setPageState, setUriState, setFavoritesState,setRefreshFavorites, setPlayingTrack,setPlayState } = spotifySlice.actions;

export const usePagesState = (state: any) => state.spotify.page;
export const useUriState = (state: any) => state.spotify.idUri;
export const useFavoritesState = (state: any) => state.spotify.favorites;
export const useFavoritesRefreshState = (state: any) => state.spotify.refreshFavorites;
export const usePlayingTrackState = (state: any) => state.spotify.playingTrack;
export const usePlayState = (state: any) => state.spotify.playState;


export default spotifySlice.reducer;