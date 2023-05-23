import { setPlayState, setPlayingTrack, usePlayState, usePlayingTrackState, useUriState } from '@/store/pages';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import TracksPopular from './TracksPopular';
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { convert2Currency } from './Dashboard';

interface InArtist {
    spotifyApi: SpotifyWebApi
}

const Artist: React.FC<InArtist> = ({ spotifyApi }) => {
    const { data: session }: any = useSession();
    const { accessToken } = session;
    const uri = useSelector(useUriState)
    const play = useSelector(usePlayState)
    const playingTrack = useSelector(usePlayingTrackState)
    const [artist, setArtist] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken, spotifyApi]);

    React.useEffect(() => {
        if (!accessToken) return;
        spotifyApi.getArtist(uri).then(({ body }) => {
            setLoading(true)
            setArtist(body)
        }).finally(() => setLoading(false));
    }, [accessToken, uri, spotifyApi]);

    const handlePlay = () => {
        dispatch(setPlayingTrack(artist));
        if (artist.uri === playingTrack.uri) {
            dispatch(setPlayState(!play))
        }
    };

    return (
        <div className='flex flex-col space-y-5'>
            {loading ?
                <div className='flex flex-col space-y-3'>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 space-x-8 flex items-end">
                        <div className="flex items-center justify-center w-64 h-52 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div role="status" className="flex items-center justify-center h-10 w-10 bg-gray-300 rounded-full    animate-pulse dark:bg-gray-700">
                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 384 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" /></svg>
                        </div>
                        <div className=' animate-pulse'>
                            <div className="h-4 bg-gray-200 rounded-full  animate-pulse dark:bg-gray-700 w-48 "></div>
                        </div>
                    </div>
                    <div className=' animate-pulse space-y-3'>
                        <div className="h-4 bg-gray-200 rounded-full  animate-pulse dark:bg-gray-700 w-48 "></div>
                        {[...Array(3)].map((value: number, i: number) => (
                            <div className='flex items-center w-full justify-between' key={i}>
                                <div className='flex items-center space-x-3'>
                                    <div className="h-4 bg-gray-200 rounded-full  animate-pulse dark:bg-gray-700 w-4 "></div>
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded  dark:bg-gray-700">
                                        <svg className="w-2 h-2 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded-full  animate-pulse dark:bg-gray-700 w-32 "></div>
                                </div>
                                <div className='flex items-center space-x-3'>
                                    <div className="h-4 bg-gray-200 rounded-full  animate-pulse dark:bg-gray-700 w-12 "></div>
                                    <div role="status" className="flex items-center justify-center h-10 w-10 bg-gray-300 rounded-full    animate-pulse dark:bg-gray-700">
                                        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 384 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <>
                    <div className='flex px-4 space-x-4 items-end  '>
                        <picture>
                            <img
                                src={artist.images[0].url || ''}
                                alt={artist.name}
                                width={250}
                                height={150}
                                className="rounded-xl  object-cover mr-3"
                            />
                        </picture>
                        <div className='flex flex-col justify-between'>
                            <h1 className='text-6xl font-semibold text-[#008c44]'>{artist.name}</h1>
                        </div>
                    </div>
                    <div className='flex px-4 items-center space-x-3 '>
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
                        {artist && <span className='text-[#868686]'> {convert2Currency(artist.followers.total || 0)} Seguidores</span>}
                    </div>
                    <TracksPopular title={<span className='text-[#008c44] text-lg'>Populares</span>} spotifyApi={spotifyApi} id={uri} country="CO" />
                </>

            }


        </div>
    )
}

export default Artist