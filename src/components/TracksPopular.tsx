import { useSession } from "next-auth/react";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "./Track";

interface InTracksPopular {
  title: React.ReactNode | string;
  id: string;
  spotifyApi: SpotifyWebApi;
  country: string;
}

const TracksPopular: React.FC<InTracksPopular> = ({
  title,
  country,
  id,
  spotifyApi,
}) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const [topTracks, setTopTracks] = React.useState<any>([]);
  const [more, setMore] = React.useState<number>(5);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getArtistTopTracks(id, country).then(({ body }) => {
      setTopTracks(
        body.tracks.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken, id, country, spotifyApi]);

  return (
    <div className="flex flex-col space-y-3">
      {title}
      {topTracks.length > 0 &&
        topTracks.slice(0, more).map((e: any, i: number) => (
          <div
            className="flex items-center w-full hover:bg-black/10 px-2 rounded-lg "
            key={i}
          >
            <span className="text-[#008c44]  font-semibold  text-sm">
              {i + 1}
            </span>
            <Track spotifyApi={spotifyApi} track={e} />
          </div>
        ))}
      {topTracks.length > 5 && (
        <span
          className="cursor-pointer text-[#504741]"
          onClick={() => setMore(more === 5 ? 10 : 5)}
        >
          {more === 5 ? "Ver más" : "Ver menos"}
        </span>
      )}
    </div>
  );
};

export default TracksPopular;
