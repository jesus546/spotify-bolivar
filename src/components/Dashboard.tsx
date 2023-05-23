import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import Player from "./Player";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingTrack, usePlayingTrackState } from "@/store/pages";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});
export const convert2Currency = (amount: any) => amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0

const Dashboard: React.FC<{}> = () => {
  const { data: session }: any = useSession();
  const { accessToken } = session;
  const playingTrack = useSelector(usePlayingTrackState)
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);


  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);


  return (
    <main className="flex h-screen overflow-hidden  w-full pb-28">
      <Sidebar spotifyApi={spotifyApi} />
      <Body   spotifyApi={spotifyApi} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
}

export default Dashboard;
