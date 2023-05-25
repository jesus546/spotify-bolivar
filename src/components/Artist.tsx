import {
  setPlayState,
  setPlayingTrack,
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
import { convert2Currency } from "./Dashboard";
import LoaderArtist from "./LoaderArtist";

interface InArtist {
  spotifyApi: SpotifyWebApi;
}

const Artist: React.FC<InArtist> = ({ spotifyApi }) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const uri = useSelector(useUriState);
  const play = useSelector(usePlayState);
  const playingTrack = useSelector(usePlayingTrackState);
  const [artist, setArtist] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getArtist(uri)
      .then(({ body }) => {
        setLoading(true);
        setArtist(body);
      })
      .finally(() => setLoading(false));
  }, [accessToken, uri, spotifyApi]);

  const handlePlay = () => {
    dispatch(setPlayingTrack(artist));
    if (artist.uri === playingTrack.uri) {
      dispatch(setPlayState(!play));
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {loading ? (
       <LoaderArtist/>
      ) : (
        <>
          <div className="flex px-4 space-x-4 items-end  ">
            <picture>
              <img
                src={artist.images[0].url || ""}
                alt={artist.name}
                width={250}
                height={150}
                className="rounded-xl  object-cover mr-3"
              />
            </picture>
            <div className="flex flex-col justify-between">
              <h1 className="text-6xl font-semibold text-[#008c44]">
                {artist.name}
              </h1>
            </div>
          </div>
          <div className="flex px-4 items-center space-x-3 ">
            {artist && artist.uri === playingTrack.uri && play ? (
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
            {artist && (
              <span className="text-[#868686]">
                {" "}
                {convert2Currency(artist.followers.total || 0)} Seguidores
              </span>
            )}
          </div>
          <TracksPopular
            title={<span className="text-[#008c44] text-lg">Populares</span>}
            spotifyApi={spotifyApi}
            id={uri}
            country="CO"
          />
        </>
      )}
    </div>
  );
};

export default Artist;
