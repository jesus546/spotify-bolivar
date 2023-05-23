import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useDispatch, useSelector } from "react-redux";
import { setPlayState, setPlayingTrack, setRefreshFavorites, usePlayState } from "@/store/pages";


const Player: React.FC<{ accessToken: any, trackUri: any }> = ({ accessToken, trackUri }) => {
  const dispatch = useDispatch()
  const play = useSelector(usePlayState)


  useEffect(() => {
    if (trackUri) {
      dispatch(setPlayState(true))
    }
  }, [trackUri, dispatch]);

  if (!accessToken) return null;

  return (

    <SpotifyPlayer
      styles={{
        activeColor: "#f8db66",
        bgColor: "#008c44",
        color: "#f8db66",
        loaderColor: "#f8db66",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#f8db66",
        height: 70,
        sliderTrackColor: "#535353",
        sliderTrackBorderRadius: "4px",
        sliderHandleColor: "#f8db66",
        errorColor: "#f8db66",
      }}
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        console.log(state);
        
        if (state.type === 'favorite_update') {
          dispatch(setRefreshFavorites(true))
        }
       
        dispatch(setPlayState(state.isPlaying))
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      magnifySliderOnHover={true}
      autoPlay={true}
    />

  );
}

export default Player;
