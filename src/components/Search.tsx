import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineShortText } from "react-icons/md";

const Search: React.FC<{ search: string, setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  return (
    <div className="w-72 space-x-4 sm:w-full bg-[#008c44] rounded-full  overflow-hidden border-2 border-[#008c44] p-1.5 px-5 pr-8 flex items-center">
      <AiOutlineSearch width={40} height={40} color="white" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#008c44] text-white border-none w-full focus:ring-0 outline-none placeholder-[#FAFAFA] text-sm"
        placeholder="¿que quieres escuchar?"
      />

    </div>
  );
}

export default Search;
