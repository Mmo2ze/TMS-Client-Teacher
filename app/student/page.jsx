"use client"
import { useState, useEffect } from 'react';
import axios from '../config/axiosconfigClient';
import Spinners from '@/app/ui/Spinners';
import StudentBox from '../ui/student/StudentBox';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const fetchData = async () => {
        try {
          const url = searchWord ? `/api/Teacher/student/search/${searchWord}` : '/api/Teacher/student';
          const response = await axios.get(url);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchWord]);




  return (
    <div className="pt-20">
      <div className="flex gap-2 p-3 items-center text-color-text text-end">
        <div className="flex-1">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              autoComplete="off"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="البحث عن طالب"
              required
            />
          </div>
        </div>
        <div className="cursor-pointer">
          <Link href="/student/add">
            <AddIcon sx={{ fontSize: 60 }} />
          </Link>
        </div>
      </div>
      <div>
        {isLoading && <Spinners />}
        {!isLoading &&
          data.map((da) => (
            <Link key={da.student.id} href={`/student/${da.privateId}`}>
              <StudentBox name={da.student.name} id={da.privateId} grade={da.grade} className={da.className}/>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Page;
