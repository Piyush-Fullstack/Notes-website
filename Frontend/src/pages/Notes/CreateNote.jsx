import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/tasks/create',
        {
          title: note.title,
          description: note.content,
        },
        { withCredentials: true }
      );

      console.log('Task created:', response.data);
      navigate('/notes'); 
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-md shadow-md bg-white h-[600px] w-[700px] p-6 flex flex-col"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Create Note</h1>

        <input
          type="text"
          name="title"
          placeholder="Enter your title"
          value={note.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="content"
          placeholder="Write your note here..."
          value={note.content}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
