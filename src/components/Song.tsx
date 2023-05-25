import {
  setPageState,
  setPlayState,
  setPlayingTrack,
  setRefreshFavorites,
  setUriState,
  useFavoritesRefreshState,
  useFavoritesState,
  usePlayState,
  usePlayingTrackState,
  useUriState,
} from "@/store/pages";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-node";
import TracksPopular from "./TracksPopular";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import LoaderSong from "./LoaderSong";
interface InSong {
  spotifyApi: SpotifyWebApi;
}

const Song: React.FC<InSong> = ({ spotifyApi }) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const favorites = useSelector(useFavoritesState);
  const favoritesRefresh = useSelector(useFavoritesRefreshState);
  const playingTrack = useSelector(usePlayingTrackState);
  const uri = useSelector(useUriState);
  const play = useSelector(usePlayState);
  const [song, setSong] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasLiked, setHasLiked] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getTrack(uri)
      .then(({ body }) => {
        setLoading(true);
        setHasLiked(
          favorites.find((e: any) => e.id === body.id) ? true : false
        );
        setSong(body);
      })
      .finally(() => setLoading(false));
  }, [accessToken, uri, favoritesRefresh, spotifyApi, favorites]);

  const handlePlay = () => {
    dispatch(setPlayingTrack(song));
    if (song.uri === playingTrack.uri) {
      dispatch(setPlayState(!play));
    }
  };
  const handlerArtist = (uri: any) => {
    dispatch(setPageState("artist"));
    dispatch(setUriState(uri));
  };

  const followTrack = () => {
    if (hasLiked) {
      spotifyApi.removeFromMySavedTracks([song.id]).then((data) => {
        dispatch(setRefreshFavorites(true));
      });
    } else {
      spotifyApi.addToMySavedTracks([song.id]).then((data) => {
        dispatch(setRefreshFavorites(true));
      });
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {loading ? (
       <LoaderSong/>
      ) : (
        <>
          <div className="flex px-4 space-x-4 items-end ">
            <picture>
              <img
                src={song.album.images[0].url}
                alt={song.name}
                width={300}
                height={300}
                className="rounded-xl  object-cover mr-3"
              />
            </picture>
            <div className="flex flex-col justify-between">
              <span className="font-semibold text-[#008c44]">Canción</span>
              <h1 className="text-6xl font-semibold text-[#008c44]">
                {song.name}
              </h1>
              <span
                onClick={() => handlerArtist(song.artists[0].id)}
                className="text-sm text-[#504741] cursor-pointer hover:underline"
              >
                {song.artists[0].name} - Artista
              </span>
            </div>
          </div>

          <div className="flex px-4 items-center ">
            {song && song.uri === playingTrack.uri && play ? (
              <div
                className="h-10 w-10 rounded-full cursor-pointer border border-[#008c44] flex items-center justify-center  bg-[#008c44] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-[#f8db66]  text-xl" />
              </div>
            ) : (
              <div
                className="h-10 w-10 rounded-full border  cursor-pointer flex items-center justify-center  bg-[#008c44] i hover:bg-[#008c44] hover:border-[#008c44] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-[#f8db66] text-xl ml-[1px]" />
              </div>
            )}
            <AiFillHeart
              className={`text-xl ml-3 cursor-pointer icon ${
                hasLiked ? "text-[#008c44]" : "text-[#868686]"
              }`}
              onClick={() => (setHasLiked(!hasLiked), followTrack())}
            />
          </div>

          <TracksPopular
            title={
              <h2 className="font-semibold text-[#504741] ">
                Canciones populares de <br />{" "}
                <span className="text-[#008c44]">{song.artists[0].name}</span>{" "}
              </h2>
            }
            spotifyApi={spotifyApi}
            id={song.artists[0].id}
            country={song.available_markets[0]}
          />
        </>
      )}
    </div>
  );
};

export default Song;
