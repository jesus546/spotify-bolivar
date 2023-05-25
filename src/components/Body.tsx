import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import Poster, { InTrack } from "./Poster";
import Search from "./Search";
import Dropdown from "./Dropdown";
import SpotifyWebApi from "spotify-web-api-node";
import Categories from "./Categories";
import { Home } from "./Home";
import { useSelector } from "react-redux";
import { usePagesState } from "@/store/pages";
import Song from "./Song";
import Artist from "./Artist";

interface InBody {
  spotifyApi: SpotifyWebApi;
}

const Body: React.FC<InBody> = ({ spotifyApi }) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState<string>("");
  const page = useSelector(usePagesState);

  const [searchResults, setSearchResults] = useState<InTrack[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((e:any) => {
      if (cancel) return;
      setSearchResults(
         e.body.tracks.items.map((track:any) => {
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

    return () => {
      cancel = true;
    };
  }, [search, accessToken, spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getCategories()
      .then((res) => {
        setIsLoading(true);
        setCategories(res.body.categories.items);
      })
      .finally(() => setIsLoading(false));
  }, [accessToken, spotifyApi]);

  const handlerSwitch = (value: string) => {
    switch (value) {
      case "search":
        return (
          <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 xl:grid-cols-6 gap-4">
            {isLoading ? (
              <>
                {[...Array(20)].map((value: number, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-600"
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
              </>
            ) : (
              <>
                {searchResults.length === 0
                  ? categories.map((track: InTrack, i: number) => (
                      <div className="flex items-center justify-center" key={i}>
                        <Categories track={track} />
                      </div>
                    ))
                  : searchResults.map((track: InTrack, i: number) => (
                      <Poster key={i} track={track} />
                    ))}
              </>
            )}
          </div>
        );
      case "song":
        return <Song spotifyApi={spotifyApi} />;
      case "artist":
        return <Artist spotifyApi={spotifyApi} />;
      default:
        return <Home spotifyApi={spotifyApi} />;
    }
  };

  return (
    <section className="  pb-4 px-4  bg-[#f7f4f2] mt-4 rounded-lg h-full mr-4   scrollbar-hide overflow-auto  space-y-5 w-full ">
      <div className=" sticky top-0 flex z-20 p-3 bg-[#f7f4f2] scrollbar-hide  w-full justify-between ">
        {page === "search" ? (
          <Search search={search} setSearch={setSearch} />
        ) : (
          <div></div>
        )}
        <Dropdown />
      </div>
      {handlerSwitch(page)}
    </section>
  );
};

export default Body;
