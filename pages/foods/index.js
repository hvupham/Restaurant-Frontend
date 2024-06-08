import React, { useEffect } from "react";
import Link from "next/link";

const foods = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 max-w-6xl mx-auto p-3 min-h-[83vh]">
        <div className="flex flex-col items-center justify-center p-3">
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/dosa"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Salad</h1>
              </div>
            </Link>
            <Link href={"/foods/rice"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Sushi</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/south-indian"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Sup và Hấp</h1>
              </div>
            </Link>
            <Link href={"/foods/north-indian"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Khai Vị</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/chinese"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Sashimi</h1>
              </div>
            </Link>
            <Link href={"/foods/snacks"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Cơm cuộn</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-evenly w-full mb-5">
            {/* <Link href={"/foods/desserts"}> */}
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Thức uống</h1>
              </div>
            {/* </Link> */}
          </div>
        </div>
        <div className="items-center justify-center hidden md:flex">
          <img
            src="https://www.freepnglogos.com/uploads/food-png/true-food-kitchen-35.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default foods;
