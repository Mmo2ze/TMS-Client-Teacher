"use client"
import React, { useState , useEffect } from 'react';
import Link from 'next/link'
import {useAuth} from "AppState";



const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [shouldCloseMenu, setShouldCloseMenu] = useState(false);
    const {HaveRole,Roles} = useAuth();
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
    const handleLinkClick = () => {
      setShouldCloseMenu(true);
    };
  
    useEffect(() => {
      if (shouldCloseMenu) {
        setMenuOpen(false);
        setShouldCloseMenu(false);
      }
    }, [shouldCloseMenu]);
  
  
    return (
      <nav className="bg-white border-gray-200  dark:bg-nav-color text-end text-lg text-bold fixed w-full top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tass
            </span>
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            }  w-[90%] md:w-auto md:flex md:items-center md:space-x-8 absolute  top-16 md:right-5 md:top-5`}
            id="navbar-default"
          >
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">





      {HaveRole(["Teacher"]) && (
      <li>
        <Link
            href="/assisstans"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            onClick={handleLinkClick}
        >
          {/*  attendance */}
          السكرتارية
        </Link>
          </li>
      )}
      {HaveRole(["Teacher","RecordCards"]) && (
        <li>
        <Link
          href="/cards"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          {/*  attendance */}
        كروت
        </Link>
      </li>
      )}
      {HaveRole(["Teacher","RecordQuiz"]) && (
      <li>
        <Link
          href="/scoring"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          {/* Scoring */}
      تسجيل درجات  
        </Link>
      </li>
      )}
        {HaveRole(["Teacher","RecordAttendance"]) && (
          <li>
        <Link
          href="/attendance"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          {/*  attendance */}
         تسجيل الحضور 
        </Link>
      </li>)}
        {HaveRole(["Teacher","RecordAttendance"]) && (
      <li>
        <Link
          href="/registration"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          سكنر
        </Link>
      </li>
        )}
      <li>
        <Link
          href="/classes"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          الصفوف
        </Link>
      </li>
      <li>
        <Link
          href="/student"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          aria-current="page"
          onClick={handleLinkClick}
        >
          الطلاب
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={handleLinkClick}
        >
          الصفحة الرئيسية
        </Link>
      </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
  