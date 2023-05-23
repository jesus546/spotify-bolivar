import React from 'react'

const Categories: React.FC<{ track: any }> = ({ track }) => {
    const soon = () => {
        alert('Muy pronto')
    }

    return (
        <div onClick={soon} className='w-full h-full rounded-lg shadow-md bg-black overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto'>
            <picture>
            <img
                src={track.icons[0].url}
                alt={track.name}
                className='object-content'
            />
            </picture>
            <div className="absolute bottom-4 inset-x-0 ml-2 flex  items-center space-x-3.5">
                <div className="text-[12px]">
                    <h4 className="font-extrabold truncate w-44 ">{track.name}</h4>
                </div>
            </div>
        </div>
    )
}

export default Categories