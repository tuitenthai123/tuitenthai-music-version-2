import React from 'react';
import { BsSearch } from "react-icons/bs";

interface SearchItemProps {
  label: string;
}

const Searchbar: React.FC<SearchItemProps> = ({ label }) => {
  return (
  <div className='flex items-center'>
    <span className='h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px] text-gray-500'>
      <BsSearch size={24} />
    </span>
    <input
      type='text'
      className='border-transparent focus:border-transparent focus:ring-0 bg-[#DDE4E4] w-full px-4 py-2 rounded-r-[20px] h-10 text-gray-500'
      placeholder={label}
    />
  </div>
  );
};

export default Searchbar;