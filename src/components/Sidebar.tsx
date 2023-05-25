import clsx from "clsx";
import { AiFillHeart, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoritesState,
  setPageState,
  setRefreshFavorites,
  setUriState,
  useFavoritesRefreshState,
  usePagesState,
} from "@/store/pages";

interface InSidebar {
  spotifyApi: SpotifyWebApi;
}

const Sidebar: React.FC<InSidebar> = ({ spotifyApi }) => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const [tracksItems, setItemsTracks] = React.useState<any>([]);
  const page = useSelector(usePagesState);
  const favoritesRefresh = useSelector(useFavoritesRefreshState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMySavedTracks().then(({ body }) => {
      setItemsTracks(
        body.items.map((e) => {
          return e.track;
        })
      );
      dispatch(
        setFavoritesState(
          body.items.map((e) => {
            return e.track;
          })
        )
      );
      dispatch(setRefreshFavorites(false));
    });
  }, [accessToken, favoritesRefresh, dispatch, spotifyApi]);

  const handlerSong = (id: string) => {
    dispatch(setPageState("song"));
    dispatch(setUriState(id));
  };

  return (
    <section className="  flex flex-col  px-4 mt-4  items-center bg-white w-[300px]  space-y-8">
      <div className="bg-[#f7f4f2] w-full p-4 rounded-lg shadow-sm space-y-1.5">
        <div
          onClick={() => dispatch(setPageState("home"))}
          className={clsx(
            "flex items-center cursor-pointer text-lg space-x-3 py-1 px-3 font-normal  rounded-lg hover:text-[#f8db66]  hover:bg-[#008c44] text-[#008c44]",
            page === "home" && "bg-[#008c44] text-[#f8db66] "
          )}
        >
          <AiOutlineHome className="text-xl" width={30} />
          <span>Inicio</span>
        </div>
        <div
          onClick={() => dispatch(setPageState("search"))}
          className={clsx(
            "flex items-center cursor-pointer   text-lg space-x-3 font-normal py-1 px-3  rounded-lg  hover:text-[#f8db66]  hover:bg-[#008c44]  text-[#008c44]",
            page === "search" && " bg-[#008c44] text-[#f8db66] "
          )}
        >
          <AiOutlineSearch className="text-xl" width={30} />
          <span>Buscar</span>
        </div>
      </div>
      <div className="bg-[#f7f4f2] w-full p-5 rounded-lg  shadow-sm space-y-2.5">
        <div className="flex items-center space-x-2">
          <AiFillHeart className={`text-xl  icon text-[#008c44]`} />
          <span className="text-[#008c44]"> Tus me gustan</span>
        </div>

        <div className="flex flex-col overflow-y-auto max-h-96 scrollbar-hide space-y-3">
          {tracksItems.length > 0 &&
            tracksItems.map((e: any, i: number) => (
              <div
                className="flex items-center  w-full cursor-pointer space-x-2"
                key={i}
              >
                <picture className="h-12 w-12">
                  <img
                    src={e.album.images[2].url}
                    className="rounded"
                    alt={e.name}
                    width={50}
                    height={50}
                  />
                </picture>
                <div className="w-28 flex flex-col space-y-1">
                  <span
                    className="text-xs text-[#504741] hover:underline w-full truncate"
                    onClick={() => handlerSong(e.id)}
                  >
                    {e.name}
                  </span>
                  <span className="capitalize text-xs text-[#6c757d]">
                    Pista{" "}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
