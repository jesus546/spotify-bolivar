import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setPageState, setPlayState, setPlayingTrack, setUriState, usePlayState, usePlayingTrackState } from "@/store/pages";

const Poster:React.FC<{track:any}> = ({ track}) => {
  const play = useSelector(usePlayState)
  const dispatch = useDispatch()
  const playingTrack = useSelector(usePlayingTrackState)

  const handlePlay = () => {
    dispatch(setPlayingTrack(track));
    if (track.uri === playingTrack.uri) {
      dispatch(setPlayState(!play))
    }
  };

  const handlerSong= () => {
    dispatch(setPageState('song'))
    dispatch(setUriState(track.id))
  }
  return (
    <div
      className="w-[160px] h-[160px] rounded-lg shadow-md overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
    >
      <picture>
      <img
        src={track.albumUrl}
        onClick={handlerSong}
        alt=""
        className="h-full w-full absolute inset-0 object-cover rounded-lg opacity-80 group-hover:opacity-100"
      />
      </picture>
      <div className="absolute bottom-4 inset-x-0 ml-2 flex items-center space-x-3.5">
        <div    onClick={handlePlay} className="h-9 w-9 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {track.uri === playingTrack.uri && play ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[12px]">
          <h4 className="font-extrabold truncate w-44">{track.title.substring(0, 10)}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  );
}

export default Poster;
