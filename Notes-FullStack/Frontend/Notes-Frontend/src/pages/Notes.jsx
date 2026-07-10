import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { CiMenuBurger } from "react-icons/ci";
import axios from "axios";
import Taskbar from "../Components/Taskbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";

export default function NotesPage({ token, user, handleLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [sidebar,setSidebar] = useState(false);

  console.log(user)
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: { Authorization: `${token}` },
  });

  const getNotes = async () => {
    const res = await axiosInstance.get(`/notes/getNotes`);
    setNotes(res.data.note);
  };
  useEffect(() => {
    getNotes();
  }, []);

  const AddNote = async () => {
    if (!title.trim(" ") || !desc.trim(" ")) {
      setError("Both title and content are required");
      return;
    }
    try {
      const res = await axiosInstance.post("/notes/create", {
        title: title,
        content: desc,
      });
      setTitle("");
      setDesc("");
      setNotes((note) => [...note, res.data.createnote]);
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-fuchsia-50 flex flex-col items-center">
      <div className="fixed flex justify-between z-30 w-full bg-red-300 h-16 items-center rounded-lg text-white ">
        <Taskbar />
        <button
          className="border-4 rounded-2xl p-3 m-2 px-5 bg-red-500 text-white absolute right-12  hover:scale-105 hover:shadow-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {user.role == "admin" && 
      <div className='z-50 fixed top-20 right-0 '>
         <CiMenuBurger size={24} style={{ marginRight: "10px" }} onClick={()=> setSidebar(!sidebar)} className="z-30"/>
          {sidebar && <Sidebar />}
      </div> }
      <div className=" w-full h-screen mt-20 ">
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 max-w-lg relative -right-[600px] ">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Note</h1>
          <div className="space-y-5">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-gray-50 transition"
            />
            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-md bg-gray-50 resize-none transition"
              rows={4}
            />
            <button
              onClick={AddNote}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg"
            >
              Add Note
            </button>
          </div>
        </div>
        {notes.length === 0 ? (
          <div className="text-2xl text-black font-semibold relative left-[700px] top-24">
            Create your first note above!
          </div>
        ) : (
          <div className="ml-52">
            <div className="flex flex-wrap gap-12  ">
              {notes.map((note) => {
                return (
                  <ShowCart
                    fullNote={note}
                    key={note._id}
                    title={note.title}
                    desc={note.content}
                    notes={notes}
                    setNotes={setNotes}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function ShowCart({ fullNote, title, desc, setNotes, notes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setDeleteOpen] = useState(false);

  return (
    <div className="p-2">
      <div className="w-96 h-56 bg-white rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        {/* Top-right icons */}
        <div className="flex justify-end gap-3 p-3 z-10 relative">
          <div className="relative right-32 mb-7 text-red-400 w-fit"> {fullNote.userId?.email || fullNote.tenantId?.email}</div>
          <FiEdit
            size={20}
            className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200 z-50"
            onClick={() => setIsOpen(true)}
          />
          <FiTrash2
            size={20}
            className="text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
            onClick={() => setDeleteOpen(true)}
          />
        </div>
 
        {/* Card content */}
        <div className="flex flex-col justify-start items-start h-full px-6 pt-4 relative z-10">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 border-b border-gray-300 w-full pb-1">
            {title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mt-1 line-clamp-4 overflow-hidden">
            {desc}
          </p>
        </div>

        {/* Decorative background */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-200 rounded-full opacity-20 pointer-events-none"></div>
      </div>

      {/* Edit Modal */}
      {isOpen && (
        <HandleClick
          fullNote={fullNote}
          setIsOpen={setIsOpen}
          title={title}
          desc={desc}
          notes={notes}
          setNotes={setNotes}
        />
      )}

      {/* Delete Modal */}
      {isDelete && (
        <HandleDelete
          notes={notes}
          setNotes={setNotes}
          fullNote={fullNote}
          isDelete={isDelete}
          setDeleteOpen={setDeleteOpen}
        />
      )}
    </div>
  );
}

const HandleClick = ({ fullNote, setIsOpen, title, desc, notes, setNotes }) => {
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingDesc, setEditingDesc] = useState(desc);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const UpdateNote = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/notes/updateNotes/${id}`,
        {
          title: editingTitle,
          content: editingDesc,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      setIsOpen(false);
      setNotes(
        notes.map((note) => (note._id === id ? res.data.updateData : note))
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  // fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Note</h1>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-gray-50 transition"
          />
          <textarea
            placeholder="Description"
            value={editingDesc}
            onChange={(e) => setEditingDesc(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-md bg-gray-50 resize-none transition"
            rows={4}
          />
          <button
            className="w-44 mr-2 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg"
            onClick={() => UpdateNote(fullNote._id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

function HandleDelete({ notes, setNotes, fullNote, setDeleteOpen }) {
  const [token, setToken] = useState(localStorage.getItem("token"));


  const DeleteNote = async (id) => {
    try {
      const res =await axios.delete(
        `http://localhost:3001/notes/deleteNotes/${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setDeleteOpen(false);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-6 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 transition"
            onClick={() => setDeleteOpen(false)} // cancel action
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            onClick={() => DeleteNote(fullNote._id)} // your delete action
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
