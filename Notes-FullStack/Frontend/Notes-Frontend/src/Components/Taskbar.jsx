import React, { useState } from "react";
import { ShowCart } from "../pages/Notes.jsx";

function Taskbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);
  return (
    <div className=" flex gap-12 items-center">
      <div className="flex items-center justify-start ml-12">
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            class="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="ml-3">{user.email}</div>-
       <div className="ml-2">{user.role}</div>
      </div>
      <div className="ml-80">Group-Id :  {user.tenantId} </div>
    </div>
  );
}

export default Taskbar;
