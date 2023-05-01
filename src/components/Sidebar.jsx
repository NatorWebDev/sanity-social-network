import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/photoGalleryLogo.jpg";
import { categories } from "../utils/data";


export default function Sidebar({ user, closeToggle }) {

  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";

  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 transition-all duration-200 ease-in-out capitalize ";

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col h-full justify-between bg-white overflow-y-scroll min-w-[210px] hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-[190px]"
          onClick={handleCloseSidebar}
        >
          <div className="p-5 flex justify-center items-center w-full">
            <img src={logo} className="w-[50px]"/>
            <h2 className="text-[30px] text-black">PHOTOG</h2>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-5 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
          onClick={handleCloseSidebar}
        >
          <RiHomeFill />
          Home
        </NavLink>
        <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>

        {categories.slice(0, categories.length - 1).map((category, index) => (
          <NavLink
            key={index}
            to={`/category/${category.name}`}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            {category.name}
          </NavLink>
        ))}
      </div>

      {user && (
        <Link
          to={`user-profile/${user.id}`}
          className="flex my-5 mb-3 gap-2 p-2 rounded-lg shadow-lg items-center mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="user-profile" className="w-10 h-10 rounded-full" />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
}
