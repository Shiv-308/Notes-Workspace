import axios from "axios";
import { useEffect, useState } from "react";

function Sidebar() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getUser = async () => {
    const res = await axios("http://localhost:3001/notes/getUsers", {
      headers: { Authorization: `${token}` },
    });
    setUsers(res.data.findUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 border-r border-gray-200 overflow-auto font-sans">
      {users.length === 0 ? (
        <h1 className="flex justify-center items-center h-screen text-red-600 font-bold text-xl">
          No Users
        </h1>
      ) : (
        <ol className="p-4 list-decimal list-inside space-y-2">
          {users.map((user) => (
            <ShowSide key={user._id} user={user} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default Sidebar;

function ShowSide({ user }) {
  return (
    <li>
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-3 border-l-4 border-indigo-400 cursor-pointer">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow">
            {user.email[0].toUpperCase()}
          </div>
          {/* User Info */}
          <div>
            <p className="font-semibold text-gray-800 text-md">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
