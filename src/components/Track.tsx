import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { ImHeadphones } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setPageState, setPlayState, setPlayingTrack, setRefreshFavorites, setUriState, useFavoritesState, usePlayState, usePlayingTrackState } from "@/store/pages";
import SpotifyWebApi from 'spotify-web-api-node'
import { useSession } from "next-auth/react";


const Track: React.FC<{ track: any, spotifyApi:SpotifyWebApi  }> = ({ track,  spotifyApi }) => {
  const favorites = useSelector(useFavoritesState)
  const playingTrack = useSelector(usePlayingTrackState)
  const play = useSelector(usePlayState)
  const [hasLiked, setHasLiked] = useState(favorites.find((e: any) => e.id === track.id) ? true : false);
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(setPlayingTrack(track))
    if (track.uri === playingTrack.uri) {
      dispatch(setPlayState(!play))
    }
  };

  const handlerSong = (id: string) => {
    dispatch(setPageState('song'))
    dispatch(setUriState(id))
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken,spotifyApi]);

  const followTrack = () => {
    if (hasLiked) {
      spotifyApi.removeFromMySavedTracks([track.id]).then((data) => {
        dispatch(setRefreshFavorites(true))
      })
    }else {
      spotifyApi.addToMySavedTracks([track.id]).then((data) => {
        dispatch(setRefreshFavorites(true))
      })
    }
  }

  return (
    <div className="flex items-center  w-full justify-between space-x-20 cursor-default py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <picture>
        <img
          src={track.albumUrl}
          alt={track.artist}
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        </picture>
        <div>
          <h4 onClick={() => handlerSong(track.id)} className="text-[#008c44] cursor-pointer text-sm hover:underline font-semibold truncate w-[450px]">
            {track.title}
          </h4>
        </div>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="text-[#008c44] flex space-x-1 text-sm font-semibold">
          <ImHeadphones className="text-lg" />
          <h4 className="font-sans ">{track.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#008c44] w-[85px] h-10 relative cursor-pointer group-hover:border-[#008c44]">
          <AiFillHeart
            className={`text-xl ml-3 icon ${hasLiked ? "text-[#008c44]" : "text-[#868686]"}`}
            onClick={() => (setHasLiked(!hasLiked), followTrack())}
          />
          {track.uri === playingTrack.uri && play ? (
            <div
              className="h-10 w-10 rounded-full border border-[#008c44] flex items-center justify-center absolute -right-0.5 bg-[#008c44] icon hover:scale-110"
              onClick={handlePlay}
            >
              <BsFillPauseFill className="text-[#f8db66]  text-xl" />
            </div>
          ) : (
            <div
              className="h-10 w-10 rounded-full border border-[#008c44] flex items-center justify-center absolute -right-0.5 hover:bg-[#008c44] hover:border-[#008c44] icon hover:scale-110"
              onClick={handlePlay}
            >
              <BsFillPlayFill className="text-[#f8db66] text-xl ml-[1px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Track;
