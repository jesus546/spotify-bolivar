import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import Poster from "./Poster";
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
  spotifyApi: SpotifyWebApi
}

const Body: React.FC<InBody> = ({  spotifyApi }) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState<string>("");
  const page = useSelector(usePagesState)

  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);


  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res: any) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
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
      cancel = true
    };
  }, [search, accessToken, spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getCategories().then((res) => {
      setCategories(res.body.categories.items)
    });
  }, [accessToken,spotifyApi ]);

  const handlerSwitch = (value: string) => {
    switch (value) {
      case 'search':
        return (
          <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 xl:grid-cols-6 gap-4">
            {searchResults.length === 0
              ? categories
                .map((track: any, i: number) => (
                  <div className="flex items-center justify-center" key={i}>
                    <Categories track={track} />
                  </div>
                ))
              : searchResults
                .map((track: any, i: number) => (
                  <Poster
                    key={i}
                    track={track}
                  />
                ))}
          </div>
        )
      case 'song':
        return <Song  spotifyApi={spotifyApi} />
      case 'artist':
        return <Artist  spotifyApi={spotifyApi} />
      default:
        return <Home  spotifyApi={spotifyApi} />
    }
  }

  return (
    <section className="  pb-4 px-4  bg-[#f7f4f2] mt-4 rounded-lg h-full mr-4   scrollbar-hide overflow-auto  space-y-5 w-full ">
      <div className=" sticky top-0 flex z-20 p-3 bg-[#f7f4f2] scrollbar-hide  w-full justify-between ">
        {page === 'search' ? <Search search={search} setSearch={setSearch} /> : <div></div>}
        <Dropdown />
      </div>
      {handlerSwitch(page)}

    </section>
  );
}

export default Body;
