import { useSession } from "next-auth/react";
import React from "react";
import Poster, { InTrack } from "./Poster";
import Slider from "react-slick";
import SpotifyWebApi from "spotify-web-api-node";

export const Home: React.FC<{ spotifyApi: SpotifyWebApi }> = ({
  spotifyApi,
}) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<any>([]);
  const [newReleases, setNewReleases] = React.useState<InTrack[]>([]);
  const [loadingPlayed, setLoadingPlayed] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks()
      .then(({ body }) => {
        setLoadingPlayed(true);
        setRecentlyPlayed(
          body.items.map(({ track }) => {
            return {
              id: track.id,
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
            };
          })
        );
      })
      .finally(() => setLoadingPlayed(false));

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken, spotifyApi]);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <b className=" text-[#008c44]">Escuchado recientemente</b>
      <div className="py-3 px-4">
        {loadingPlayed ? (
          <div className="flex justify-between">
            {[...Array(4)].map((value: number, i: number) => (
              <div
                key={i}
                className="flex items-center justify-center w-64 h-52 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
              >
                <svg
                  className="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {recentlyPlayed.map((value: any, i: number) => (
              <Poster key={i} track={value} />
            ))}
          </Slider>
        )}
      </div>
      <b className=" text-[#008c44]">Nuevos lanzamientos populares</b>
      <div className="py-3 px-4">
        {loadingPlayed ? (
          <div className="flex justify-between">
            {[...Array(4)].map((value: number, i: number) => (
              <div
                key={i}
                className="flex items-center justify-center w-64 h-52 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
              >
                <svg
                  className="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            ))}
          </div>
        ) : (
          <Slider className="!py-6" {...settings}>
            {newReleases.map((value: InTrack, i: number) => (
              <Poster key={i} track={value} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};
